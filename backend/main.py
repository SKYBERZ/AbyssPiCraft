from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from typing import Annotated
from pathlib import Path
import time

from .models import (
    LoginRequest, ChangePasswordRequest, CreateServerRequest,
    StartServerRequest, CommandRequest, PaperVersionRequest
)
from .security import verify_user, change_password, ensure_user_store
from .paper_api import list_versions, list_builds, download_paper
from .server_manager import ServerProcess, ensure_eula, read_latest_log
from .config import DATA_DIR, SERVERS_DIR, DEFAULT_SERVER_DIR, PAPER_JAR

USERS_FILE = DATA_DIR / "users.json"
ensure_user_store(USERS_FILE)

app = FastAPI(title="AbyssPiCraft API")

# Simple session store (memory). For production, use JWT or a DB.
SESSIONS = set()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # adjust if you want strict origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory single server process for "default"
PROCESS = ServerProcess(PAPER_JAR, DEFAULT_SERVER_DIR)

def require_auth(token: Annotated[str | None, Query(alias="token")] = None):
    if not token or token not in SESSIONS:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")

@app.get("/")
def root():
    return {"ok": True, "msg": "AbyssPiCraft backend running"}

@app.post("/auth/login")
def login(req: LoginRequest):
    if verify_user(USERS_FILE, req.username, req.password):
        token = f"{req.username}-token"
        SESSIONS.add(token)
        return {"token": token, "username": req.username}
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

@app.post("/auth/change-password")
def change_pw(req: ChangePasswordRequest, _: Annotated[None, Depends(require_auth)]):
    change_password(USERS_FILE, "admin", req.old_password, req.new_password)
    return {"ok": True}

@app.get("/paper/versions")
def versions(_: Annotated[None, Depends(require_auth)]):
    return {"versions": list_versions()}

@app.get("/paper/builds/{version}")
def builds(version: str, _: Annotated[None, Depends(require_auth)]):
    return {"builds": list_builds(version)}

@app.post("/paper/download")
def paper_download(req: PaperVersionRequest, _: Annotated[None, Depends(require_auth)]):
    ensure_eula(DEFAULT_SERVER_DIR)
    if req.build is None:
        builds = list_builds(req.version)
        build = builds[-1]
    else:
        build = req.build
    download_paper(req.version, build, PAPER_JAR)
    return {"ok": True, "version": req.version, "build": build}

@app.post("/server/create")
def create_server(req: CreateServerRequest, _: Annotated[None, Depends(require_auth)]):
    server_dir = SERVERS_DIR / req.name
    server_dir.mkdir(parents=True, exist_ok=True)
    ensure_eula(server_dir)
    return {"ok": True, "name": req.name}

@app.post("/server/start")
def start_server(_: StartServerRequest, __: Annotated[None, Depends(require_auth)]):
    ensure_eula(DEFAULT_SERVER_DIR)
    if not PAPER_JAR.exists():
        raise HTTPException(status_code=400, detail="Paper JAR not found. Download via /paper/download.")
    PROCESS.start()
    return {"ok": True, "running": PROCESS.is_running()}

@app.post("/server/stop")
def stop_server(__: Annotated[None, Depends(require_auth)]):
    PROCESS.stop()
    return {"ok": True}

@app.post("/server/command")
def send_command(req: CommandRequest, __: Annotated[None, Depends(require_auth)]):
    PROCESS.send_command(req.command)
    return {"ok": True}

@app.get("/server/status")
def status(__: Annotated[None, Depends(require_auth)]):
    return {"running": PROCESS.is_running(), "jar_exists": PAPER_JAR.exists()}

@app.get("/server/logs/stream")
def stream_logs(__: Annotated[None, Depends(require_auth)]):
    def gen():
        last = ""
        while True:
            text = read_latest_log()
            if text != last:
                yield text
                last = text
            time.sleep(1)
    return StreamingResponse(gen(), media_type="text/plain")

@app.post("/server/mods/upload")
async def upload_mod(file: UploadFile = File(...), __: Annotated[None, Depends(require_auth)] = None):
    mods_dir = DEFAULT_SERVER_DIR / "plugins"
    mods_dir.mkdir(parents=True, exist_ok=True)
    out = mods_dir / file.filename
    with out.open("wb") as f:
        f.write(await file.read())
    return {"ok": True, "file": file.filename}
