import os
import shlex
import subprocess
from pathlib import Path
from typing import Optional

from .config import JAVA_CMD, XMS, XMX, LOG_FILE

class ServerProcess:
    def __init__(self, jar_path: Path, cwd: Path):
        self.jar_path = jar_path
        self.cwd = cwd
        self.proc: Optional[subprocess.Popen] = None

    def start(self):
        if self.proc and self.proc.poll() is None:
            return  # already running
        cmd = f'{JAVA_CMD} -Xms{XMS} -Xmx{XMX} -jar "{self.jar_path}" nogui'
        self.proc = subprocess.Popen(
            shlex.split(cmd),
            cwd=str(self.cwd),
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True
        )

    def stop(self):
        if self.proc and self.proc.poll() is None:
            self.send_command("stop")
        self.proc = None

    def send_command(self, command: str):
        if self.proc and self.proc.stdin:
            self.proc.stdin.write(command + "\n")
            self.proc.stdin.flush()

    def is_running(self) -> bool:
        return self.proc is not None and self.proc.poll() is None

def ensure_eula(server_dir: Path):
    eula = server_dir / "eula.txt"
    server_dir.mkdir(parents=True, exist_ok=True)
    if not eula.exists():
        eula.write_text("eula=true\n")

def read_latest_log() -> str:
    p = Path(LOG_FILE)
    if p.exists():
        return p.read_text(errors="ignore")[-100000:]  # cap output
    return "No logs yet."
