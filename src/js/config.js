// ==============================================================================
// AQUAFLOW PRO - ENVIRONMENT & SECURITY CONFIGURATION
// ==============================================================================

window.AQUAFLOW_CONFIG = Object.freeze({
  firebase: {
    apiKey: "AIzaSyAhcxkoI8vH2YTSxKReb3d71y_OsLleAsY",
    authDomain: "aqua-flow-15d6d.firebaseapp.com",
    projectId: "aqua-flow-15d6d",
    storageBucket: "aqua-flow-15d6d.firebasestorage.app",
    messagingSenderId: "120645459091",
    appId: "1:120645459091:web:dec339e857bd361668c166",
    measurementId: "G-9D18BX79LY",
    googleClientId: "120645459091-r4t9tb49lc0btvc7n3ck3me4hc4oblln.apps.googleusercontent.com"
  },
  security: {
    enableStrictOwnerIsolation: true,
    sanitizeInput: true,
    maxStudentNames: 100,
    sessionKeyPrefix: "aquaflow_user_data_"
  }
});
