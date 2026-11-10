/**
 * NEXT LEVEL — Authentication & Security Service
 * ---------------------------------------------------------------------------
 * Provides AWS Cognito User Pool integration, 6-digit player access code
 * authentication, session management, and strict per-player access control
 * for student profiles, drills, and video catalogs.
 */
(() => {
  "use strict";

  const STORAGE_KEY = "nl_player_auth_session";
  const CONFIG = (window.NL_CONFIG && window.NL_CONFIG.auth) || {};

  // Hardcoded 6-digit access codes mapped to individual student profiles + Head Coach
  const DEFAULT_DEMO_USERS = [
    {
      username: "kegan@nextlevel.com",
      accessCode: "482915",
      password: "482915",
      name: "Kegan Barkley",
      playerId: "kegan-b",
      role: "player",
    },
    {
      username: "madison@nextlevel.com",
      accessCode: "739204",
      password: "739204",
      name: "Madison Staine",
      playerId: "madison-s",
      role: "player",
    },
    {
      username: "sayf@nextlevel.com",
      accessCode: "615839",
      password: "615839",
      name: "Sayf Baig",
      playerId: "sayf-b",
      role: "player",
    },
    {
      username: "max@nextlevel.com",
      accessCode: "294761",
      password: "294761",
      name: "Max Melgarejo Gamiz",
      playerId: "max-g",
      role: "player",
    },
    {
      username: "sebastian@nextlevel.com",
      accessCode: "850342",
      password: "850342",
      name: "Sebastian Melgarejo Gamiz",
      playerId: "sebastian-g",
      role: "player",
    },
    {
      username: "tara@nextlevel.com",
      accessCode: "527196",
      password: "527196",
      name: "Tara McLaren",
      playerId: "tara-m",
      role: "player",
    },
    {
      username: "coach@nextlevel.com",
      accessCode: "904812",
      password: "904812",
      name: "Head Coach",
      playerId: "all",
      role: "coach",
    },
  ];

  /* ---------------- Internal Storage Helpers ---------------- */
  function getSession() {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const s = JSON.parse(raw);
      if (s.expiresAt && Date.now() > s.expiresAt) {
        clearSession();
        return null;
      }
      return s;
    } catch {
      return null;
    }
  }

  function setSession(session, persist = true) {
    const data = JSON.stringify(session);
    sessionStorage.setItem(STORAGE_KEY, data);
    if (persist) {
      localStorage.setItem(STORAGE_KEY, data);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    dispatchAuthChange();
  }

  function clearSession() {
    sessionStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY);
    dispatchAuthChange();
  }

  function dispatchAuthChange() {
    window.dispatchEvent(new CustomEvent("nl:auth-change", { detail: { user: getUser() } }));
  }

  function getUser() {
    const s = getSession();
    if (!s) return null;
    return {
      username: s.username,
      name: s.name,
      role: s.role || "player",
      playerId: s.playerId,
      token: s.idToken || s.accessToken || null,
      expiresAt: s.expiresAt,
    };
  }

  function isAuthenticated() {
    return !!getUser();
  }

  function isCoach() {
    const u = getUser();
    return !!(u && u.role === "coach");
  }

  /**
   * Evaluates if current authenticated user has access to a specific player ID.
   * - Coaches ("role": "coach") can access all players.
   * - Players ("role": "player") can ONLY access their own assigned playerId.
   */
  function canAccessPlayer(playerId) {
    if (CONFIG.demoMode === true) return true;
    const u = getUser();
    if (!u) return false;
    if (u.role === "coach" || u.playerId === "all") return true;
    return u.playerId === playerId;
  }

  /* ---------------- AWS Cognito Authentication ---------------- */
  async function authenticateWithCognito(username, password) {
    const region = CONFIG.region || "us-east-2";
    const clientId = CONFIG.userPoolWebClientId;
    if (!clientId || clientId.includes("xxxx")) {
      throw new Error("Cognito Client ID not configured");
    }

    const endpoint = `https://cognito-idp.${region}.amazonaws.com/`;
    const payload = {
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: clientId,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-amz-json-1.1",
        "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      const msg = data.message || data.__type || "Cognito authentication failed";
      throw new Error(msg);
    }

    const authRes = data.AuthenticationResult;
    if (!authRes) {
      throw new Error("Multi-factor or custom challenge not yet supported in direct login");
    }

    const tokenParts = (authRes.IdToken || "").split(".");
    let claims = {};
    if (tokenParts.length === 3) {
      try {
        claims = JSON.parse(atob(tokenParts[1]));
      } catch {}
    }

    const email = claims.email || username;
    let playerId = claims["custom:playerId"] || null;
    let role = claims["custom:role"] || (email.includes("coach") ? "coach" : "player");
    let name = claims.name || claims["cognito:username"] || username;

    if (!playerId) {
      if (email.toLowerCase().includes("kegan")) playerId = "kegan-b";
      else if (email.toLowerCase().includes("madison")) playerId = "madison-s";
      else if (email.toLowerCase().includes("sayf")) playerId = "sayf-b";
      else if (email.toLowerCase().includes("max")) playerId = "max-g";
      else if (email.toLowerCase().includes("sebastian")) playerId = "sebastian-g";
      else if (email.toLowerCase().includes("tara")) playerId = "tara-m";
      else if (role === "coach") playerId = "all";
    }

    return {
      username: email,
      name,
      role,
      playerId,
      accessToken: authRes.AccessToken,
      idToken: authRes.IdToken,
      refreshToken: authRes.RefreshToken,
      expiresAt: Date.now() + (authRes.ExpiresIn || 3600) * 1000,
    };
  }

  /* ---------------- 6-Digit Access Code Authentication ---------------- */
  function authenticateWithAccessCode(targetIdentifier, password) {
    const users = CONFIG.demoUsers || DEFAULT_DEMO_USERS;
    const cleanId = (targetIdentifier || "").trim().toLowerCase();
    const cleanCode = (password || "").trim();

    if (!cleanCode) {
      throw new Error("Please enter your 6-digit access code.");
    }

    // Find user matching the 6-digit access code
    const matchedByCode = users.find(
      (u) => (u.accessCode && u.accessCode === cleanCode) || u.password === cleanCode
    );

    if (!matchedByCode) {
      throw new Error("Invalid 6-digit access code. Please check your player code and try again.");
    }

    // If a specific player/profile was selected or targeted, verify this code is authorized for it
    if (cleanId && cleanId !== "any") {
      const targetUser = users.find(
        (u) =>
          u.playerId.toLowerCase() === cleanId ||
          u.username.toLowerCase() === cleanId ||
          u.name.toLowerCase() === cleanId
      );

      if (targetUser) {
        const isCoachCode = matchedByCode.role === "coach" || matchedByCode.playerId === "all";
        const isExactPlayerMatch = matchedByCode.playerId === targetUser.playerId;
        if (!isExactPlayerMatch && !isCoachCode) {
          throw new Error(
            `Access denied: That 6-digit code belongs to another student and cannot unlock ${targetUser.name}'s profile.`
          );
        }
      }
    }

    return {
      username: matchedByCode.username,
      name: matchedByCode.name,
      role: matchedByCode.role,
      playerId: matchedByCode.playerId,
      accessToken: `nl-code-jwt-${matchedByCode.playerId}`,
      idToken: `nl-code-id-${matchedByCode.playerId}`,
      expiresAt: Date.now() + 12 * 3600 * 1000,
    };
  }

  /* ---------------- Public Login Method ---------------- */
  async function login(usernameOrPlayerId, password, remember = true) {
    // 1. Try real AWS Cognito if enabled & configured with a real Client ID
    if (CONFIG.enabled && CONFIG.userPoolWebClientId && !CONFIG.userPoolWebClientId.includes("xxxx")) {
      try {
        const session = await authenticateWithCognito(usernameOrPlayerId, password);
        setSession(session, remember);
        return session;
      } catch (err) {
        console.warn("Cognito login failed, checking access code:", err.message);
      }
    }

    // 2. Authenticate with unique 6-digit access code
    const session = authenticateWithAccessCode(usernameOrPlayerId, password);
    setSession(session, remember);
    return session;
  }

  function logout() {
    clearSession();
    if (location.pathname.includes("player.html") || location.pathname.includes("drill.html")) {
      location.href = "index.html";
    }
  }

  /* ---------------- Modal UI ---------------- */
  let modalEl = null;

  function ensureModal() {
    if (modalEl) return modalEl;
    const users = CONFIG.demoUsers || DEFAULT_DEMO_USERS;

    modalEl = document.createElement("div");
    modalEl.className = "auth-modal";
    modalEl.setAttribute("role", "dialog");
    modalEl.setAttribute("aria-modal", "true");
    modalEl.setAttribute("aria-label", "Player Portal Authentication");
    modalEl.innerHTML = `
      <div class="auth-modal__backdrop"></div>
      <div class="auth-modal__card">
        <button class="icon-btn auth-modal__close" id="auth-close" aria-label="Close dialog">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>

        <div class="auth-modal__head">
          <div class="auth-modal__badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="width:20px;height:20px;">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span>PRIVATE PLAYER PORTAL</span>
          </div>
          <h2 class="display h-md" id="auth-title">Enter Player Access Code</h2>
          <p class="auth-modal__sub" id="auth-desc">Enter your personal 6-digit access code to unlock your private drills and video analysis archive.</p>
        </div>

        <form class="auth-modal__form" id="auth-form">
          <div class="auth-field">
            <label for="auth-profile">Player / Coach Profile</label>
            <select id="auth-profile" style="width:100%;height:46px;padding:0 14px;border-radius:var(--r-sm);border:1px solid var(--line-strong);background:var(--white);color:var(--ink);font-family:var(--font-body);font-size:0.95rem;font-weight:500;">
              <option value="any">Auto-Detect from 6-Digit Code</option>
              ${users
                .map(
                  (u) =>
                    `<option value="${u.playerId}">${
                      u.role === "coach" ? `🎓 ${u.name} (All Profiles)` : `👤 ${u.name}`
                    }</option>`
                )
                .join("")}
            </select>
          </div>
          <div class="auth-field">
            <label for="auth-pwd">6-Digit Access Code</label>
            <input
              type="password"
              id="auth-pwd"
              required
              maxlength="6"
              inputmode="numeric"
              pattern="[0-9A-Za-z!@#$%^&*]{4,20}"
              placeholder="• • • • • •"
              autocomplete="one-time-code"
              style="letter-spacing:0.35em;font-size:1.25rem;font-weight:600;text-align:center;"
            >
          </div>
          <div class="auth-msg" id="auth-msg" role="alert"></div>

          <button type="submit" class="btn btn--lime" style="width:100%" id="auth-submit">
            Unlock Portal
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </button>
        </form>
      </div>
    `;

    document.body.appendChild(modalEl);

    const closeBtn = modalEl.querySelector("#auth-close");
    const backdrop = modalEl.querySelector(".auth-modal__backdrop");
    const form = modalEl.querySelector("#auth-form");

    closeBtn.addEventListener("click", closeLoginModal);
    backdrop.addEventListener("click", closeLoginModal);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const selectedProfile = modalEl.querySelector("#auth-profile").value;
      const pwd = modalEl.querySelector("#auth-pwd").value;
      const msg = modalEl.querySelector("#auth-msg");
      const btn = modalEl.querySelector("#auth-submit");

      msg.textContent = "";
      msg.className = "auth-msg";
      btn.disabled = true;
      btn.textContent = "Verifying Code...";

      try {
        await login(selectedProfile, pwd);
        const signedInUser = getUser();
        closeLoginModal();
        if (modalEl._onSuccess) {
          modalEl._onSuccess(signedInUser);
        } else if (
          location.pathname.endsWith("index.html") ||
          location.pathname === "/" ||
          location.pathname.endsWith("/")
        ) {
          if (signedInUser && signedInUser.role !== "coach" && signedInUser.playerId) {
            location.href = `player.html?id=${encodeURIComponent(signedInUser.playerId)}`;
          } else {
            location.reload();
          }
        } else {
          location.reload();
        }
      } catch (err) {
        msg.textContent = err.message || "Invalid access code";
        msg.className = "auth-msg is-error";
      } finally {
        btn.disabled = false;
        btn.innerHTML = `Unlock Portal <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
      }
    });

    return modalEl;
  }

  function openLoginModal(opts = {}) {
    const el = ensureModal();
    el._onSuccess = opts.onSuccess || null;
    const desc = el.querySelector("#auth-desc");
    const select = el.querySelector("#auth-profile");
    const pwdInput = el.querySelector("#auth-pwd");
    const msg = el.querySelector("#auth-msg");

    if (msg) {
      msg.textContent = "";
      msg.className = "auth-msg";
    }
    if (pwdInput) pwdInput.value = "";

    if (opts.targetPlayerId && select) {
      select.value = opts.targetPlayerId;
    } else if (select) {
      select.value = "any";
    }

    if (opts.message && desc) {
      desc.textContent = opts.message;
    } else if (desc) {
      desc.textContent =
        "Enter your personal 6-digit access code to unlock your private drills and video analysis archive.";
    }

    el.classList.add("is-open");
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      pwdInput && pwdInput.focus();
    }, 100);
  }

  function closeLoginModal() {
    if (!modalEl) return;
    modalEl.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  /* ---------------- Gate Screen Helper ---------------- */
  function renderLockScreen(container, reason, targetPlayer) {
    const user = getUser();
    const targetName = targetPlayer ? targetPlayer.name : "this student";
    const targetId = targetPlayer ? targetPlayer.id : "any";

    container.innerHTML = `
      <section class="auth-gate container">
        <div class="auth-gate__card reveal is-visible">
          <div class="auth-gate__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <span class="eyebrow" style="color:var(--court-2)">Access Restricted · Private Profile</span>
          <h1 class="display h-lg" style="margin-top:12px">${
            targetPlayer ? `${targetPlayer.name}'s Portal` : "Protected Player Portal"
          }</h1>
          <p class="lead" style="margin-inline:auto;max-width:54ch;">
            ${
              reason === "unauthenticated"
                ? `Enter the 6-digit access code for <b>${targetName}</b> (or Coach code) to view their personal drills and video analysis.`
                : `You are currently signed in as <b>${user.name}</b>. Your access code only unlocks your own videos and drills. This profile is private to <b>${targetName}</b>.`
            }
          </p>

          ${
            reason === "unauthenticated"
              ? `
            <form id="gate-code-form" style="max-width:340px;margin:24px auto 0;display:grid;gap:12px;">
              <input
                type="password"
                id="gate-code-input"
                required
                maxlength="6"
                inputmode="numeric"
                placeholder="6-Digit Code"
                autocomplete="one-time-code"
                aria-label="6-Digit Access Code"
                style="width:100%;padding:14px 16px;border-radius:var(--r-sm);border:1px solid var(--line-strong);background:var(--white);color:var(--ink);font-size:1.3rem;font-weight:600;letter-spacing:0.3em;text-align:center;"
              >
              <div class="auth-msg" id="gate-code-msg" role="alert"></div>
              <button type="submit" class="btn btn--lime" id="gate-code-submit" style="width:100%;justify-content:center;">
                Unlock ${targetPlayer ? targetPlayer.firstName + "'s" : "Player"} Profile
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </button>
              <a class="btn" href="index.html" style="width:100%;justify-content:center;">Back to Home</a>
            </form>
          `
              : `
            <div class="auth-gate__actions">
              <a class="btn btn--lime" href="player.html?id=${encodeURIComponent(user.playerId)}">
                Go to My Profile (${user.name})
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </a>
              <button class="btn btn--dark" id="gate-switch">Enter Different Code</button>
            </div>
          `
          }
        </div>
      </section>
    `;

    const gateForm = container.querySelector("#gate-code-form");
    if (gateForm) {
      const codeInput = container.querySelector("#gate-code-input");
      const msgEl = container.querySelector("#gate-code-msg");
      setTimeout(() => codeInput && codeInput.focus(), 80);

      gateForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        msgEl.textContent = "";
        msgEl.className = "auth-msg";
        try {
          await login(targetId, codeInput.value);
        } catch (err) {
          msgEl.textContent = err.message || "Invalid access code";
          msgEl.className = "auth-msg is-error";
        }
      });
    }

    const switchBtn = container.querySelector("#gate-switch");
    if (switchBtn) {
      switchBtn.addEventListener("click", () => {
        clearSession();
        openLoginModal({ targetPlayerId: targetId !== "any" ? targetId : undefined });
      });
    }
  }

  // Export API
  window.NL_AUTH = {
    getUser,
    isAuthenticated,
    isCoach,
    canAccessPlayer,
    login,
    logout,
    openLoginModal,
    closeLoginModal,
    renderLockScreen,
  };
})();
