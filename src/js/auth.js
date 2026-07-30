// ==============================================================================
// AQUAFLOW PRO - AUTHENTICATION SERVICE & SESSION MANAGEMENT
// ==============================================================================

class AuthService {
  static initFirebase() {
    const config = (window.AQUAFLOW_CONFIG && window.AQUAFLOW_CONFIG.firebase)
      ? window.AQUAFLOW_CONFIG.firebase
      : null;

    if (!config) return { auth: null, db: null };

    try {
      if (typeof firebase !== 'undefined' && firebase.initializeApp) {
        if (!firebase.apps.length) {
          firebase.initializeApp(config);
        }
        return {
          auth: firebase.auth(),
          db: firebase.firestore()
        };
      }
    } catch (e) {
      console.warn('Firebase Init Warning:', e.message);
    }
    return { auth: null, db: null };
  }

  static onAuthStateChanged(auth, callback) {
    if (!auth) return;
    auth.onAuthStateChanged((user) => {
      if (user) {
        const userProfile = {
          uid: user.uid,
          name: user.displayName || (user.email ? user.email.split('@')[0] : 'PRO Coach'),
          email: user.email || '',
          photoURL: user.photoURL || '',
          provider: user.providerData && user.providerData[0] ? user.providerData[0].providerId : 'password'
        };
        callback(userProfile);
      } else {
        callback(null);
      }
    });
  }

  static async signInWithEmail(auth, email, password) {
    if (!auth) throw new Error('Firebase Auth not available');
    return await auth.signInWithEmailAndPassword(email, password);
  }

  static async signUpWithEmail(auth, email, password, displayName) {
    if (!auth) throw new Error('Firebase Auth not available');
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    if (cred.user && displayName) {
      await cred.user.updateProfile({ displayName });
    }
    return cred;
  }

  static async signInWithGoogle(auth) {
    if (!auth) throw new Error('Firebase Auth not available');
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      return await auth.signInWithPopup(provider);
    } catch (err) {
      if (err.code === 'auth/popup-blocked' || err.code === 'auth/popup-closed-by-user') {
        await auth.signInWithRedirect(provider);
        return null;
      }
      throw err;
    }
  }

  static async sendMagicLink(auth, email) {
    if (!auth) throw new Error('Firebase Auth not available');
    const actionCodeSettings = {
      url: window.location.href,
      handleCodeInApp: true
    };
    await auth.sendSignInLinkToEmail(email, actionCodeSettings);
    window.localStorage.setItem('aquaflow_email_for_signin', email);
  }

  static async signOut(auth) {
    if (auth) {
      await auth.signOut();
    }
    StorageService.clearSessionCache();
  }
}

window.AuthService = AuthService;
