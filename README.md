# Next Level — Private Tennis Coaching & Video Analysis

A modern web application built for **Next Level Tennis**, showcasing private tennis coaching, high-speed video analysis, and comprehensive student portals.

---

## 🎾 Features

1. **Editorial Modern Tennis Aesthetic**
   - Direct inspiration from modern tennis academy layouts: high-impact Bebas Neue display typography, rich court green & tennis-ball lime accents, rounded media viewports, and custom video analysis HUDs.
   - Micro-animations, frame-by-frame overlays, and smooth transitions.

2. **Home Page (`index.html`)**
   - **Hero Section**: High-frame-rate video loop with viewfinder HUD, animated typography ("SWING WITH CONFIDENCE" & "ELEVATE YOUR GAME"), and quick jump button.
   - **Two Pillars**: Breakdown of **Private Coaching** and **Video Analysis**.
   - **About Section**: Interactive statistics and training philosophy.
   - **Diagnostic Showcase**: Frame-by-frame breakdown diagram with motion tracking overlays.
   - **Player Profiles Grid**: Cards for each enrolled student displaying their training report date, drill count, video count, and direct link to their profile.
   - **Booking & Consultation Form**: Interactive session request form.

3. **Player Profile Pages (`player.html?id=...`)**
   - **Complete Training Reports**: Full strengths, weaknesses, and stroke-by-stroke breakdowns (forehand, backhand, serve) transcribed directly from player report files.
   - **Media-Rich Photo Slideshow**: Full autoplay, swipeable, and keyboard-controllable carousel displaying student action photos.
   - **Personalized Drill Library**: Direct access to all drills custom-assigned to that student.
   - **Video Catalog**: Positioned at the bottom of the page for rapid access, featuring custom thumbnail posters, video durations, and full-screen video lightbox player.

4. **Dedicated Drill Pages (`drill.html?player=...&drill=...`)**
   - Embedded high-definition video demonstration with play-on-demand optimization.
   - Structured drill copy: **Core Technical Elements**, **Technical Breakdown**, **Coach's Checklist**, and **Beginner / Advanced** practice progressions.
   - Interactive court positioning diagrams and drill photos with click-to-zoom.
   - Drill-to-drill navigation pager and back-to-profile links.

5. **Students Included**
   - **Kegan Barkley** (`students/Kegan B`)
     - 6 Specialized Drills (Forehand, Backhand Front View, Backhand Side View, Forehand Backhand Cross Court, Forehand Going Forward & Backward, Side Serve)
     - 4 Analysis Videos
     - 6 Slideshow Photos
   - **Madison Staine** (`students/Madison S`)
     - 2 Specialized Drills (Attacking with Forehand Cross Court, Under the Rope Going Forward)
     - 2 Analysis Videos
     - 6 Slideshow Photos

---

## 🚀 Running Locally

To run the site locally:

```bash
# Start the local development server:
npm run dev
```

Then open your browser to [http://localhost:5173](http://localhost:5173).

---

## 🛠 Rebuilding Media & Adding Students

When adding new student folders or videos:

1. Place the student folder under `students/<Student Name>/`.
2. Ensure it contains `Profile/`, `Drills/`, and `Videos/`.
3. Update `assets/js/content.js` with the student's text copy.
4. Run:
   ```bash
   npm run media
   ```
   This will automatically extract video poster thumbnails, probe video durations, and update `assets/js/media-manifest.js`.
