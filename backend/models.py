from pydantic import BaseModel

class LoginRequest(BaseModel):
    username: str
    password: str

class ChangePasswordRequest(BaseModel):
    old_password: str
    new_password: str

class CreateServerRequest(BaseModel):
    name: str

class StartServerRequest(BaseModel):
    name: str

class CommandRequest(BaseModel):
    name: str
    command: str

class PaperVersionRequest(BaseModel):
    project: str = "paper"
    version: str
    build: int | None = None
