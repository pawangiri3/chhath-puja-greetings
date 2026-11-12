# 🌅 शुभ छठ पूजा — Animated Greeting Website

A static Hindi Chhath Puja greeting page built with HTML, CSS and vanilla JavaScript. No build step, backend, API key or paid hosting is required.

## What's included
- Existing animated sunrise/sunset, river, diyas, flowers and fireworks
- Two-clip Chhath video player in the greeting card
- WhatsApp sharing and copy-greeting actions
- Sender name customization using `CONFIG.senderName` or `?from=Name`
- Optional user-initiated devotional music player
- Responsive layout and reduced-motion support

## Add more videos and photos (no JavaScript edits)
The greeting page reads `assets/playlist.json`. The two existing videos are already listed there. To add more media later:

1. Upload each new file into the repository's `assets/` folder. Use short, simple names such as `clip-03.mp4`, `clip-04.mp4`, or `snap-01.jpg`.
2. Open `assets/playlist.json` on GitHub and click **Edit**.
3. Add one item inside the `items` array for each file. Keep commas between entries.

Example video item:
```json
{ "type": "video", "src": "assets/clip-03.mp4", "title": "अर्घ्य का दृश्य" }
```

Example photo item (shown for 4 seconds):
```json
{ "type": "image", "src": "assets/snap-01.jpg", "title": "छठ पूजा की याद", "duration": 4000 }
```

For videos use `"type": "video"`. For JPG, PNG or WebP snapshots use `"type": "image"`; photo duration is in milliseconds (1500–30000). The playlist repeats continuously from the last item back to the first. No changes to `index.html`, `style.css` or `script.js` are needed when adding media—only upload the media file and edit `playlist.json`.

## Required video assets
Upload these files into the repository's existing `assets/` directory:
- `scene-1.mp4`
- `scene-2.mp4`
- `poster.jpg`

The video player is silent by default. Visitors press Play; the two clips then play in sequence. The three video files are provided separately in the accompanying `chhath-video-assets.zip`. Extract it and upload the files inside its `assets/` folder into this repository's `assets/` directory. If the repository currently has zero-byte placeholders with these names, replace them with the provided files.

## Customize
Open `script.js` and edit `CONFIG.senderName` (default: `Pawan Kumar`). For a personal greeting link, append `?from=Rahul` to the deployed URL.

## Optional devotional music
Place a lawfully obtained MP3 at `assets/chhath-song.mp3`. The site does not autoplay audio. Visitors must press **संगीत चलाएं**. The original Sharda Sinha Ji recording is copyrighted; only upload/host a copy if you have the necessary rights. Otherwise, add the song through Instagram's licensed music library when publishing the Reel.

## GitHub Pages
This repository is already `pawangiri3/chhath-puja-greetings`; do not create a new repository.
1. Open **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch `main` and folder `/(root)`, then Save.
4. After deployment, open: https://pawangiri3.github.io/chhath-puja-greetings/

To upload the video assets in GitHub's web UI: open the `assets/` directory → **Add file → Upload files** → select `scene-1.mp4`, `scene-2.mp4` and `poster.jpg` → **Commit changes**.

## Troubleshooting
- If the video poster or clips do not appear, confirm all three required assets are under `assets/` and filenames match exactly.
- If music does not play, confirm `assets/chhath-song.mp3` exists and is a supported MP3.
- If WhatsApp sharing does not include a link, first open the deployed HTTPS GitHub Pages URL rather than a local file.


## Automatic photo/video show + music sync
The media player reads `assets/playlist.json`. It now cycles through the 9 uploaded JPEG snapshots (each for 4 seconds) and all 3 MP4 clips. When the visitor presses the main video Play button, the slideshow and `assets/chhath-song.mp3` start from that same click. Pressing Pause stops both. The song loops continuously. The separate music Play button has been removed; mute and volume controls remain.

To add more media later, upload the file under `assets/` and add an item to `playlist.json`. Photo example: `{"type":"image","src":"assets/snap-10.jpeg","title":"छठ पूजा","duration":4000}`. Video example: `{"type":"video","src":"assets/clip-02.mp4","title":"अर्घ्य" }`. No JS edits are required.
