# Ravi & Divya — Wedding Invitation App

A responsive, app-like wedding invitation website created from the details in the supplied invitation card and the section layout of the reference wedding website.

## Features
- Home / invitation hero
- Full invitation card with family names and ceremony details
- Pendli Kattera, dinner and Sumuhurtham event cards
- Live countdown to 15 November 2026, 10:14 PM (browser local time)
- Dummy illustrated couple and gallery images
- Floating hearts, music notes and floral symbols
- Original synthesized bell-style background music (starts only after the visitor taps Play music)
- RSVP preview form (does not send or save information)
- Responsive mobile navigation
- PWA manifest and service worker for install/offline caching when hosted over HTTPS or localhost

## Run locally
1. Extract the ZIP.
2. Open a terminal in the extracted folder.
3. Run:

   ```bash
   python -m http.server 8000
   ```

4. Visit `http://localhost:8000`.

You can also deploy the folder to a static hosting provider such as Vercel, Netlify or GitHub Pages.

## Notes
- The people and gallery illustrations are intentionally dummy SVG artwork, not the original photographs.
- Music is generated in the browser using the Web Audio API. Browsers require a visitor interaction before audio can play.
- The RSVP form is a front-end preview only. Connect it to a backend or form service if you want responses delivered.
- The countdown uses the visitor's browser timezone.
- The venue map link is a Google Maps search for the venue name and location; verify the exact pin before publishing.
