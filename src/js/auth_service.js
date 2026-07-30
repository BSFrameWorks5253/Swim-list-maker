// ==============================================================================
// AQUAFLOW PRO - AUTHENTICATION & USER MANAGEMENT SERVICE
// ==============================================================================

class AuthService {
  static initFirebase() {
    let auth = null;
    let db = null;
    try {
      if (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length) {
        auth = firebase.auth();
        db = firebase.firestore();
      }
    } catch (e) {
      console.warn('Firebase init note:', e.message);
    }
    return { auth, db };
  }

  static onAuthStateChanged(auth, callback) {
    if (!auth) return;
    auth.onAuthStateChanged(user => {
      if (user) {
        callback({
          uid: user.uid,
          email: user.email,
          name: user.displayName || user.email.split('@')[0],
          photoURL: user.photoURL
        });
      } else {
        callback(null);
      }
    });
  }

  static async signOut(auth) {
    if (auth) {
      try {
        await auth.signOut();
      } catch (e) {
        console.warn('Sign out note:', e);
      }
    }
    StorageService.clearSessionCache();
  }
}

window.AuthService = AuthService;
