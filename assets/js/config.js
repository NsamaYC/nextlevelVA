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
  mediaBaseUrl: "https://nextlevel-tennis-media-312392183301-us-east-2-an.s3.us-east-2.amazonaws.com",

  // AWS Cognito Authentication & Security Configuration
  auth: {
    enabled: true,
    region: "us-east-2",
    // To connect your live AWS Cognito User Pool, paste your User Pool ID and App Client ID below:
    userPoolId: "us-east-2_examplePool",
    userPoolWebClientId: "xxxxxxxxxxxxxxxxxxxxxxxxxx", // Public App Client ID (no client secret for SPAs)

    // Demo Mode allows immediate testing with preconfigured student & coach accounts
    demoMode: true,
    demoUsers: [
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
    ],
  },
};

