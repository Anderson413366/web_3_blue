# 🚀 How to Put Your Website Online (For Beginners)

## ✅ Option 1: Netlify (EASIEST - 2 minutes)

### Step 1: Build Your Website
In Terminal (inside the web_3_blue/web_3_blue folder):
```bash
npm run build
```

### Step 2: Go to Netlify
1. Open your web browser
2. Go to: **https://app.netlify.com/drop**
3. You'll see a big box that says "Drag and drop your site folder here"

### Step 3: Upload Your Site
1. Open Finder on your Mac
2. Go to: `Desktop/web_3_blue/web_3_blue/`
3. Find the folder called `dist`
4. Drag the `dist` folder onto the Netlify Drop website
5. Wait 10-20 seconds

### Step 4: Get Your Link! 🎉
- Netlify will show you a link like: `https://something-random-12345.netlify.app`
- Click it to see your website live!
- Share this link with anyone!

---

## ✅ Option 2: Vercel (Also Easy - 3 minutes)

### Step 1: Install Vercel
In Terminal:
```bash
npm install -g vercel
```

### Step 2: Login
In Terminal:
```bash
vercel login
```
- This will open your browser
- Click the email link they send you

### Step 3: Deploy
In Terminal (inside web_3_blue/web_3_blue):
```bash
vercel --prod
```

### Step 4: Get Your Link! 🎉
- Vercel will give you a link like: `https://yoursite.vercel.app`
- Your website is now live!

---

## 🆘 Troubleshooting

### "Command not found" error?
You need to install Node.js first:
1. Go to: https://nodejs.org
2. Download the "LTS" version
3. Install it
4. Close and reopen Terminal
5. Try again

### "Permission denied" error?
Try adding `sudo` before the command:
```bash
sudo npm install -g vercel
```
(It will ask for your Mac password)

### Website looks broken?
Make sure you:
1. Ran `npm install --legacy-peer-deps` first
2. Ran `npm run build` before uploading
3. Uploaded the `dist` folder (not the whole project)

---

## 📝 Making Changes

After you make changes to the code:

1. **Save your files**
2. **Rebuild**: `npm run build`
3. **Redeploy**: Either drag the new `dist` folder to Netlify Drop again, or run `vercel --prod` again

---

## ❓ Need More Help?

If something doesn't work, tell me:
1. What step you're on
2. What error message you see
3. Screenshot if possible

I'll help you fix it!
