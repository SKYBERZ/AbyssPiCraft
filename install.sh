#!/bin/bash
set -e

echo "🚀 AbyssPiCraft Installer starting..."

# Update system
sudo apt update && sudo apt upgrade -y

# Install dependencies
sudo apt install -y python3 python3-venv python3-pip git nodejs npm openjdk-21-jdk

# Clone repo if not already
if [ ! -d "$HOME/abysspicraft" ]; then
  git clone https://github.com/SKYBERZ/AbyssPiCraft.git
fi

cd $HOME/abysspicraft/backend

# Backend setup
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Frontend setup
cd ../frontend
npm install
npm run build

echo "✅ AbyssPiCraft installed!"
echo "➡ Run backend: cd ~/abysspicraft/backend && source venv/bin/activate && uvicorn main:app --host 0.0.0.0 --port 8000"
echo "➡ Frontend build ready in ~/abysspicraft/frontend/dist"
echo "➡ Minecraft server will use JDK21"
