# Anniversary page

Order: music picker (with the gramophone), cabinet, letter, poem, game.
Each section is a file in `sections/` that registers itself in `window.Sections`; `js/main.js` loads them in order
and shows a "coming soon" card for any that do not exist yet.

The gramophone (`js/gramophone.js`) is one element: centred in the intro, then parked bottom-left for the rest of the page.
Tapping it opens the control panel (`js/panel.js`): volume, queue reset, and the four atmosphere sliders.
The small speaker button next to it mutes everything.

## Music
1. Put `music1.mp3`, `music2.mp3`, `music3.mp3` (instrumental) and `music1.jpg`, `music2.jpg`, `music3.jpg` in `music/`.
2. Names and titles live in `js/tracks.js`.
3. Add `?preview` to the page URL to click through without audio files.
