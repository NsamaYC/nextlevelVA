/**
 * NEXT LEVEL — Authentication & Security Service
 * ---------------------------------------------------------------------------
 * Provides AWS Cognito User Pool integration, session management, and
 * per-player access control for student profiles, drills, and video catalogs.
 */
(() => {
  "use strict";

  const STORAGE_KEY = "nl_player_auth_session";
  const CONFIG = (window.NL_CONFIG && window.NL_CONFIG.auth) || {};

  // Default demo accounts mapped to student profiles
  const DEFAULT_DEMO_USERS = [
    {
      username: "kegan@nextlevel.com",
      password: "Password123!",
      name: "Kegan Barkley",
      playerId: "kegan-b",
      role: "player",
    },
    {
      username: "madison@nextlevel.com",
      password: "Password123!",
      name: "Madison Staine",
      playerId: "madison-s",
      role: "player",
    },
    {
      username: "coach@nextlevel.com",
      password: "CoachPassword123!",
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

  function setSession(session, persist = false) {
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
   * - Coaches have access to all players ("all").
   * - Students only have access to their own player ID.
   */
  function canAccessPlayer(playerId) {
    const u = getUser();
    if (!u) return false;
    if (u.role === "coach") return true;
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

    // Decode ID token payload to read custom attributes (e.g. custom:playerId, custom:role)
    const tokenParts = (authRes.IdToken || "").split(".");
    let claims = {};
    if (tokenParts.length === 3) {
      try {
        claims = JSON.parse(atob(tokenParts[1]));
      } catch {}
    }

    // Map cognito user attributes or email fallback to player
    const email = claims.email || username;
    let playerId = claims["custom:playerId"] || null;
    let role = claims["custom:role"] || (email.includes("coach") ? "coach" : "player");
    let name = claims.name || claims["cognito:username"] || username;

    if (!playerId) {
      if (email.toLowerCase().includes("kegan")) playerId = "kegan-b";
      else if (email.toLowerCase().includes("madison")) playerId = "madison-s";
      else if (role === "coach") playerId = "all";
      else playerId = "kegan-b"; // default fallback
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

  /* ---------------- Demo Fallback Authentication ---------------- */
  function authenticateDemo(username, password) {
    const demoUsers = CONFIG.demoUsers || DEFAULT_DEMO_USERS;
    const cleanU = (username || "").trim().toLowerCase();
    const user = demoUsers.find(
      (u) =>
        (u.username.toLowerCase() === cleanU || u.playerId.toLowerCase() === cleanU || u.name.toLowerCase() === cleanU) &&
        u.password === password
    );

    if (!user) {
      // Also match simple player names as quick demo credentials
      if (cleanU === "kegan" || cleanU === "kegan-b") {
        return {
          username: "kegan@nextlevel.com",
          name: "Kegan Barkley",
          role: "player",
          playerId: "kegan-b",
          accessToken: "demo-jwt-kegan-b",
          idToken: "demo-id-token-kegan-b",
          expiresAt: Date.now() + 7200 * 1000,
        };
      }
      if (cleanU === "madison" || cleanU === "madison-s") {
        return {
          username: "madison@nextlevel.com",
          name: "Madison Staine",
          role: "player",
          playerId: "madison-s",
          accessToken: "demo-jwt-madison-s",
          idToken: "demo-id-token-madison-s",
          expiresAt: Date.now() + 7200 * 1000,
        };
      }
      if (cleanU === "coach") {
        return {
          username: "coach@nextlevel.com",
          name: "Head Coach",
          role: "coach",
          playerId: "all",
          accessToken: "demo-jwt-coach",
          idToken: "demo-id-token-coach",
          expiresAt: Date.now() + 7200 * 1000,
        };
      }
      throw new Error("Invalid username or password. Check credentials or select a demo account.");
    }

    return {
      username: user.username,
      name: user.name,
      role: user.role,
      playerId: user.playerId,
      accessToken: `demo-jwt-${user.playerId}`,
      idToken: `demo-id-token-${user.playerId}`,
      expiresAt: Date.now() + 7200 * 1000,
    };
  }

  /* ---------------- Public Login Method ---------------- */
  async function login(username, password, remember = true) {
    // 1. Try real AWS Cognito if enabled & configured
    if (CONFIG.enabled && CONFIG.userPoolWebClientId && !CONFIG.userPoolWebClientId.includes("xxxx")) {
      try {
        const session = await authenticateWithCognito(username, password);
        setSession(session, remember);
        return session;
      } catch (err) {
        if (!CONFIG.demoMode) throw err;
        console.warn("Cognito login failed, attempting demo account match:", err.message);
      }
    }

    // 2. Demo fallback login
    const session = authenticateDemo(username, password);
    setSession(session, remember);
    return session;
  }

  function logout() {
    clearSession();
    // If on a protected player or drill page, return to home or reload
    if (location.pathname.includes("player.html") || location.pathname.includes("drill.html")) {
      location.href = "index.html";
    }
  }

  /* ---------------- Modal UI ---------------- */
  let modalEl = null;

  function ensureModal() {
    if (modalEl) return modalEl;
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
            <span>AWS COGNITO SECURE PORTAL</span>
          </div>
          <h2 class="display h-md" id="auth-title">Player Sign In</h2>
          <p class="auth-modal__sub" id="auth-desc">Enter your credentials to access private player analysis, training reports, and video archives.</p>
        </div>

        <form class="auth-modal__form" id="auth-form">
          <div class="auth-field">
            <label for="auth-email">Player Email / Username</label>
            <input type="text" id="auth-email" required placeholder="player@nextlevel.com" autocomplete="username">
          </div>
          <div class="auth-field">
            <label for="auth-pwd">Password</label>
            <input type="password" id="auth-pwd" required placeholder="••••••••••••" autocomplete="current-password">
          </div>
          <div class="auth-msg" id="auth-msg" role="alert"></div>

          <button type="submit" class="btn btn--lime" style="width:100%" id="auth-submit">
            Sign In to Portal
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </button>
        </form>

        <div class="auth-modal__demo">
          <span class="label">Quick Demo Access</span>
          <div class="auth-modal__demo-btns">
            <button class="btn btn--dark btn--sm" data-demo-user="kegan">
              <span>👤 Kegan Barkley</span>
            </button>
            <button class="btn btn--dark btn--sm" data-demo-user="madison">
              <span>👤 Madison Staine</span>
            </button>
            <button class="btn btn--dark btn--sm" data-demo-user="coach">
              <span>🎓 Head Coach (All Access)</span>
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modalEl);

    // Event listeners
    const closeBtn = modalEl.querySelector("#auth-close");
    const backdrop = modalEl.querySelector(".auth-modal__backdrop");
    const form = modalEl.querySelector("#auth-form");

    closeBtn.addEventListener("click", closeLoginModal);
    backdrop.addEventListener("click", closeLoginModal);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = modalEl.querySelector("#auth-email").value;
      const pwd = modalEl.querySelector("#auth-pwd").value;
      const msg = modalEl.querySelector("#auth-msg");
      const btn = modalEl.querySelector("#auth-submit");

      msg.textContent = "";
      msg.className = "auth-msg";
      btn.disabled = true;
      btn.textContent = "Authenticating...";

      try {
        await login(email, pwd);
        closeLoginModal();
        if (modalEl._onSuccess) {
          modalEl._onSuccess(getUser());
        } else {
          location.reload();
        }
      } catch (err) {
        msg.textContent = err.message || "Authentication failed";
        msg.className = "auth-msg is-error";
      } finally {
        btn.disabled = false;
        btn.innerHTML = `Sign In to Portal <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
      }
    });

    // Demo buttons
    modalEl.querySelectorAll("[data-demo-user]").forEach((b) => {
      b.addEventListener("click", async () => {
        const who = b.dataset.demoUser;
        const msg = modalEl.querySelector("#auth-msg");
        try {
          await login(who, who === "coach" ? "CoachPassword123!" : "Password123!");
          closeLoginModal();
          if (modalEl._onSuccess) {
            modalEl._onSuccess(getUser());
          } else {
            location.reload();
          }
        } catch (err) {
          msg.textContent = err.message;
          msg.className = "auth-msg is-error";
        }
      });
    });

    return modalEl;
  }

  function openLoginModal(opts = {}) {
    const el = ensureModal();
    el._onSuccess = opts.onSuccess || null;
    const desc = el.querySelector("#auth-desc");
    if (opts.message) desc.textContent = opts.message;

    el.classList.add("is-open");
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      const input = el.querySelector("#auth-email");
      input && input.focus();
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
    container.innerHTML = `
      <section class="auth-gate container">
        <div class="auth-gate__card reveal">
          <div class="auth-gate__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <span class="eyebrow" style="color:var(--lime)">Access Restricted</span>
          <h1 class="display h-lg" style="margin-top:12px">Protected Player Portal</h1>
          <p class="lead" style="margin-inline:auto;max-width:54ch;">
            ${
              reason === "unauthenticated"
                ? "This training profile, stroke analysis, and video archive are restricted to authenticated Next Level students."
                : `You are currently signed in as <b>${user.name}</b>. This profile is private to <b>${targetPlayer ? targetPlayer.name : "another student"}</b>.`
            }
          </p>

          <div class="auth-gate__actions">
            ${
              reason === "unauthenticated"
                ? `<button class="btn btn--lime" id="gate-login">Sign In with Player Account <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
                   <a class="btn" href="index.html">Back to Home</a>`
                : `<a class="btn btn--lime" href="player.html?id=${user.playerId}">Go to My Profile (${user.name}) <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
                   <button class="btn btn--dark" id="gate-switch">Switch Account</button>`
            }
          </div>
        </div>
      </section>
    `;

    const loginBtn = container.querySelector("#gate-login");
    loginBtn && loginBtn.addEventListener("click", () => openLoginModal());

    const switchBtn = container.querySelector("#gate-switch");
    switchBtn &&
      switchBtn.addEventListener("click", () => {
        logout();
        openLoginModal();
      });
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
