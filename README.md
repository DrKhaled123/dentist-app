# Dentist App

**Dentist App** (served at `dentist.promedic1.com`) is a standalone dental reference web application. It provides quick access to dental diseases, management protocols, recommendations, and pharmaceutical references for dental professionals.

## 🚀 Quick Start (Copy-Paste Guide)

```bash
# 1. Clone the repository
git clone https://github.com/DrKhaled123/dentist-app.git
cd dentist-app

# 2. Start the local server
node server.js

# 3. Open in browser
http://localhost:8085
```

## 📦 What's Inside

| File | Description |
|------|-------------|
| `index.html` | Main SPA entry point |
| `app.js` | Core application logic |
| `server.js` | Lightweight Node.js static file server (port 8085) |
| `styles.css` | Application styles |
| `dental diseases and managements.js` | Dental diseases & management reference data |
| `dental recommendations.js` | Dental recommendations reference data |
| `dentist pharma.js` | Dental pharmaceutical reference data |
| `mcp.json` | MCP server configuration |

## 🌐 Server Details

- **Port:** `8085`
- **Host:** `0.0.0.0`
- **Type:** Plain Node.js `http` static server
- **SPA Routing:** Falls back to `index.html` for unknown routes

## 🔗 Repository

https://github.com/DrKhaled123/dentist-app
