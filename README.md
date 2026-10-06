# Next Level — Private Tennis Coaching & Video Analysis

A modern web application built for **Next Level Tennis**, showcasing private tennis coaching, high-speed video analysis, and comprehensive student portals.

---

## 🎾 Project Highlights

- **Lean Repository**: Source code, lightweight posters, and copy are ~7 MB, ready for instant GitHub Pages deployment.
- **AWS S3 / CloudFront Media Offloading**: Heavy MP4 video files (up to 214 MB each) are offloaded to AWS, preventing GitHub's 100 MB file limit from blocking deployments.
- **Dynamic Configuration**: `assets/js/config.js` seamlessly switches between local assets and remote AWS CloudFront / S3 media.

---

## 🚀 Deployment Guide: GitHub Pages + AWS S3

### Step 1: Create an S3 Bucket in AWS

1. Log into your [AWS Management Console](https://console.aws.amazon.com/) and navigate to **Amazon S3**.
2. Click **Create bucket**:
   - **Bucket name**: e.g., `nextlevel-tennis-media` *(must be globally unique)*
   - **AWS Region**: `us-east-2 (US East - Ohio)` *(or your preferred region)*
   - **Block Public Access**: Uncheck *Block all public access* and check the confirmation box.
3. Click **Create bucket**.

---

### Step 2: Configure Bucket Policy & CORS

#### A. Bucket Policy (Allow Public Read)
1. In your bucket, go to the **Permissions** tab.
2. Scroll to **Bucket policy** and click **Edit**.
3. Paste the following (replace `YOUR-BUCKET-NAME` with your actual bucket name):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```
4. Click **Save changes**.

#### B. Cross-Origin Resource Sharing (CORS)
*(Crucial for streaming video with scrubbing / range requests across domains)*
1. On the same **Permissions** tab, scroll to **Cross-origin resource sharing (CORS)** and click **Edit**.
2. Paste the following configuration:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["ETag", "Content-Range", "Accept-Ranges", "Content-Length"],
    "MaxAgeSeconds": 3000
  }
]
```
3. Click **Save changes**.

---

### Step 3: Upload Media to S3

#### Method A: Using the built-in sync command (Fastest)
If you have AWS CLI credentials configured:
```bash
npm run sync:s3 <YOUR-BUCKET-NAME> us-east-2
```
Or directly with the AWS CLI:
```bash
aws s3 sync students/ s3://YOUR-BUCKET-NAME/students/
aws s3 sync assets/media/ s3://YOUR-BUCKET-NAME/assets/media/
```

#### Method B: Drag & Drop via AWS Web Console
1. In your S3 bucket, click **Upload**.
2. Upload the `students` folder and the `assets/media` folder.

---

### Step 4: Link Your S3 Bucket in `assets/js/config.js`

Open `assets/js/config.js` and set your S3 or CloudFront URL:

```javascript
window.NL_CONFIG = {
  mediaBaseUrl: "https://YOUR-BUCKET-NAME.s3.us-east-2.amazonaws.com"
  // Or CloudFront: "https://d123456abcdef.cloudfront.net"
};
```

---

### Step 5: Deploy to GitHub Pages

1. Create a new repository on GitHub (e.g. `nextlevel-tennis`).
2. In your terminal, link and push:
```bash
git remote add origin https://github.com/YOUR-USERNAME/nextlevel-tennis.git
git branch -M main
git push -u origin main
```
3. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, choose **GitHub Actions** *(the included `.github/workflows/deploy.yml` workflow will automatically deploy)*.
   - Alternatively, choose **Deploy from a branch** -> `main` -> `/ (root)` -> Save.

Your site will be live at `https://<YOUR-USERNAME>.github.io/nextlevel-tennis/`!

---

## 💻 Local Development

```bash
# Start local server:
npm run dev

# Re-extract video posters if new clips are added:
npm run media
```
Open [http://localhost:5173](http://localhost:5173).
