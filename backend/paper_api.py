import requests
from pathlib import Path

PAPER_BASE = "https://api.papermc.io/v2/projects/paper"

def list_versions():
    r = requests.get(PAPER_BASE)
    r.raise_for_status()
    return r.json()["versions"]

def list_builds(version: str):
    r = requests.get(f"{PAPER_BASE}/versions/{version}")
    r.raise_for_status()
    return r.json()["builds"]

def download_paper(version: str, build: int, dest: Path):
    url = f"{PAPER_BASE}/versions/{version}/builds/{build}/downloads/paper-{version}-{build}.jar"
    dest.parent.mkdir(parents=True, exist_ok=True)
    with requests.get(url, stream=True) as r:
        r.raise_for_status()
        with dest.open("wb") as f:
            for chunk in r.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
