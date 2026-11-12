# 🌅 शुभ छठ पूजा — Animated Greeting Website

Pure HTML + CSS + JavaScript. No build step, no backend, no paid service. Works on GitHub Pages.

## Customise
Open `script.js` and edit `CONFIG` at the top:
- `senderName` — your name (default "Pawan Kumar")
- `siteUrl` — optional: your final GitHub Pages URL
- Per-friend link without editing code: `https://USERNAME.github.io/chhath-puja/?from=Rahul`

## Music (optional)
Put your legally obtained MP3 at `assets/chhath-song.mp3`. Nothing is autoplayed; the visitor taps **संगीत चलाएं**. Without the file, the site works and shows a friendly message. See `assets/README.txt`.

## Deploy FREE on GitHub Pages
1. **Create a repo:** sign in at github.com → **+** → **New repository** → name it `chhath-puja` → choose **Public** → **Create repository**.
2. **Upload files:** click **uploading an existing file**. Drag in `index.html`, `style.css`, `script.js`, `README.md` and the `assets` folder (with `chhath-song.mp3` if you have it). Click **Commit changes**. (`index.html` must be in the repo root.)
3. **Enable Pages:** repo → **Settings** → **Pages** (left menu).
4. **Source:** under *Build and deployment* choose **Deploy from a branch**; Branch: **main**, Folder: **/ (root)** → **Save**.
5. **Get your URL:** wait 1–2 minutes and refresh the Pages screen. It shows `https://USERNAME.github.io/chhath-puja/` — open it, then press **WhatsApp पर भेजें** (it shares this live URL).
6. **Update later:** open the file in the repo → ✏️ edit → **Commit changes** (or **Add file → Upload files** to replace). The site refreshes in about a minute; hard-refresh your phone browser if you still see the old version.

## Troubleshooting
- 404 page: confirm `index.html` is in the root and Pages is set to `main` / `/ (root)`.
- No music: file name must be exactly `chhath-song.mp3` inside `assets/`.
- WhatsApp shows no link: you're on localhost/file — use the deployed URL or fill `siteUrl`.
