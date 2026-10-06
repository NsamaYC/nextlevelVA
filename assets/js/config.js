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
  // Set your AWS CloudFront or S3 bucket URL below:
  mediaBaseUrl: ""
};
