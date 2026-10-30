# Birthday page

Order: music picker (gramophone), cabinet (8 rooms, finale, letter, key, poem), game.

- `js/photos.js`  rooms and photos (the total is the number of points; the plan is 19) and each photo's comment
- `js/content.js` the letter, the poem, her name and the date engraved on the cabinet
- `music/`        music1-3.mp3 and music1-3.jpg (names in `js/tracks.js`)
- `photos/<room>/` 1.jpg, 2.jpg ... for each room

Testing: add `?preview` (no audio files needed) and `?reset` (clears saved progress) to the page link.
Progress is saved on the phone, so a refresh keeps the photos she already caught.
