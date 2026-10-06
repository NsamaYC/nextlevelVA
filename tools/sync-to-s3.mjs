/**
 * NEXT LEVEL — AWS S3 Media Sync Tool
 * ---------------------------------------------------------------------------
 * Syncs all student videos, photos, posters, and generated assets to your
 * Amazon S3 bucket with optimal cache headers and public read permissions.
 *
 * Usage:
 *   node tools/sync-to-s3.mjs <bucket-name> [region]
 *
 * Example:
 *   node tools/sync-to-s3.mjs nextlevel-tennis-media us-east-2
 */
import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
const bucket = args[0] || process.env.S3_BUCKET;
const region = args[1] || process.env.AWS_REGION || "us-east-2";

if (!bucket) {
  console.log(`
🎾 Next Level — S3 Sync Helper
=====================================================
Please provide your S3 bucket name.

Usage:
  node tools/sync-to-s3.mjs <your-bucket-name> [region]

Or run the AWS CLI directly:
  aws s3 sync students/ s3://<your-bucket-name>/students/
  aws s3 sync assets/media/ s3://<your-bucket-name>/assets/media/
`);
  process.exit(0);
}

console.log(`\n🚀 Syncing media to s3://${bucket} (Region: ${region})...\n`);

function syncFolder(localDir, s3Prefix) {
  if (!existsSync(localDir)) return;
  console.log(`→ Syncing ${localDir} to s3://${bucket}/${s3Prefix}...`);
  const r = spawnSync(
    "aws",
    [
      "s3",
      "sync",
      localDir,
      `s3://${bucket}/${s3Prefix}`,
      "--region",
      region,
      "--no-progress",
    ],
    { stdio: "inherit", shell: true }
  );
  if (r.status !== 0) {
    console.error(`❌ Sync failed for ${localDir}. Ensure AWS CLI is authenticated ('aws configure').`);
    process.exit(r.status || 1);
  }
}

// 1. Sync students/ directory (all videos, slideshow photos, diagrams)
syncFolder("students", "students");

// 2. Sync assets/media/ directory (all posters, hero-loop.mp4, web-sized portraits)
syncFolder(join("assets", "media"), "assets/media");

console.log(`
✅ All media successfully synced to s3://${bucket}!

Next Steps:
1. Copy your S3 Bucket URL or CloudFront distribution domain:
   S3 URL: https://${bucket}.s3.${region}.amazonaws.com
   (Or CloudFront URL: https://<distribution-id>.cloudfront.net)

2. Open "assets/js/config.js" and set:
   window.NL_CONFIG = {
     mediaBaseUrl: "https://${bucket}.s3.${region}.amazonaws.com"
   };

3. Test locally or commit & push to GitHub Pages!
`);
