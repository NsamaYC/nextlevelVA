/**
 * NEXT LEVEL — Deployment & Media Configuration
 * ---------------------------------------------------------------------------
 * When deploying to GitHub Pages, videos and heavy media are offloaded to
 * an AWS S3 bucket (or AWS CloudFront distribution) to stay within GitHub's
 * file size and bandwidth limits.
 *
 * HOW IT WORKS:
 * 1. LOCAL DEV:
 *    Leave mediaBaseUrl as "" (empty string).
 *    All media will load from local files in your repository.
 *
 * 2. PRODUCTION (AWS S3 or CloudFront):
 *    Set mediaBaseUrl to your public S3 bucket URL or CloudFront domain.
 *    Examples:
 *      mediaBaseUrl: "https://your-bucket-name.s3.us-east-2.amazonaws.com"
 *      mediaBaseUrl: "https://d123456abcdef.cloudfront.net"
 *
 * All media paths (students/... and assets/media/...) will automatically
 * be prefixed with this base URL.
 */
window.NL_CONFIG = {
  // Connected AWS S3 bucket endpoint (us-east-2)
  mediaBaseUrl: "https://nextlevel-tennis-media-312392183301-us-east-2.amazonaws.com".replace(
    ".s3.us-east-2.amazonaws.com",
    ""
  ).includes("s3")
    ? "https://nextlevel-tennis-media-312392183301-us-east-2-an.s3.us-east-2.amazonaws.com"
    : "https://nextlevel-tennis-media-312392183301-us-east-2-an.s3.us-east-2.amazonaws.com",

  // Player Portal Authentication & Per-Player Access Control
  auth: {
    enabled: true,
    region: "us-east-2",
    // To connect a live AWS Cognito User Pool in the future, paste your User Pool ID and App Client ID below:
    userPoolId: "us-east-2_examplePool",
    userPoolWebClientId: "xxxxxxxxxxxxxxxxxxxxxxxxxx",

    // Strict per-player authentication enforced (false = require 6-digit access code)
    demoMode: false,

    // Hardcoded 6-digit access codes: each code unlocks ONLY that specific player's profile & videos
    demoUsers: [
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
    ],
  },
};
