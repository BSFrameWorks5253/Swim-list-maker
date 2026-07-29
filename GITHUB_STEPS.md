# 🚀 How to Publish using Git & GitHub Pages (Free)

Follow these exact steps to push your project to GitHub and publish it live for free:

---

### Step 1: Open Terminal & Initialize Git
Open Terminal or PowerShell in your project folder (`d:\List maker`) and run:

```bash
git init
git add .
git commit -m "Initial commit of Attendance Sheet Studio"
```

---

### Step 2: Create a GitHub Repository
1. Log in to [GitHub](https://github.com) and go to [github.com/new](https://github.com/new).
2. Enter a **Repository name** (e.g. `attendance-sheet-studio`).
3. Ensure **Public** is selected.
4. Leave all checkboxes unchecked (*Do NOT add README, .gitignore, or license*).
5. Click **Create repository**.

---

### Step 3: Link & Push Code to GitHub
Run the following commands in your terminal:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/attendance-sheet-studio.git
git push -u origin main
```
> *(Replace `YOUR_USERNAME` with your actual GitHub username).*

---

### Step 4: Turn On GitHub Pages
1. Open your repository on GitHub.
2. Click **Settings** (top right tab).
3. Click **Pages** in the left sidebar.
4. Under **Build and deployment**:
   - Set **Source** to `Deploy from a branch`.
   - Set **Branch** to `main` and folder to `/ (root)`.
5. Click **Save**.

---

### Step 5: Access Your Live Website
Wait 1 to 2 minutes. Your website will be live at:
`https://YOUR_USERNAME.github.io/attendance-sheet-studio/`
