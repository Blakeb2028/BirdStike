# Bird Strike Window Cleaning

Static single-page site for Bird Strike Window Cleaning (Knoxville, TN). Deploy to **GitHub Pages** — no backend required. The Web3Forms **access key** is injected at build from **`.env`** (or GitHub Secrets); it’s never committed.

## Build and deploy

### Option A: GitHub Actions (recommended)

1. Get a Web3Forms access key from [web3forms.com](https://web3forms.com) (they email it to you).
2. In your repo: **Settings → Secrets and variables → Actions → New repository secret**. Name: `WEB3FORMS_ACCESS_KEY`, value: your key.
3. **Settings → Pages → Source:** **Deploy from a branch**. Branch: **gh-pages**, folder: **/ (root)**. Save.
4. Push to `main` (or `master`). The workflow builds, injects the key, and deploys `dist/` to the `gh-pages` branch.

The site stays **static**; the key is only used during the build.

### Option B: Local build

1. Copy `.env.example` to `.env` and set `WEB3FORMS_ACCESS_KEY=your_key`.
2. Run `npm install` then `npm run build`.
3. Deploy the **`dist/`** folder to GitHub Pages (e.g. push `dist` contents to a `gh-pages` branch, or use any static host).

## Form → Email (Web3Forms)

The estimate form uses [Web3Forms](https://web3forms.com). The access key is read from **`.env`** (local) or **`WEB3FORMS_ACCESS_KEY`** (GitHub Secrets) at build time and injected into the HTML. Submissions go to the email you used when creating the key. Users are redirected to **thank-you.html** after submit.

## Project structure

```
├── index.html      # Source (placeholder __WEB3FORMS_ACCESS_KEY__)
├── thank-you.html
├── styles.css
├── script.js
├── images/
├── build.js        # Injects key, outputs dist/
├── .env.example    # Copy to .env and add your key
├── .github/workflows/deploy.yml
└── dist/           # Build output (gitignored); deploy this
```

## Replace before go-live

- **Book Now:** Add your Google Calendar appointment schedule URL where you use “Book Now” (if you add it back).
- **Privacy / Terms:** Update the modal content or replace with links to full pages if you have them.
