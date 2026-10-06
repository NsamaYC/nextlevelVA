/**
 * NEXT LEVEL — Application
 * Shared chrome (header/footer), scroll effects, and page renderers.
 * Pages declare themselves with <body data-page="home|player|drill">.
 */
(() => {
  "use strict";

  const C = window.NL_CONTENT;
  const MEDIA = window.NL_MEDIA || {};
  const page = document.body.dataset.page;

  /* ---------------- Utilities ---------------- */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const mediaBase = () => (window.NL_CONFIG && window.NL_CONFIG.mediaBaseUrl ? window.NL_CONFIG.mediaBaseUrl.replace(/\/+$/, "") : "");
  const enc = (p) => {
    if (!p) return "";
    if (p.startsWith("http://") || p.startsWith("https://") || p.startsWith("//")) return p;
    const encoded = p.replace(/^\/+/, "").split("/").map(encodeURIComponent).join("/");
    const base = mediaBase();
    return base ? `${base}/${encoded}` : encoded;
  };
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pad = (n) => String(n).padStart(2, "0");
  const posterOf = (src) => (MEDIA[src] && MEDIA[src].poster ? enc(MEDIA[src].poster) : "");
  const durationOf = (src) => {
    const d = MEDIA[src] && MEDIA[src].duration;
    return d ? `${Math.floor(d / 60)}:${pad(d % 60)}` : "";
  };
  /** Bold a leading "Label:" in a point, e.g. "Forward Swing: Compact motion…" */
  const fmtPoint = (s) => {
    const i = s.indexOf(": ");
    return i > 0 && i < 34 ? `<b>${esc(s.slice(0, i))}:</b> ${esc(s.slice(i + 2))}` : esc(s);
  };
  const playerUrl = (p) => `player.html?id=${encodeURIComponent(p.id)}`;
  const drillUrl = (p, d) => `drill.html?player=${encodeURIComponent(p.id)}&drill=${encodeURIComponent(d.id)}`;
  const params = new URLSearchParams(location.search);
  const findPlayer = (id) => C.players.find((p) => p.id === id);
  const plural = (n, w) => `${n} ${w}${n === 1 ? "" : "s"}`;

  const I = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M6 13l6 6 6-6"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4.5" width="4" height="15" rx="1"/><rect x="14" y="4.5" width="4" height="15" rx="1"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    balance: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M5 21h14M6 8l-3 6a3 3 0 0 0 6 0L6 8zm12 0-3 6a3 3 0 0 0 6 0l-3-6zM6 8h12"/></svg>',
    rotate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>',
    path: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 19c4 0 5-4 8-8s5-6 10-6"/><circle cx="21" cy="5" r="1.5" fill="currentColor"/></svg>',
    finish: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg>',
    toss: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="6" r="3"/><path d="M12 12v9M8 16l4-4 4 4"/></svg>',
    recover: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 1-15.5 6.2M3 12A9 9 0 0 1 18.5 5.8"/><path d="M21 4v5h-5M3 20v-5h5"/></svg>',
  };
  const cardIcon = (label) => {
    const l = label.toLowerCase();
    if (l.includes("stance") || l.includes("balance")) return I.balance;
    if (l.includes("prep")) return I.rotate;
    if (l.includes("swing")) return I.path;
    if (l.includes("toss")) return I.toss;
    if (l.includes("recover")) return I.recover;
    return I.finish;
  };

  const LOGO_MARK =
    '<svg class="logo__mark" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="14.5" fill="#d9f24a" stroke="#0e110f" stroke-width="1.6"/><path d="M6.5 5.5C13 11 13 21 6.5 26.5M25.5 5.5C19 11 19 21 25.5 26.5" fill="none" stroke="#0e110f" stroke-width="1.6" stroke-linecap="round"/></svg>';

  /* ---------------- Header & footer (single source of truth) ---------------- */
  function renderChrome() {
    const headerSlot = $("#site-header");
    if (headerSlot) {
      headerSlot.outerHTML = `
      <header class="site-header" id="header">
        <div class="container site-header__inner">
          <nav class="nav" aria-label="Primary">
            <a href="index.html#services">Coaching</a>
            <a href="index.html#analysis">Video Analysis</a>
            <a href="index.html#players" ${page !== "home" ? 'aria-current="page"' : ""}>Players</a>
          </nav>
          <a class="logo" href="index.html" aria-label="Next Level home">${LOGO_MARK}<span class="logo__word">Next Level</span></a>
          <nav class="nav nav--right" aria-label="Secondary">
            <a href="index.html#about">About</a>
            <a class="btn btn--dark btn--sm" href="index.html#contact" id="header-book">Book a Session</a>
          </nav>
          <button class="menu-toggle" id="menu-toggle" aria-label="Open menu" aria-expanded="false"><span></span></button>
        </div>
      </header>
      <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
        <a href="index.html#services">Coaching</a>
        <a href="index.html#analysis">Video Analysis</a>
        <a href="index.html#players">Players</a>
        <a href="index.html#about">About</a>
        <a href="index.html#contact">Book a Session</a>
      </div>`;
    }

    const footerSlot = $("#site-footer");
    if (footerSlot) {
      footerSlot.outerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div>
              <a class="logo" href="index.html">${LOGO_MARK}<span class="logo__word">Next Level</span></a>
              <p>Private tennis coaching and video analysis. See your game clearly — then take it to the next level.</p>
            </div>
            <div>
              <h4>Services</h4>
              <ul>
                <li><a href="index.html#services">Private Coaching</a></li>
                <li><a href="index.html#analysis">Video Analysis</a></li>
                <li><a href="index.html#process">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4>Players</h4>
              <ul>${C.players.map((p) => `<li><a href="${playerUrl(p)}">${esc(p.name)}</a></li>`).join("")}</ul>
            </div>
            <div>
              <h4>Studio</h4>
              <ul>
                <li><a href="index.html#about">About</a></li>
                <li><a href="index.html#contact">Book a Session</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© ${new Date().getFullYear()} Next Level Tennis. All rights reserved.</span>
            <span>Private Coaching · Video Analysis</span>
          </div>
        </div>
        <div class="footer-word" aria-hidden="true">Next Level</div>
      </footer>`;
    }
  }

  function initHeader() {
    const header = $("#header");
    if (!header) return;
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      header.classList.toggle("is-scrolled", y > 20);
      const hide = y > 500 && y > lastY && !document.body.classList.contains("menu-open");
      header.classList.toggle("is-hidden", hide);
      document.body.classList.toggle("header-visible", !hide && y > 20);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const toggle = $("#menu-toggle");
    const menu = $("#mobile-menu");
    const setMenu = (open) => {
      document.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.setAttribute("aria-hidden", String(!open));
      document.body.style.overflow = open ? "hidden" : "";
    };
    toggle.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
    $$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  }

  /* ---------------- Scroll reveal ---------------- */
  function initReveal(root = document) {
    const els = $$(".reveal:not(.is-visible), [data-observe]:not(.is-visible)", root);
    if (!("IntersectionObserver" in window)) return els.forEach((e) => e.classList.add("is-visible"));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((e) => io.observe(e));
  }

  /* ---------------- Video lightbox ---------------- */
  const Lightbox = (() => {
    let el, video, list = [], idx = 0, lastFocus;
    function build() {
      el = document.createElement("div");
      el.className = "lightbox";
      el.setAttribute("role", "dialog");
      el.setAttribute("aria-modal", "true");
      el.setAttribute("aria-label", "Video player");
      el.innerHTML = `
        <button class="icon-btn lightbox__close" id="lightbox-close" aria-label="Close video">${I.close}</button>
        <div class="lightbox__inner">
          <video class="lightbox__video" id="lightbox-video" controls playsinline preload="metadata"></video>
          <div class="lightbox__bar">
            <div><div class="lightbox__title" id="lightbox-title"></div><div class="lightbox__sub" id="lightbox-sub"></div></div>
            <div class="lightbox__nav">
              <button class="icon-btn" id="lightbox-prev" aria-label="Previous video">${I.left}</button>
              <button class="icon-btn" id="lightbox-next" aria-label="Next video">${I.right}</button>
            </div>
          </div>
        </div>`;
      document.body.appendChild(el);
      video = $("#lightbox-video", el);
      $("#lightbox-close", el).addEventListener("click", close);
      $("#lightbox-prev", el).addEventListener("click", () => show(idx - 1));
      $("#lightbox-next", el).addEventListener("click", () => show(idx + 1));
      el.addEventListener("click", (e) => { if (e.target === el) close(); });
      document.addEventListener("keydown", (e) => {
        if (!el.classList.contains("is-open")) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowRight") show(idx + 1);
        if (e.key === "ArrowLeft") show(idx - 1);
      });
    }
    function show(i) {
      idx = (i + list.length) % list.length;
      const v = list[idx];
      video.poster = posterOf(v.src);
      video.src = enc(v.src);
      $("#lightbox-title", el).textContent = v.title;
      $("#lightbox-sub", el).textContent = [v.tag, v.sub, `${idx + 1} / ${list.length}`].filter(Boolean).join("  ·  ");
      $("#lightbox-prev", el).style.visibility = list.length > 1 ? "visible" : "hidden";
      $("#lightbox-next", el).style.visibility = list.length > 1 ? "visible" : "hidden";
      video.play().catch(() => {});
    }
    function open(items, i = 0) {
      if (!el) build();
      list = items;
      lastFocus = document.activeElement;
      el.classList.add("is-open");
      document.body.style.overflow = "hidden";
      show(i);
      $("#lightbox-close", el).focus();
    }
    function close() {
      el.classList.remove("is-open");
      document.body.style.overflow = "";
      video.pause();
      video.removeAttribute("src"); // stop downloading large files
      video.load();
      lastFocus && lastFocus.focus();
    }
    return { open };
  })();

  /* ---------------- Image zoom (drill diagrams) ---------------- */
  function initZoom(root = document) {
    let z = $(".zoom");
    if (!z) {
      z = document.createElement("div");
      z.className = "zoom";
      z.innerHTML = '<img alt="">';
      z.addEventListener("click", () => z.classList.remove("is-open"));
      document.addEventListener("keydown", (e) => e.key === "Escape" && z.classList.remove("is-open"));
      document.body.appendChild(z);
    }
    $$("[data-zoom]", root).forEach((f) =>
      f.addEventListener("click", () => {
        const img = $("img", z);
        img.src = f.dataset.zoom;
        img.alt = f.dataset.alt || "";
        z.classList.add("is-open");
      })
    );
  }

  /* ======================================================================
     HOME
     ====================================================================== */
  function renderHome() {
    const grid = $("#players-grid");
    if (grid) {
      grid.innerHTML = C.players
        .map(
          (p, i) => `
        <article class="player-card reveal" data-delay="${i % 2 ? 2 : 0}">
          <a class="player-card__media" href="${playerUrl(p)}" aria-label="View ${esc(p.name)}'s profile">
            <img src="${enc(p.cover)}" alt="${esc(p.name)} on court" loading="lazy">
            <div class="player-card__chips">
              <span class="chip chip--glass">${plural(p.drills.length, "Drill")}</span>
              <span class="chip chip--glass">${plural(p.videos.length, "Video")}</span>
            </div>
            <span class="player-card__go">${I.arrow}</span>
          </a>
          <div class="player-card__body">
            <span class="eyebrow">Training Report · ${esc(p.reportShort)}</span>
            <h3 class="display player-card__name">${esc(p.name)}</h3>
            <p>${esc(p.note[0])}</p>
            <a class="btn" href="${playerUrl(p)}" id="view-${p.id}">View Profile ${I.arrow}</a>
          </div>
        </article>`
        )
        .join("");
    }

    // Live timecode on the hero HUD
    const v = $("#hero-video");
    const tc = $("#hero-tc");
    if (v && tc) {
      const tick = () => {
        const t = v.currentTime || 0;
        tc.textContent = `00:${pad(Math.floor(t))}:${pad(Math.floor((t % 1) * 30))}`;
        requestAnimationFrame(tick);
      };
      tick();
    }

    // Contact form (front-end only — connect to Formspree/Netlify/your CRM to receive submissions)
    const form = $("#contact-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!form.reportValidity()) return;
        form.classList.add("is-sent");
        form.reset();
      });
    }
  }

  /* ======================================================================
     PLAYER PROFILE
     ====================================================================== */
  function renderPlayer() {
    const root = $("#app");
    const p = findPlayer(params.get("id")) || (params.get("id") ? null : C.players[0]);
    if (!p) return renderNotFound(root, "Player not found");

    document.title = `${p.name} — Player Profile | Next Level Tennis`;
    $('meta[name="description"]').setAttribute(
      "content",
      `${p.name}'s Next Level player profile: training report, stroke analysis, ${p.drills.length} personal drills and a video catalog.`
    );

    const strokeImage = (title) => {
      const s = p.slideshow.find((x) => x.caption.toLowerCase().includes(title.toLowerCase()));
      return s ? s.src : p.cover;
    };

    root.innerHTML = `
      <section class="p-hero" id="overview">
        <div class="container">
          <div class="p-hero__grid">
            <div class="p-hero__text">
              <nav class="crumbs" aria-label="Breadcrumb">
                <a href="index.html">Home</a><span class="sep">/</span><a href="index.html#players">Players</a><span class="sep">/</span><span>${esc(p.name)}</span>
              </nav>
              <span class="eyebrow">Player Profile · ${esc(p.report)}</span>
              <h1 class="display p-hero__name"><span class="line"><span>${esc(p.firstName)}</span></span><span class="line"><span>${esc(p.lastName)}</span></span></h1>
              <div class="stats">
                <div><div class="stat__num">${pad(p.drills.length)}</div><div class="stat__label">Drills</div></div>
                <div><div class="stat__num">${pad(p.videos.length)}</div><div class="stat__label">Videos</div></div>
                <div><div class="stat__num">${pad(p.strengths.length)}</div><div class="stat__label">Strengths</div></div>
                <div><div class="stat__num">${pad(p.strokes.length)}</div><div class="stat__label">Strokes Analyzed</div></div>
              </div>
              <div class="p-hero__actions">
                <a class="btn btn--lime" href="#videos" id="jump-videos">Watch Videos ${I.down}</a>
                <a class="btn" href="#drills" id="jump-drills">View Drills ${I.arrow}</a>
              </div>
            </div>
            <div class="p-hero__portrait">
              <div class="frame"><img src="${enc(p.portrait)}" alt="Portrait of ${esc(p.name)}" style="object-position:${p.portraitPosition || "center"}" ${p.portraitFallback ? `onerror="this.onerror=null;this.src='${enc(p.portraitFallback)}'"` : ""}></div>
              <div class="badge-spin" aria-hidden="true">
                <svg class="ring" viewBox="0 0 120 120"><defs><path id="circ" d="M60,60 m-48,0 a48,48 0 1,1 96,0 a48,48 0 1,1 -96,0"/></defs>
                  <text font-family="Inter, sans-serif" font-size="10.5" font-weight="600" letter-spacing="3.2" fill="#0e110f"><textPath href="#circ">NEXT LEVEL • PLAYER PROFILE • ${p.reportShort.toUpperCase()} •</textPath></text></svg>
                <div class="core">${LOGO_MARK.replace('class="logo__mark"', "")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav class="subnav" aria-label="Profile sections">
        <div class="container subnav__inner">
          <span class="subnav__name">${esc(p.name)}</span>
          <div class="subnav__links">
            <a href="#gallery">Gallery</a>
            <a href="#report">Training Report</a>
            <a href="#strokes">Stroke Analysis</a>
            <a href="#drills">Drills</a>
            <a href="#videos">Videos</a>
          </div>
        </div>
      </nav>

      <section class="section section--tight" id="gallery">
        <div class="container">
          <div class="section-head section-head--split reveal">
            <div><span class="eyebrow">In Focus</span><h2 class="display h-lg" style="margin-top:16px">On Court with ${esc(p.firstName)}</h2></div>
            <p class="lead">Stills pulled from ${esc(p.firstName)}'s analysis sessions — the moments we study frame by frame.</p>
          </div>
          <div class="slideshow reveal" id="slideshow" tabindex="0" aria-roledescription="carousel" aria-label="${esc(p.firstName)} photo slideshow">
            <div class="slideshow__stage">
              ${p.slideshow
                .map(
                  (s, i) => `
                <figure class="slide ${i === 0 ? "is-active" : ""}" aria-roledescription="slide" aria-label="${i + 1} of ${p.slideshow.length}: ${esc(s.caption)}">
                  <div class="slide__bg" style="background-image:url('${enc(s.src)}')"></div>
                  <img class="slide__img" src="${enc(s.src)}" alt="${esc(p.firstName)} — ${esc(s.caption)}" ${i > 0 ? 'loading="lazy"' : ""}>
                </figure>`
                )
                .join("")}
              <div class="slideshow__progress">${p.slideshow.map((s, i) => `<button aria-label="Go to slide ${i + 1}"><span></span></button>`).join("")}</div>
              <div class="slideshow__caption" aria-live="polite"><span class="count"></span><span class="title"></span></div>
              <div class="slideshow__controls">
                <button class="icon-btn" data-ss="toggle" aria-label="Pause slideshow">${I.pause}</button>
                <button class="icon-btn" data-ss="prev" aria-label="Previous slide">${I.left}</button>
                <button class="icon-btn" data-ss="next" aria-label="Next slide">${I.right}</button>
              </div>
            </div>
            <div class="slideshow__thumbs">${p.slideshow.map((s, i) => `<button aria-label="Show ${esc(s.caption)}"><img src="${enc(s.src)}" alt="" loading="lazy"></button>`).join("")}</div>
          </div>
        </div>
      </section>

      <section class="section" id="report">
        <div class="container">
          <div class="report-head reveal">
            <div><span class="eyebrow">${esc(p.report)}</span><h2 class="display h-xl" style="margin-top:16px">Training Report</h2></div>
            <span class="chip chip--dark">Coach Assessment</span>
          </div>
          <div class="sw-grid">
            <article class="sw-card sw-card--s reveal">
              <div class="sw-card__head"><h3 class="display">Strengths</h3><span class="sw-card__count">${pad(p.strengths.length)}</span></div>
              <ul class="sw-list">${p.strengths.map((s) => `<li><span class="ic">${I.check}</span><p>${esc(s)}</p></li>`).join("")}</ul>
              <span class="sw-card__ghost" aria-hidden="true">+</span>
            </article>
            <article class="sw-card sw-card--w reveal" data-delay="2">
              <div class="sw-card__head"><h3 class="display">Weaknesses</h3><span class="sw-card__count">${pad(p.weaknesses.length)}</span></div>
              <ul class="sw-list">${p.weaknesses.map((s) => `<li><span class="ic">${I.target}</span><p>${esc(s)}</p></li>`).join("")}</ul>
            </article>
          </div>

          <div class="strokes" id="strokes">
            <div class="section-head reveal" style="margin-bottom:28px"><span class="eyebrow">Stroke Analysis</span><h2 class="display h-lg">Stroke by Stroke</h2></div>
            <div class="tabs reveal" role="tablist" aria-label="Strokes">
              ${p.strokes.map((s, i) => `<button class="tab" role="tab" id="tab-${i}" aria-controls="panel-${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(s.title)}</button>`).join("")}
            </div>
            ${p.strokes
              .map(
                (s, i) => `
              <div class="stroke-panel ${i === 0 ? "is-active" : ""}" role="tabpanel" id="panel-${i}" aria-labelledby="tab-${i}">
                <div class="stroke-panel__media"><img src="${enc(strokeImage(s.title))}" alt="${esc(p.firstName)} — ${esc(s.title)}" loading="lazy"><span class="chip chip--lime">${esc(s.title)}</span></div>
                <div class="stroke-panel__body">
                  <h3 class="display">${esc(s.title)}</h3>
                  <ol class="num-list">${s.points.map((pt) => `<li><span>${esc(pt)}</span></li>`).join("")}</ol>
                </div>
              </div>`
              )
              .join("")}
          </div>
        </div>
      </section>

      <section class="section section--dark note">
        <div class="container">
          <span class="eyebrow">Coach's Note</span>
          <div class="note__quote-mark" aria-hidden="true">“</div>
          <div class="note__text">${p.note.map((n, i) => `<p class="reveal" data-delay="${i}">${esc(n)}</p>`).join("")}</div>
          <div class="note__sig">Next Level Coaching Staff</div>
        </div>
      </section>

      <section class="section" id="drills">
        <div class="container">
          <div class="section-head section-head--split reveal">
            <div><span class="eyebrow">Personal Drill Library</span><h2 class="display h-xl" style="margin-top:16px">${esc(p.firstName)}'s Drills</h2></div>
            <p class="lead">Every drill targets something from the training report. Each one has its own video breakdown and coaching notes.</p>
          </div>
          <div class="drills-grid">${p.drills.map((d, i) => drillCard(p, d, i)).join("")}</div>
        </div>
      </section>

      <section class="section videos" id="videos">
        <div class="container">
          <div class="section-head section-head--split reveal">
            <div><span class="eyebrow">Video Catalog</span><h2 class="display h-xl" style="margin-top:16px">Watch <span>&</span> Review</h2></div>
            <p class="lead">${esc(p.firstName)}'s analysis footage in one place. Tap any clip to play it full screen.</p>
          </div>
          <div class="video-grid">
            ${p.videos
              .map(
                (v, i) => `
              <button class="video-card reveal" data-delay="${i % 4}" data-video="${i}" id="video-${i}" aria-label="Play ${esc(v.title)} — ${esc(v.tag)}">
                <div class="video-card__media">
                  ${posterOf(v.src) ? `<img src="${posterOf(v.src)}" alt="" loading="lazy">` : ""}
                  <span class="video-card__play"><span>${I.play}</span></span>
                  ${durationOf(v.src) ? `<span class="chip chip--glass video-card__dur">${durationOf(v.src)}</span>` : ""}
                </div>
                <div class="video-card__meta"><span class="video-card__title">${esc(v.title)}</span><span class="video-card__tag">${esc(v.tag)}</span></div>
              </button>`
              )
              .join("")}
          </div>
        </div>
      </section>`;

    const vids = p.videos.map((v) => ({ ...v, sub: p.name }));
    $$("[data-video]").forEach((b) => b.addEventListener("click", () => Lightbox.open(vids, +b.dataset.video)));

    initSlideshow($("#slideshow"), p.slideshow);
    initTabs();
    initScrollSpy();
  }

  function drillCard(p, d, i) {
    const poster = posterOf(d.video) || enc(p.cover);
    return `
      <article class="drill-card reveal" data-delay="${i % 3}">
        <a class="cover" href="${drillUrl(p, d)}" id="drill-${d.id}" aria-label="Open drill: ${esc(d.title)}"></a>
        <div class="drill-card__media">
          <img src="${poster}" alt="" loading="lazy">
          <span class="drill-card__play"><span>${I.play}</span></span>
          <span class="chip chip--lime">${esc(d.category)}</span>
          ${durationOf(d.video) ? `<span class="chip chip--glass drill-card__dur">${durationOf(d.video)}</span>` : ""}
        </div>
        <div class="drill-card__body">
          <span class="drill-card__num">DRILL ${pad(i + 1)} · ${esc(d.view).toUpperCase()}</span>
          <h3 class="drill-card__title">${esc(d.title)}</h3>
          <p>${esc(d.overview)}</p>
          <span class="drill-card__cta">Open Drill ${I.arrow}</span>
        </div>
      </article>`;
  }

  /* ---- Slideshow: story-style progress, autoplay, swipe, keyboard, pause off-screen ---- */
  function initSlideshow(root, slides) {
    if (!root) return;
    const DURATION = 5500;
    const slideEls = $$(".slide", root);
    const bars = $$(".slideshow__progress button", root);
    const thumbs = $$(".slideshow__thumbs button", root);
    const count = $(".slideshow__caption .count", root);
    const title = $(".slideshow__caption .title", root);
    const toggleBtn = $('[data-ss="toggle"]', root);
    root.style.setProperty("--slide-ms", `${DURATION}ms`);

    let index = 0, timer = null, startedAt = 0, remaining = DURATION;
    let userPaused = false, hoverPaused = false, offscreen = false;

    const go = (i) => {
      index = (i + slides.length) % slides.length;
      slideEls.forEach((s, k) => s.classList.toggle("is-active", k === index));
      thumbs.forEach((t, k) => t.classList.toggle("is-active", k === index));
      bars.forEach((b, k) => {
        b.classList.remove("is-active");
        b.classList.toggle("is-done", k < index);
      });
      void bars[index].offsetWidth; // restart CSS animation
      bars[index].classList.add("is-active");
      count.textContent = `${pad(index + 1)} / ${pad(slides.length)}`;
      title.textContent = slides[index].caption;
      const t = thumbs[index];
      t.parentElement.scrollTo({ left: t.offsetLeft - t.parentElement.clientWidth / 2 + t.clientWidth / 2, behavior: "smooth" });
      remaining = DURATION;
      schedule();
    };
    const isPaused = () => userPaused || hoverPaused || offscreen;
    const schedule = () => {
      clearTimeout(timer);
      root.classList.toggle("is-paused", isPaused());
      if (isPaused()) return;
      startedAt = performance.now();
      timer = setTimeout(() => go(index + 1), remaining);
    };
    const pause = () => {
      if (timer) { clearTimeout(timer); timer = null; remaining = Math.max(0, remaining - (performance.now() - startedAt)); }
      root.classList.toggle("is-paused", true);
    };
    const update = () => (isPaused() ? pause() : schedule());

    $('[data-ss="next"]', root).addEventListener("click", () => go(index + 1));
    $('[data-ss="prev"]', root).addEventListener("click", () => go(index - 1));
    toggleBtn.addEventListener("click", () => {
      userPaused = !userPaused;
      toggleBtn.innerHTML = userPaused ? I.play : I.pause;
      toggleBtn.setAttribute("aria-label", userPaused ? "Play slideshow" : "Pause slideshow");
      update();
    });
    bars.forEach((b, i) => b.addEventListener("click", () => go(i)));
    thumbs.forEach((t, i) => t.addEventListener("click", () => go(i)));
    const stage = $(".slideshow__stage", root);
    stage.addEventListener("mouseenter", () => { hoverPaused = true; update(); });
    stage.addEventListener("mouseleave", () => { hoverPaused = false; update(); });
    root.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") go(index + 1);
      if (e.key === "ArrowLeft") go(index - 1);
    });
    let x0 = null;
    stage.addEventListener("pointerdown", (e) => (x0 = e.clientX));
    stage.addEventListener("pointerup", (e) => {
      if (x0 === null) return;
      const dx = e.clientX - x0;
      if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
      x0 = null;
    });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([e]) => { offscreen = !e.isIntersecting; update(); }, { threshold: 0.25 }).observe(root);
    }
    go(0);
  }

  function initTabs() {
    const tabs = $$('[role="tab"]');
    const select = (i) => {
      tabs.forEach((t, k) => {
        const on = k === i;
        t.setAttribute("aria-selected", on);
        t.tabIndex = on ? 0 : -1;
        $(`#${t.getAttribute("aria-controls")}`).classList.toggle("is-active", on);
      });
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => select(i));
      t.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          const n = (i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
          select(n);
          tabs[n].focus();
        }
      });
    });
  }

  function initScrollSpy() {
    const links = $$(".subnav__links a");
    const map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            links.forEach((l) => l.classList.remove("is-active"));
            const a = map.get(e.target.id);
            if (a) a.classList.add("is-active");
          }
        }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }

  /* ======================================================================
     DRILL PAGE
     ====================================================================== */
  function renderDrill() {
    const root = $("#app");
    const p = findPlayer(params.get("player"));
    const d = p && p.drills.find((x) => x.id === params.get("drill"));
    if (!p || !d) return renderNotFound(root, "Drill not found");

    const i = p.drills.indexOf(d);
    const prev = p.drills[(i - 1 + p.drills.length) % p.drills.length];
    const next = p.drills[(i + 1) % p.drills.length];

    document.title = `${d.title} — ${p.name}'s Drill | Next Level Tennis`;
    $('meta[name="description"]').setAttribute("content", d.overview.slice(0, 155));

    const sections = d.sections || [];
    root.innerHTML = `
      <section class="d-hero">
        <div class="container">
          <nav class="crumbs" aria-label="Breadcrumb">
            <a href="index.html">Home</a><span class="sep">/</span><a href="index.html#players">Players</a><span class="sep">/</span>
            <a href="${playerUrl(p)}">${esc(p.name)}</a><span class="sep">/</span><a href="${playerUrl(p)}#drills">Drills</a>
          </nav>
          <div class="d-hero__grid">
            <div>
              <div class="d-hero__meta">
                <span class="chip chip--lime">${esc(d.category)}</span>
                <span class="chip">${esc(d.view)}</span>
                <span class="chip">Drill ${pad(i + 1)} of ${pad(p.drills.length)}</span>
              </div>
              <h1 class="display d-hero__title">${esc(d.title)}</h1>
            </div>
            <div>
              <p class="lead">${esc(d.overview)}</p>
              <a class="d-hero__player" href="${playerUrl(p)}" id="back-to-profile">
                <img src="${enc(p.portrait)}" alt="" ${p.portraitFallback ? `onerror="this.onerror=null;this.src='${enc(p.portraitFallback)}'"` : ""} style="object-position:${p.portraitPosition || "center"}">
                <span><b>${esc(p.name)}</b><small>Back to profile</small></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class="container reveal" aria-label="Drill video">
        <div class="player-video" id="drill-player">
          <video id="drill-video" controls playsinline preload="none" ${posterOf(d.video) ? `poster="${posterOf(d.video)}"` : ""}>
            <source src="${enc(d.video)}" type="video/mp4">
          </video>
          <button class="player-video__poster" id="drill-play" aria-label="Play drill video">
            ${posterOf(d.video) ? `<img src="${posterOf(d.video)}" alt="">` : ""}
            <div class="hud" aria-hidden="true"><i></i><i></i><i></i><i></i><span class="hud__rec">Analysis</span><span class="hud__tc">${durationOf(d.video) || ""}</span></div>
            <span class="circle-btn">${I.play}</span>
          </button>
        </div>
      </section>

      <section class="section section--tight">
        <div class="container">
          ${sections.map((b, k) => renderBlock(b, k, sections.length)).join("")}
        </div>
      </section>

      ${d.levels ? `
      <section class="section section--tight" style="padding-top:0">
        <div class="container">
          <div class="section-head reveal"><span class="eyebrow">Practice Plan</span><h2 class="display h-lg">Choose Your Level</h2></div>
          <div class="levels">
            ${levelCard(d.levels.beginner, "b", "Beginner", 1)}
            ${levelCard(d.levels.advanced, "a", "Advanced", 3)}
          </div>
        </div>
      </section>` : ""}

      <section class="section section--white">
        <div class="container">
          <div class="section-head section-head--split reveal">
            <div><span class="eyebrow">Keep Training</span><h2 class="display h-lg" style="margin-top:16px">More from ${esc(p.firstName)}</h2></div>
            <div style="justify-self:end"><a class="btn" href="${playerUrl(p)}#videos" id="drill-to-videos">Video Catalog ${I.arrow}</a></div>
          </div>
          ${p.drills.length > 1 ? `
          <div class="drill-pager reveal">
            <a class="pager-link" href="${drillUrl(p, prev)}" id="prev-drill"><small>← Previous Drill</small><b>${esc(prev.title)}</b></a>
            <a class="pager-link pager-link--next" href="${drillUrl(p, next)}" id="next-drill"><small>Next Drill →</small><b>${esc(next.title)}</b></a>
          </div>
          <div class="drills-grid" style="margin-top:28px">
            ${p.drills.map((x, k) => (x === d ? "" : drillCard(p, x, k))).join("")}
          </div>` : ""}
        </div>
      </section>`;

    const wrap = $("#drill-player");
    const video = $("#drill-video");
    $("#drill-play").addEventListener("click", () => {
      wrap.classList.add("is-playing");
      video.play().catch(() => {});
    });
    video.addEventListener("play", () => wrap.classList.add("is-playing"));
    initZoom(root);
  }

  function renderBlock(b, k, total) {
    let body = "";
    if (b.intro) body += `<div class="block__intro">${[].concat(b.intro).map((t) => `<p>${esc(t)}</p>`).join("")}</div>`;
    if (b.cards)
      body += `<div class="el-cards">${b.cards
        .map((c, n) => `<div class="el-card reveal" data-delay="${n % 4}"><span class="el-card__icon">${cardIcon(c.label)}</span><h3>${esc(c.label)}</h3><p>${esc(c.text)}</p></div>`)
        .join("")}</div>`;
    if (b.groups) {
      if (b.groupStyle === "timeline") {
        body += `<div class="timeline">${b.groups
          .map((g, n) => `<div class="timeline__item reveal" data-n="${n + 1}"><h3>${esc(g.title)}</h3><ul class="points">${g.points.map((x) => `<li><span>${fmtPoint(x)}</span></li>`).join("")}</ul></div>`)
          .join("")}</div>`;
      } else {
        body += `<div class="groups">${b.groups
          .map((g, n) => `<div class="group reveal" data-delay="${n % 3}"><span class="group__n">${pad(n + 1)}</span><div><h3>${esc(g.title)}</h3><ul class="points">${g.points.map((x) => `<li><span>${fmtPoint(x)}</span></li>`).join("")}</ul></div></div>`)
          .join("")}</div>`;
      }
    }
    if (b.list) {
      if (b.listTitle) body += `<h3 class="list-title">${esc(b.listTitle)}</h3>`;
      body +=
        b.listStyle === "numbered"
          ? `<ol class="ordered-list">${b.list.map((x) => `<li class="reveal"><span>${fmtPoint(x)}</span></li>`).join("")}</ol>`
          : `<ul class="check-list">${b.list.map((x) => `<li class="reveal"><span class="ic">${I.check}</span><p>${fmtPoint(x)}</p></li>`).join("")}</ul>`;
    }
    if (b.footnote) body += `<p class="block__footnote">${esc(b.footnote)}</p>`;
    if (b.figures)
      body += `<div class="figures">${b.figures
        .map(
          (f) => `<figure class="figure reveal" data-zoom="${enc(f.src)}" data-alt="${esc(f.caption)}" tabindex="0" role="button" aria-label="Enlarge: ${esc(f.caption)}">
              <img src="${enc(f.src)}" alt="${esc(f.caption)}" loading="lazy" class="${f.fit === "contain" ? "contain" : ""}"><figcaption>${esc(f.caption)}</figcaption></figure>`
        )
        .join("")}</div>`;

    return `
      <article class="block">
        <header class="block__head reveal">
          <span class="block__index">${pad(k + 1)} / ${pad(total)}</span>
          ${b.eyebrow ? `<span class="eyebrow">${esc(b.eyebrow)}</span>` : ""}
          <h2 class="display">${esc(b.title)}</h2>
        </header>
        <div class="block__body">${body}</div>
      </article>`;
  }

  function levelCard(l, mod, label, on) {
    if (!l) return "";
    return `
      <article class="level level--${mod} reveal" ${mod === "a" ? 'data-delay="2"' : ""}>
        <div style="display:flex;justify-content:space-between;align-items:center;gap:12px">
          <span class="chip ${mod === "a" ? "chip--lime" : "chip--dark"} level__tag">${label}</span>
          <span class="level__meter" aria-hidden="true">${[1, 2, 3].map((n) => `<i class="${n <= on ? "on" : ""}"></i>`).join("")}</span>
        </div>
        <h3 class="display">${esc(l.title)}</h3>
        <ol>${l.items.map((x) => `<li><span>${fmtPoint(x)}</span></li>`).join("")}</ol>
      </article>`;
  }

  function renderNotFound(root, msg) {
    document.title = `${msg} | Next Level Tennis`;
    root.innerHTML = `
      <section class="empty container">
        <span class="eyebrow" style="justify-self:center">404</span>
        <h1 class="display h-xl">${esc(msg)}</h1>
        <p class="lead" style="margin-inline:auto">Choose a player below to get back on court.</p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          ${C.players.map((p) => `<a class="btn" href="${playerUrl(p)}">${esc(p.name)} ${I.arrow}</a>`).join("")}
        </div>
      </section>`;
  }

  function applyMediaBase(root = document) {
    const base = mediaBase();
    if (!base) return;
    $$("img[src], source[src], video[poster]", root).forEach((el) => {
      if (el.hasAttribute("src")) {
        const src = el.getAttribute("src");
        if (src && !src.startsWith("http") && !src.startsWith("//") && (src.startsWith("students/") || src.startsWith("assets/media/"))) {
          el.setAttribute("src", enc(src));
        }
      }
      if (el.hasAttribute("poster")) {
        const poster = el.getAttribute("poster");
        if (poster && !poster.startsWith("http") && !poster.startsWith("//") && (poster.startsWith("students/") || poster.startsWith("assets/media/"))) {
          el.setAttribute("poster", enc(poster));
        }
      }
    });
  }

  /* ---------------- Boot ---------------- */
  applyMediaBase();
  renderChrome();
  if (page === "home") renderHome();
  if (page === "player") renderPlayer();
  if (page === "drill") renderDrill();
  initHeader();
  initReveal();
})();
