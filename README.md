# Bird Strike Window Cleaning

Static single-page site for Bird Strike Window Cleaning (Knoxville, TN). Deploy to **GitHub Pages** — no backend required.

## Deploy to GitHub Pages

1. Create a new GitHub repo (or use this one) and push the project.
2. Go to **Settings → Pages**.
3. Under **Source**, choose **Deploy from a branch**.
4. Branch: **main** (or **master**), folder: **/ (root)**.
5. Save. The site will be at `https://<username>.github.io/<repo>/`.

Use **index.html** as the main page. The form posts to **Web3Forms**; thank-you redirect goes to **thank-you.html**.

## Form → Email (Web3Forms)

The estimate form uses [Web3Forms](https://web3forms.com). **One key, no activation** — they email you the key, you add it, done.

### Setup (one-time)

1. Go to **[web3forms.com](https://web3forms.com)** and enter the email where you want submissions.
2. Submit. They’ll email you an **access key** (long string).
3. In **index.html**, find the form and replace `YOUR_ACCESS_KEY` in the hidden `access_key` input with that key.

Submissions go to your email. Users are redirected to **thank-you.html** after submit.

## Project structure

```
├── index.html      # Main page
├── thank-you.html  # Post-form redirect
├── styles.css
├── script.js
├── images/
└── README.md
```

## Replace before go-live

- **Book Now:** Add your Google Calendar appointment schedule URL where you use “Book Now” (if you add it back).
- **Privacy / Terms:** Update the modal content or replace with links to full pages if you have them.
