# Anniversary page

Sections play in this order: music picker, cabinet, letter, poem, game.
Each section is its own file in `sections/` and registers itself in `window.Sections`.
`js/main.js` holds the order and loads them one by one; a missing file shows a "coming soon" card.

## Adding music
1. Upload instrumental `.mp3` files into the `music/` folder (GitHub: Add file > Upload files).
2. Edit `js/tracks.js` so each entry's `file` matches an uploaded file name.
