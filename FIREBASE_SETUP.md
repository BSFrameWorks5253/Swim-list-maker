# 🛠️ AquaFlow Pro - Complete Firebase Setup & Security Guide

Follow this simple step-by-step guide to connect your own **Firebase Project** to **AquaFlow Pro** for real production authentication and Cloud Firestore storage.

---

## 📋 Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add Project** (or *Create a Project*).
3. Enter your project name: `aquaflow-pro` (or any name you prefer).
4. (Optional) Disable or Enable Google Analytics, then click **Create Project**.

---

## 🔐 Step 2: Enable Firebase Authentication

1. In your Firebase Console sidebar, click **Authentication** (under *Build*).
2. Click **Get Started**.
3. Select **Email/Password** under *Sign-in providers*.
4. Toggle **Enable** for *Email/Password*, then click **Save**.

---

## 🗄️ Step 3: Enable Cloud Firestore Database

1. In the sidebar, click **Firestore Database**.
2. Click **Create Database**.
3. Choose your Database Location (e.g. `us-central` or `asia-south1`).
4. Select **Start in Production Mode**, then click **Create**.
5. Click on the **Rules** tab at the top of Firestore Database.
6. Replace the rules with the content from `firestore.rules`:

```rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /user_workspaces/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```
7. Click **Publish**.

---

## 🔑 Step 4: Get Your Firebase Config Keys

1. In Firebase Console, click the **⚙️ Gear Icon** next to *Project Overview* (top left) and select **Project Settings**.
2. Scroll down to **Your Apps** section and click the **`</>` Web Icon**.
3. App nickname: `AquaFlow Web`, then click **Register App**.
4. You will see a `const firebaseConfig = { ... }` block containing:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

---

## ⚙️ Step 5: Update `config.js` or `.env`

Open `config.js` in your project folder and replace the `firebase` object with your actual keys:

```javascript
window.AQUAFLOW_CONFIG = {
  firebase: {
    apiKey: "YOUR_ACTUAL_FIREBASE_API_KEY",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  }
};
```

You can also copy `.env.example` to `.env` for environment variable storage.

---

## 🔒 Security Summary Implemented

- ✅ **`.gitignore`**: Prevents accidental commits of `.env` files and local secrets.
- ✅ **`.env.example`**: Standardized environment variables template.
- ✅ **`config.js`**: Environment configuration loader.
- ✅ **`firestore.rules`**: Production user data isolation rules.
- ✅ **XSS Sanitization**: `sanitizeInput()` in `app.js` prevents script injection attacks.
- ✅ **HTTP Security Headers**: Added `X-Content-Type-Options: nosniff` and `Referrer-Policy` headers.
