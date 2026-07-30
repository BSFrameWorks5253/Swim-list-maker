// ==============================================================================
// AQUAFLOW PRO - ENVIRONMENT & SECURITY CONFIGURATION LOADER
// ==============================================================================
// Loads Firebase credentials securely with fallbacks for local and production modes.

window.AQUAFLOW_CONFIG = window.AQUAFLOW_CONFIG || {
  firebase: {
    apiKey: "AIzaSyAquaFlowProStudioAuthKey2026Demo",
    authDomain: "aquaflow-pro.firebaseapp.com",
    projectId: "aquaflow-pro",
    storageBucket: "aquaflow-pro.appspot.com",
    messagingSenderId: "84729384729",
    appId: "1:84729384729:web:a1b2c3d4e5f6g7h8"
  },
  security: {
    enableXSSSanitization: true,
    maxStudentNamesPerBatch: 50,
    sessionTimeoutMinutes: 120
  }
};
