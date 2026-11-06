# Deployment Steps (GitHub + Vercel/Netlify/GitHub Pages)

## 0. Add your song first
Copy your Happy Diwali MP3 to `public/music/happy-diwali.mp3`.

## 1. Test locally
```bash
npm install
npm run dev        # open http://localhost:5173
npm run build      # creates the dist/ folder
```

## 2. Push to GitHub
1. Create an empty repository on github.com (e.g. `diwali`), no README.
2. In the project folder run:
```bash
git init
git add .
git commit -m "Diwali website"
git branch -M main
git remote add origin https://github.com/<your-username>/diwali.git
git push -u origin main
```

## 3A. Deploy on Vercel (easiest)
1. Go to vercel.com and log in with GitHub.
2. Add New > Project > import the `diwali` repo.
3. Framework: Vite. Build command `npm run build`, output `dist`. Click Deploy.
4. Every later `git push` redeploys automatically.

## 3B. Deploy on Netlify
1. app.netlify.com > Add new site > Import from GitHub > pick the repo.
2. Build command `npm run build`, publish directory `dist`. Deploy.

## 3C. Deploy on GitHub Pages
```bash
npm install --save-dev gh-pages
```
Add to package.json scripts: `"deploy": "gh-pages -d dist"`, then:
```bash
npm run build
npm run deploy
```
In the repo: Settings > Pages > Branch `gh-pages` / root. The site opens at `https://<your-username>.github.io/diwali/`.

## 4. Final touch
Put the live link in `src/config.js` as `siteUrl`, then commit and push again:
```bash
git add . && git commit -m "Add site URL" && git push
```
