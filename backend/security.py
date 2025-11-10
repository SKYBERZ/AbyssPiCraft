import json
from pathlib import Path
from passlib.context import CryptContext
from fastapi import HTTPException, status

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def ensure_user_store(path: Path):
    path.parent.mkdir(parents=True, exist_ok=True)
    if not path.exists():
        # Default admin: admin / admin (hashed)
        default_hash = pwd_context.hash("admin")
        json.dump({"admin": default_hash}, path.open("w"))

def verify_user(path: Path, username: str, password: str) -> bool:
    ensure_user_store(path)
    store = json.load(path.open())
    if username not in store:
        return False
    return pwd_context.verify(password, store[username])

def change_password(path: Path, username: str, old_password: str, new_password: str):
    ensure_user_store(path)
    store = json.load(path.open())
    if username not in store:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User not found")
    if not pwd_context.verify(old_password, store[username]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Old password incorrect")
    store[username] = pwd_context.hash(new_password)
    json.dump(store, path.open("w"))
