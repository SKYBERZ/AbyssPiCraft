import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
SERVERS_DIR = DATA_DIR / "servers"
DEFAULT_SERVER_DIR = SERVERS_DIR / "default"
PAPER_JAR = DEFAULT_SERVER_DIR / "paper.jar"
LOG_FILE = DEFAULT_SERVER_DIR / "logs/latest.log"
JAVA_CMD = os.environ.get("JAVA_CMD", "java")
XMS = os.environ.get("MC_XMS", "512M")
XMX = os.environ.get("MC_XMX", "1024M")
BACKEND_HOST = os.environ.get("HOST", "0.0.0.0")
BACKEND_PORT = int(os.environ.get("PORT", "8000"))
