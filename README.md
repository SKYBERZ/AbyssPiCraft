# 🌌 AbyssPiCraft

AbyssPiCraft is a **privacy‑first, cyber‑themed hosting panel** designed to run Minecraft servers on Raspberry Pi with **one‑line installation** and **global access via Cloudflare Tunnel**.  
Built by **Abyss Hub**.

---

## ✨ Features
- 🚀 **One‑line installer** — setup everything automatically (Python, Node.js, Git, JDK21).  
- 🎮 **Minecraft PaperMC integration** — download, start, stop, and manage servers.  
- 🖥️ **Cyber‑themed panel** — dark blue + black UI with neon accents.  
- 🔒 **Privacy‑first authentication** — no email required, simple password change in profile.  
- 🌐 **Cloudflare Tunnel support** — play Minecraft from anywhere without exposing your IP.  
- 📂 **Mods & plugins upload** — drag‑and‑drop into your server.  
- 📜 **Live logs & console** — terminal‑style viewer with command input.  

---

## 📥 Installation

Run this **one‑liner** on your Raspberry Pi (requires Raspberry Pi OS/Debian):

```bash
curl -sSL https://raw.githubusercontent.com/YOURNAME/abysspicraft/main/install.sh | bash



# 1. Start the backend (FastAPI)
cd ~/abysspicraft/backend
source venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8000

# 2. Start the frontend (React/Tailwind)
cd ~/abysspicraft/frontend
npm run dev

# 3. Open the panel in your browser
http://raspberrypi.local:5173
# (or replace raspberrypi.local with your Pi’s IP, e.g. http://192.168.1.42:5173)

# 4. Login with default credentials
Username: admin
Password: admin
# ➡ Change your password in the Profile tab after first login.

# 5. Manage Minecraft server
# - Go to "Servers" in the sidebar
# - Select a PaperMC version from dropdown
# - Click "Download" to fetch latest build
# - Click "Start" to launch server with JDK21
# - Watch logs live in console panel
# - Send commands (e.g., /say hello)

# 6. Join Minecraft
# Local play: use your Pi’s IP → 192.168.x.x:25565
# Global play: configure Cloudflare Tunnel → mc.yourdomain.com

# 7. Upload mods/plugins
# - Go to "Servers → Mods Upload"
# - Drop .jar plugin files → stored in plugins/ folder
# - Restart server to apply


🌐 Community
Join the Abyss Hub community for support, updates, and collaboration: 👉 Discord Server