// Security XSS Sanitization Helper
function sanitizeInput(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Load Firebase Credentials safely from window.AQUAFLOW_CONFIG or environment
const firebaseConfig = (window.AQUAFLOW_CONFIG && window.AQUAFLOW_CONFIG.firebase) ? window.AQUAFLOW_CONFIG.firebase : {
  apiKey: "AIzaSyAhcxkoI8vH2YTSxKReb3d71y_OsLleAsY",
  authDomain: "aqua-flow-15d6d.firebaseapp.com",
  projectId: "aqua-flow-15d6d",
  storageBucket: "aqua-flow-15d6d.firebasestorage.app",
  messagingSenderId: "120645459091",
  appId: "1:120645459091:web:dec339e857bd361668c166",
  measurementId: "G-9D18BX79LY"
};

// Initialize Firebase SDK
let firebaseAuth = null;
let firebaseDb = null;

try {
  if (typeof firebase !== 'undefined' && firebase.initializeApp) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    firebaseAuth = firebase.auth();
    firebaseDb = firebase.firestore();
  }
} catch (e) {
  console.info('Firebase loaded in local persistence mode', e.message);
}

// Helper: Ordinal number suffix (e.g. 1st, 2nd, 3rd, 4th, 11th, 21st)
function getOrdinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// Helper: Month Abbreviations (used for clean compact headers)
const MONTH_ABBR = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

// Default User Accounts Database
const DEFAULT_USERS = [
  {
    id: 'coach_burhan',
    name: 'Burhanuddin S.',
    username: 'coach_burhan',
    email: 'coach.burhanuddin@aquaflow.app',
    role: 'Verified PRO Coach',
    avatar: '🏊‍♂️'
  },
  {
    id: 'coach_sarah',
    name: 'Sarah Jenkins',
    username: 'coach_sarah',
    email: 'sarah@aquaflow.app',
    role: 'Senior Instructor',
    avatar: '🏊‍♀️'
  },
  {
    id: 'guest',
    name: 'Guest Coach',
    username: 'guest',
    email: 'guest@aquaflow.app',
    role: 'Free Account',
    avatar: '👤'
  }
];

// Helper: Get all dates for a given day of the week in a month
function getDatesForDayOfWeek(year, monthIndex, dayOfWeek) {
  const dates = [];
  const date = new Date(year, monthIndex, 1);
  
  // Find first occurrence of dayOfWeek
  while (date.getDay() !== dayOfWeek) {
    date.setDate(date.getDate() + 1);
  }
  
  // Collect all occurrences in the month
  while (date.getMonth() === monthIndex) {
    const dayNum = date.getDate();
    const monthAbbr = MONTH_ABBR[monthIndex];
    dates.push(`${getOrdinal(dayNum)} ${monthAbbr}`);
    date.setDate(date.getDate() + 7);
  }
  
  return dates;
}

// Toast Notification Helper
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = type === 'success' ? '✅' : 'ℹ️';
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// State Management & Main Application Controller
class AttendanceApp {
  constructor() {
    this.firebaseServices = AuthService.initFirebase();
    this.auth = this.firebaseServices.auth;
    this.db = this.firebaseServices.db;

    this.users = this.loadUsers();
    this.activeUserId = localStorage.getItem('aquaflow_active_user_id') || 'guest';
    this.currentUser = this.users.find(u => u.id === this.activeUserId) || this.users[2];

    this.presets = StorageService.getEmptyPresets();
    this.state = StorageService.getEmptyState();
    this.activePresetId = 'girls-batch-4';
    this.zoomScale = 1.0;
    this.searchQuery = '';
    this.currentTheme = localStorage.getItem('app_theme') || 'light';

    this.initElements();
    this.applyTheme(this.currentTheme);
    this.updateUserHeaderUI();
    this.updateControlsFromState();
    this.bindEvents();
    this.renderPresets();
    this.updateApp();
    this.autoFitOnePage(false);
    this.autoScaleMobilePreview();
    this.handleEmailLinkAuth();
    this.handleGoogleRedirectResult();
    this.initFirebaseAuthObserver();
  }

  dismissSplash() {
    setTimeout(() => {
      const loader = document.getElementById('loading-overlay');
      if (loader) loader.classList.add('fade-out');
    }, 300);
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app_theme', theme);

    if (this.themeToggleIcon && this.themeToggleLabel) {
      if (theme === 'dark') {
        this.themeToggleIcon.textContent = '🌙';
        this.themeToggleLabel.textContent = 'Dark';
      } else {
        this.themeToggleIcon.textContent = '☀️';
        this.themeToggleLabel.textContent = 'Light';
      }
    }
  }

  toggleTheme() {
    const nextTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(nextTheme);
    showToast(`Switched to ${nextTheme.toUpperCase()} mode`, 'info');
  }

  loadUsers() {
    try {
      const stored = localStorage.getItem('aquaflow_users_db');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Could not load users database', e);
    }
    return [...DEFAULT_USERS];
  }

  saveUsers() {
    try {
      localStorage.setItem('aquaflow_users_db', JSON.stringify(this.users));
    } catch (e) {
      console.warn('Could not save users database', e);
    }
  }

  loadActiveState() {
    try {
      const key = `aquaflow_state_user_${this.activeUserId}`;
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not load active state from localStorage', e);
    }
    return null;
  }

  saveActiveState() {
    StorageService.saveUserWorkspace(this.activeUserId, this.state, this.presets, this.db, this.auth);
    this.triggerCloudSync();
  }

  saveStoredPresets() {
    StorageService.saveUserWorkspace(this.activeUserId, this.state, this.presets, this.db, this.auth);
    this.triggerCloudSync();
  }

  initFirebaseAuthObserver() {
    if (this.auth) {
      AuthService.onAuthStateChanged(this.auth, async (userProfile) => {
        if (userProfile) {
          const userId = userProfile.uid;
          const userObj = {
            id: userId,
            name: userProfile.name,
            username: userProfile.email ? userProfile.email.split('@')[0] : userId,
            email: userProfile.email,
            role: 'Firebase Verified Coach',
            avatar: userProfile.photoURL ? '🌐' : '🔥'
          };

          if (!this.users.find(u => u.id === userId)) {
            this.users.push(userObj);
            this.saveUsers();
          }

          this.activeUserId = userId;
          this.currentUser = userObj;
          localStorage.setItem('aquaflow_active_user_id', userId);

          // Strictly load User A's data ONLY for User A
          const workspace = await StorageService.loadUserWorkspace(userId, this.db);
          this.state = workspace.state;
          this.presets = workspace.presets;

          this.updateUserHeaderUI();
          this.updateControlsFromState();
          this.renderPresets();
          this.updateApp();
          this.autoFitOnePage(false);
          if (this.authModal) this.authModal.classList.remove('active');
        } else {
          // Mandatory login popup on first visit
          setTimeout(() => {
            if (this.authModal && (!this.activeUserId || this.activeUserId === 'guest')) {
              this.authModal.classList.add('active');
            }
          }, 500);
        }
      });
    } else {
      setTimeout(() => {
        if (this.authModal && (!this.activeUserId || this.activeUserId === 'guest')) {
          this.authModal.classList.add('active');
        }
      }, 500);
    }
  }

  triggerCloudSync() {
    const dot = document.querySelector('.sync-dot');
    if (dot) {
      dot.style.transform = 'scale(1.5)';
      dot.style.backgroundColor = '#38bdf8';
      setTimeout(() => {
        dot.style.transform = 'scale(1)';
        dot.style.backgroundColor = 'var(--accent-emerald)';
      }, 450);
    }
  }

  async switchUser(userId) {
    const found = this.users.find(u => u.id === userId);
    if (!found) return;

    this.activeUserId = userId;
    this.currentUser = found;
    localStorage.setItem('aquaflow_active_user_id', userId);

    // Strictly wipe state in memory before loading user's data
    this.state = StorageService.getEmptyState();
    this.presets = StorageService.getEmptyPresets();

    const workspace = await StorageService.loadUserWorkspace(userId, this.db);
    this.state = workspace.state;
    this.presets = workspace.presets;

    this.updateUserHeaderUI();
    this.updateControlsFromState();
    this.renderPresets();
    this.updateApp();
    this.autoFitOnePage(false);
    showToast(`Switched workspace to ${found.name}`, 'success');
  }

  updateUserHeaderUI() {
    const avatarEl = document.getElementById('header-user-avatar');
    const nameEl = document.getElementById('header-user-name');
    if (avatarEl && this.currentUser) avatarEl.textContent = this.currentUser.avatar || '🏊‍♂️';
    if (nameEl && this.currentUser) nameEl.textContent = this.currentUser.name || 'User';

    // Update Modal User Section
    const modalAvatar = document.getElementById('modal-user-avatar');
    const modalName = document.getElementById('modal-user-name');
    const modalEmail = document.getElementById('modal-user-email');
    const modalBatches = document.getElementById('modal-stat-batches');
    const modalStudents = document.getElementById('modal-stat-students');

    if (modalAvatar) modalAvatar.textContent = this.currentUser.avatar || '🏊‍♂️';
    if (modalName) modalName.textContent = this.currentUser.name;
    if (modalEmail) modalEmail.textContent = this.currentUser.email || '';
    if (modalBatches) modalBatches.textContent = this.presets.length;
    if (modalStudents) modalStudents.textContent = this.state.names ? this.state.names.length : 0;
  }

  initElements() {
    // Inputs
    this.titleInput = document.getElementById('input-title');
    this.subtitleInput = document.getElementById('input-subtitle');
    this.batchInput = document.getElementById('input-batch');
    this.categoryTabs = document.querySelectorAll('.tab-btn');
    this.monthSelect = document.getElementById('select-month');
    this.yearInput = document.getElementById('input-year');
    this.dayOfWeekSelect = document.getElementById('select-day');
    this.extraRowsInput = document.getElementById('input-extra-rows');
    this.excludeDatesInput = document.getElementById('input-exclude-dates');
    this.rowHeightInput = document.getElementById('input-row-height');
    this.rowHeightValue = document.getElementById('row-height-value');
    this.presetHeightBtns = document.querySelectorAll('.preset-height-btn');
    this.btnAutoFitPage = document.getElementById('btn-autofit-page');
    this.newStudentInput = document.getElementById('input-new-student');
    this.bulkNamesTextarea = document.getElementById('textarea-bulk-names');
    this.searchNamesInput = document.getElementById('input-search-names');

    // Theme Switcher Elements
    this.btnThemeToggle = document.getElementById('btn-theme-toggle');
    this.themeToggleIcon = document.getElementById('theme-toggle-icon');
    this.themeToggleLabel = document.getElementById('theme-toggle-label');

    // Stats Elements
    this.statStudentsCount = document.getElementById('stat-students-count');
    this.statDatesCount = document.getElementById('stat-dates-count');
    this.statRowsCount = document.getElementById('stat-rows-count');

    // Zoom Controls
    this.btnZoomIn = document.getElementById('btn-zoom-in');
    this.btnZoomOut = document.getElementById('btn-zoom-out');
    this.btnZoomReset = document.getElementById('btn-zoom-reset');
    this.zoomLevelBadge = document.getElementById('zoom-level-badge');

    // Action Buttons
    this.btnAddStudent = document.getElementById('btn-add-student');
    this.btnBulkAdd = document.getElementById('btn-bulk-add');
    this.btnSortNames = document.getElementById('btn-sort-names');
    this.btnClearNames = document.getElementById('btn-clear-names');
    this.btnSavePreset = document.getElementById('btn-save-preset');
    this.btnExportJSON = document.getElementById('btn-export-json');
    this.btnImportJSON = document.getElementById('btn-import-json');
    this.fileImportInput = document.getElementById('file-import-json');
    this.btnExportPDF = document.getElementById('btn-export-pdf');
    this.btnExportExcel = document.getElementById('btn-export-excel');
    this.btnPrintWindow = document.getElementById('btn-print-window');
    this.btnExportCSV = document.getElementById('btn-export-csv');

    // UI Containers
    this.presetListEl = document.getElementById('preset-list');
    this.studentTagsEl = document.getElementById('student-tags');

    // PDF Elements
    this.pdfDoc = document.getElementById('pdf-document');
    this.docTitle = document.getElementById('doc-title');
    this.docSubtitle = document.getElementById('doc-subtitle');
    this.docBatch = document.getElementById('doc-batch');
    this.docTableHeader = document.getElementById('doc-table-header');
    this.docTableBody = document.getElementById('doc-table-body');

    // Mobile Elements
    this.mainContainer = document.getElementById('main-container');
    this.btnMobileViewEdit = document.getElementById('btn-mobile-view-edit');
    this.btnMobileViewPreview = document.getElementById('btn-mobile-view-preview');
    this.btnMobileExportPDF = document.getElementById('btn-mobile-export-pdf');
    this.btnMobileExportExcel = document.getElementById('btn-mobile-export-excel');
    this.btnMobileToggleView = document.getElementById('btn-mobile-toggle-view');

    // Auth & Modal Elements
    this.btnUserProfile = document.getElementById('btn-user-profile');
    this.authModal = document.getElementById('auth-modal');
    this.btnCloseAuthModal = document.getElementById('btn-close-auth-modal');
    this.tabBtnSignin = document.getElementById('tab-btn-signin');
    this.tabBtnRegister = document.getElementById('tab-btn-register');
    this.formSigninContainer = document.getElementById('form-signin-container');
    this.formRegisterContainer = document.getElementById('form-register-container');
    this.formSignin = document.getElementById('form-signin');
    this.formRegister = document.getElementById('form-register');
    this.btnLogout = document.getElementById('btn-logout');
    this.demoUserBtns = document.querySelectorAll('.btn-demo-user');
    this.btnGoogleSignin = document.getElementById('btn-google-signin');
    this.btnMagicLink = document.getElementById('btn-magic-link');
    this.previewLockOverlay = document.getElementById('preview-lock-overlay');
    this.btnLockSignin = document.getElementById('btn-lock-signin');
  }

  handleEmailLinkAuth() {
    if (typeof firebase !== 'undefined' && firebase.auth) {
      if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
        let email = window.localStorage.getItem('aquaflow_email_for_signin');
        if (!email) {
          email = window.prompt('Please confirm your email address for passwordless sign in:');
        }
        if (email) {
          firebase.auth().signInWithEmailLink(email, window.location.href)
            .then((result) => {
              window.localStorage.removeItem('aquaflow_email_for_signin');
              const fbUser = result.user;
              const userId = fbUser.uid;
              const found = {
                id: userId,
                name: fbUser.displayName || email.split('@')[0],
                username: email.split('@')[0],
                email: email,
                role: 'Magic Link Verified Coach',
                avatar: '✉️'
              };
              if (!this.users.find(u => u.id === userId)) {
                this.users.push(found);
                this.saveUsers();
              }
              this.switchUser(userId);
              showToast(`🎉 Passwordless login successful for ${email}!`, 'success');
            })
            .catch((err) => {
              console.error('Email Link Login Error', err);
              showToast('Magic Link Sign In error: ' + err.message, 'error');
            });
        }
      }
    }
  }

  handleGoogleRedirectResult() {
    if (typeof firebase !== 'undefined' && firebase.auth) {
      firebase.auth().getRedirectResult()
        .then((result) => {
          if (result && result.user) {
            const fbUser = result.user;
            const userId = fbUser.uid;
            const found = {
              id: userId,
              name: fbUser.displayName || 'Google User',
              username: fbUser.email ? fbUser.email.split('@')[0] : 'google_user',
              email: fbUser.email || '',
              role: 'Google Verified Coach',
              avatar: '🌐'
            };
            if (!this.users.find(u => u.id === userId)) {
              this.users.push(found);
              this.saveUsers();
            }
            this.switchUser(userId);
            showToast(`🌐 Logged in with Google as ${found.name}!`, 'success');
          }
        })
        .catch((err) => {
          if (err.code !== 'auth/null-user') {
            console.warn('Google Redirect Auth:', err.message);
          }
        });
    }
  }

  bindEvents() {
    // Google Sign-In Event Handler (With Mobile Redirect Fallback)
    if (this.btnGoogleSignin) {
      this.btnGoogleSignin.addEventListener('click', async () => {
        if (typeof firebase !== 'undefined' && firebase.auth) {
          try {
            const provider = new firebase.auth.GoogleAuthProvider();
            provider.setCustomParameters({ prompt: 'select_account' });

            let result;
            try {
              result = await firebase.auth().signInWithPopup(provider);
            } catch (popErr) {
              if (popErr.code === 'auth/popup-blocked' || popErr.code === 'auth/popup-closed-by-user') {
                showToast('Opening Google Sign-In redirect...', 'info');
                await firebase.auth().signInWithRedirect(provider);
                return;
              }
              throw popErr;
            }

            if (result && result.user) {
              const fbUser = result.user;
              const userId = fbUser.uid;
              const found = {
                id: userId,
                name: fbUser.displayName || 'Google User',
                username: fbUser.email ? fbUser.email.split('@')[0] : 'google_user',
                email: fbUser.email || '',
                role: 'Google Verified Coach',
                avatar: '🌐'
              };
              if (!this.users.find(u => u.id === userId)) {
                this.users.push(found);
                this.saveUsers();
              }
              this.switchUser(userId);
              if (this.authModal) this.authModal.classList.remove('active');
              showToast(`🌐 Logged in with Google as ${found.name}!`, 'success');
            }
          } catch (err) {
            console.error('Google Sign In Error:', err);
            showToast('Google Sign In: ' + err.message, 'error');
          }
        } else {
          showToast('Firebase Auth SDK initializing...', 'info');
        }
      });
    }

    // Passwordless Email Magic Link Event Handler
    if (this.btnMagicLink) {
      this.btnMagicLink.addEventListener('click', async () => {
        const emailVal = document.getElementById('input-login-username').value.trim();
        if (!emailVal || !emailVal.includes('@')) {
          showToast('Please enter a valid email address for Magic Link', 'warning');
          return;
        }

        if (typeof firebase !== 'undefined' && firebase.auth) {
          try {
            const actionCodeSettings = {
              url: window.location.href,
              handleCodeInApp: true
            };
            await firebase.auth().sendSignInLinkToEmail(emailVal, actionCodeSettings);
            window.localStorage.setItem('aquaflow_email_for_signin', emailVal);
            showToast(`✉️ Passwordless Magic Link sent to ${emailVal}! Check your inbox.`, 'success');
          } catch (err) {
            console.error('Magic Link Error:', err);
            showToast('Magic Link error: ' + err.message, 'error');
          }
        }
      });
    }

    // User Profile & Auth Modal
    if (this.btnUserProfile && this.authModal) {
      this.btnUserProfile.addEventListener('click', () => {
        this.updateUserHeaderUI();
        this.authModal.classList.add('active');
      });
    }

    if (this.btnCloseAuthModal && this.authModal) {
      this.btnCloseAuthModal.addEventListener('click', () => {
        this.authModal.classList.remove('active');
      });
      this.authModal.addEventListener('click', (e) => {
        if (e.target === this.authModal) this.authModal.classList.remove('active');
      });
    }

    // Modal Auth Tab switching
    if (this.tabBtnSignin && this.tabBtnRegister) {
      this.tabBtnSignin.addEventListener('click', () => {
        this.tabBtnSignin.classList.add('active');
        this.tabBtnRegister.classList.remove('active');
        this.formSigninContainer.style.display = 'block';
        this.formRegisterContainer.style.display = 'none';
      });

      this.tabBtnRegister.addEventListener('click', () => {
        this.tabBtnRegister.classList.add('active');
        this.tabBtnSignin.classList.remove('active');
        this.formRegisterContainer.style.display = 'block';
        this.formSigninContainer.style.display = 'none';
      });
    }

    // Demo user quick switch
    if (this.demoUserBtns) {
      this.demoUserBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const userId = btn.dataset.user;
          this.switchUser(userId);
          if (this.authModal) this.authModal.classList.remove('active');
        });
      });
    }

    // Sign In Form Submission (With Firebase Auth support)
    if (this.formSignin) {
      this.formSignin.addEventListener('submit', async (e) => {
        e.preventDefault();
        const usernameVal = document.getElementById('input-login-username').value.trim().toLowerCase();
        const passwordVal = document.getElementById('input-login-password') ? document.getElementById('input-login-password').value : '';

        // Try Firebase Auth if email format provided
        if (typeof firebase !== 'undefined' && firebase.auth && usernameVal.includes('@')) {
          try {
            const userCred = await firebase.auth().signInWithEmailAndPassword(usernameVal, passwordVal);
            if (userCred && userCred.user) {
              const fbUser = userCred.user;
              const userId = fbUser.uid;
              const found = {
                id: userId,
                name: fbUser.displayName || fbUser.email.split('@')[0],
                username: fbUser.email.split('@')[0],
                email: fbUser.email,
                role: 'Firebase Verified Coach',
                avatar: '🔥'
              };
              if (!this.users.find(u => u.id === userId)) {
                this.users.push(found);
                this.saveUsers();
              }
              this.switchUser(userId);
              if (this.authModal) this.authModal.classList.remove('active');
              showToast(`🔥 Logged in as ${found.name}`, 'success');
              return;
            }
          } catch (fbErr) {
            console.info('Firebase auth fallback to local session', fbErr.message);
          }
        }

        // Local Auth Fallback
        const found = this.users.find(u => u.username.toLowerCase() === usernameVal || u.email.toLowerCase() === usernameVal || u.id.toLowerCase() === usernameVal);
        if (found) {
          this.switchUser(found.id);
          if (this.authModal) this.authModal.classList.remove('active');
        } else {
          const newId = 'user_' + usernameVal.replace(/[^a-z0-9_]/g, '');
          const newUser = {
            id: newId,
            name: usernameVal.charAt(0).toUpperCase() + usernameVal.slice(1),
            username: usernameVal,
            email: usernameVal.includes('@') ? usernameVal : `${usernameVal}@aquaflow.app`,
            role: 'PRO Coach',
            avatar: '🏊‍♂️'
          };
          this.users.push(newUser);
          this.saveUsers();
          this.switchUser(newId);
          if (this.authModal) this.authModal.classList.remove('active');
        }
      });
    }

    // Register Form Submission (With Firebase Auth support)
    if (this.formRegister) {
      this.formRegister.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nameVal = document.getElementById('input-reg-name').value.trim();
        const usernameVal = document.getElementById('input-reg-username').value.trim().toLowerCase();
        const emailVal = document.getElementById('input-reg-email').value.trim();
        const passwordVal = document.getElementById('input-reg-password') ? document.getElementById('input-reg-password').value : '';

        if (!nameVal || !usernameVal) return;

        // Try Firebase Auth Registration if email & password provided
        if (typeof firebase !== 'undefined' && firebase.auth && emailVal && passwordVal.length >= 6) {
          try {
            const userCred = await firebase.auth().createUserWithEmailAndPassword(emailVal, passwordVal);
            if (userCred && userCred.user) {
              await userCred.user.updateProfile({ displayName: nameVal });
              const userId = userCred.user.uid;
              const newUser = {
                id: userId,
                name: nameVal,
                username: usernameVal,
                email: emailVal,
                role: 'Firebase Verified Coach',
                avatar: '🔥'
              };
              this.users.push(newUser);
              this.saveUsers();
              this.switchUser(userId);
              if (this.authModal) this.authModal.classList.remove('active');
              showToast(`🔥 Firebase account created for ${nameVal}!`, 'success');
              return;
            }
          } catch (fbErr) {
            console.info('Firebase registration fallback to local workspace', fbErr.message);
          }
        }

        // Local Workspace Registration Fallback
        const newId = 'user_' + usernameVal.replace(/[^a-z0-9_]/g, '');
        const newUser = {
          id: newId,
          name: nameVal,
          username: usernameVal,
          email: emailVal || `${usernameVal}@aquaflow.app`,
          role: 'Verified PRO Coach',
          avatar: '🏊‍♂️'
        };

        this.users.push(newUser);
        this.saveUsers();
        this.switchUser(newId);
        if (this.authModal) this.authModal.classList.remove('active');
        showToast(`Account created for ${nameVal}!`, 'success');
      });
    }

    // Logout
    if (this.btnLogout) {
      this.btnLogout.addEventListener('click', async () => {
        await AuthService.signOut(this.auth);
        this.activeUserId = 'guest';
        this.currentUser = { name: 'Guest Coach', avatar: '👤' };
        this.state = StorageService.getEmptyState();
        this.presets = StorageService.getEmptyPresets();
        this.updateUserHeaderUI();
        this.updateControlsFromState();
        this.renderPresets();
        this.updateApp();
        if (this.authModal) this.authModal.classList.add('active');
        showToast('Logged out. Workspace wiped cleanly.', 'info');
      });
    }

    // Mobile View Switching Tabs & Actions
    if (this.btnMobileViewEdit && this.btnMobileViewPreview) {
      this.btnMobileViewEdit.addEventListener('click', () => this.setMobileMode('edit'));
      this.btnMobileViewPreview.addEventListener('click', () => this.setMobileMode('preview'));
    }

    if (this.btnMobileExportPDF) {
      this.btnMobileExportPDF.addEventListener('click', () => this.exportVectorPDF());
    }

    if (this.btnMobileExportExcel) {
      this.btnMobileExportExcel.addEventListener('click', () => this.exportExcel());
    }

    if (this.btnMobileToggleView) {
      this.btnMobileToggleView.addEventListener('click', () => {
        const isEditMode = this.mainContainer && this.mainContainer.classList.contains('mobile-mode-edit');
        this.setMobileMode(isEditMode ? 'preview' : 'edit');
      });
    }

    window.addEventListener('resize', () => this.autoScaleMobilePreview());

    // Theme Switcher
    if (this.btnThemeToggle) {
      this.btnThemeToggle.addEventListener('click', () => this.toggleTheme());
    }

    // Header inputs - Auto-save on change
    this.titleInput.addEventListener('input', (e) => {
      this.state.title = e.target.value;
      this.saveActiveState();
      this.renderPreview();
    });
    this.subtitleInput.addEventListener('input', (e) => {
      this.state.subtitle = e.target.value;
      this.saveActiveState();
      this.renderPreview();
    });
    this.batchInput.addEventListener('input', (e) => {
      this.state.batchName = e.target.value;
      this.saveActiveState();
      this.renderPreview();
    });

    // Date controls - Auto-save on change
    this.monthSelect.addEventListener('change', (e) => {
      this.state.month = parseInt(e.target.value, 10);
      this.saveActiveState();
      this.renderPreview();
      this.updateStats();
    });
    this.yearInput.addEventListener('change', (e) => {
      this.state.year = parseInt(e.target.value, 10);
      this.saveActiveState();
      this.renderPreview();
      this.updateStats();
    });
    this.dayOfWeekSelect.addEventListener('change', (e) => {
      this.state.dayOfWeek = parseInt(e.target.value, 10);
      this.saveActiveState();
      this.renderPreview();
      this.updateStats();
    });
    this.extraRowsInput.addEventListener('change', (e) => {
      this.state.extraRows = Math.max(0, parseInt(e.target.value, 10) || 0);
      this.saveActiveState();
      this.renderPreview();
      this.updateStats();
      this.autoFitOnePage(false);
    });

    // Row Height / Cell Spacing Slider
    if (this.rowHeightInput) {
      this.rowHeightInput.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10) || 52;
        this.state.rowHeight = val;
        if (this.rowHeightValue) this.rowHeightValue.textContent = `${val}px`;
        document.documentElement.style.setProperty('--cell-row-height', `${val}px`);
        this.saveActiveState();
        this.renderPreview();
      });
    }

    // Quick Height Presets
    if (this.presetHeightBtns) {
      this.presetHeightBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const h = parseInt(btn.dataset.height, 10) || 52;
          this.state.rowHeight = h;
          if (this.rowHeightInput) this.rowHeightInput.value = h;
          if (this.rowHeightValue) this.rowHeightValue.textContent = `${h}px`;
          document.documentElement.style.setProperty('--cell-row-height', `${h}px`);
          this.saveActiveState();
          this.renderPreview();
          showToast(`Row height set to ${h}px`, 'info');
        });
      });
    }

    // Auto-Fit All Names to 1 Page Button
    if (this.btnAutoFitPage) {
      this.btnAutoFitPage.addEventListener('click', () => this.autoFitOnePage(true));
    }

    // Category Tabs (Girls / Boys / Custom)
    this.categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const cat = tab.dataset.category;
        this.categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.state.category = cat;

        if (cat === 'Girls') {
          const match = this.presets.find(p => p.id === 'girls-batch-4' || p.category === 'Girls') || SAMPLE_PRESETS[0];
          this.activePresetId = match ? match.id : 'girls-batch-4';
          this.state.batchName = match ? (match.batchName || match.name) : 'Girls Batch 4';
          this.state.names = match && match.names && match.names.length > 0 ? [...match.names] : [...SAMPLE_PRESETS[0].names];
        } else if (cat === 'Boys') {
          const match = this.presets.find(p => p.id === 'boys-batch-4' || p.category === 'Boys') || SAMPLE_PRESETS[1];
          this.activePresetId = match ? match.id : 'boys-batch-4';
          this.state.batchName = match ? (match.batchName || match.name) : 'Boys Batch 4';
          this.state.names = match && match.names && match.names.length > 0 ? [...match.names] : [...SAMPLE_PRESETS[1].names];
        } else if (cat === 'Custom') {
          this.state.batchName = 'Custom Batch';
        }

        this.updateControlsFromState();
        this.updateApp();
        this.autoFitOnePage(false);
        showToast(`Switched to ${this.state.batchName}`, 'info');
      });
    });

    // Add Single Student
    const addStudent = () => {
      const name = this.newStudentInput.value.trim();
      if (name) {
        this.state.names.push(name);
        this.newStudentInput.value = '';
        this.updateApp();
        this.autoFitOnePage(false);
        showToast(`Added "${name}" to the list`, 'success');
      }
    };
    this.btnAddStudent.addEventListener('click', addStudent);
    this.newStudentInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addStudent();
    });

    // Bulk Add Students
    this.btnBulkAdd.addEventListener('click', () => {
      const rawText = this.bulkNamesTextarea.value;
      if (!rawText.trim()) return;
      const parsed = rawText.split(/\r?\n|,/).map(s => s.trim()).filter(s => s.length > 0);
      if (parsed.length > 0) {
        this.state.names = [...this.state.names, ...parsed];
        this.bulkNamesTextarea.value = '';
        this.updateApp();
        this.autoFitOnePage(false);
        showToast(`Added ${parsed.length} student names!`, 'success');
      }
    });

    // Search filter input
    this.searchNamesInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      this.renderStudentTags();
    });

    // Sort Names A-Z
    this.btnSortNames.addEventListener('click', () => {
      this.state.names.sort((a, b) => a.localeCompare(b));
      this.updateApp();
      showToast('Sorted student names alphabetically (A-Z)', 'info');
    });

    // Clear All Names
    this.btnClearNames.addEventListener('click', () => {
      if (this.state.names.length === 0) return;
      if (confirm('Are you sure you want to clear all student names?')) {
        this.state.names = [];
        this.updateApp();
        showToast('Cleared all student names', 'info');
      }
    });

    // Save Preset
    this.btnSavePreset.addEventListener('click', () => {
      const presetName = prompt('Enter a name for this preset:', `${this.state.batchName} Preset`);
      if (!presetName) return;

      const newId = 'preset-' + Date.now();
      const preset = {
        id: newId,
        name: presetName,
        category: this.state.category,
        title: this.state.title,
        subtitle: this.state.subtitle,
        batchName: this.state.batchName,
        month: this.state.month,
        year: this.state.year,
        dayOfWeek: this.state.dayOfWeek,
        extraRows: this.state.extraRows,
        names: [...this.state.names]
      };

      this.presets.push(preset);
      this.activePresetId = newId;
      this.saveStoredPresets();
      this.renderPresets();
      showToast(`Preset "${presetName}" saved!`, 'success');
    });

    // Export/Import JSON Presets
    this.btnExportJSON.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.presets, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "attendance_presets.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('Presets exported to JSON file', 'success');
    });

    this.btnImportJSON.addEventListener('click', () => {
      this.fileImportInput.click();
    });

    this.fileImportInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const imported = JSON.parse(evt.target.result);
          if (Array.isArray(imported)) {
            this.presets = imported;
            this.saveStoredPresets();
            this.renderPresets();
            showToast('Presets restored successfully!', 'success');
          }
        } catch (err) {
          alert('Invalid JSON file format.');
        }
      };
      reader.readAsText(file);
    });

    // Zoom Controls
    this.btnZoomIn.addEventListener('click', () => {
      this.zoomScale = Math.min(1.5, this.zoomScale + 0.1);
      this.applyZoom();
    });
    this.btnZoomOut.addEventListener('click', () => {
      this.zoomScale = Math.max(0.6, this.zoomScale - 0.1);
      this.applyZoom();
    });
    this.btnZoomReset.addEventListener('click', () => {
      this.zoomScale = 1.0;
      this.applyZoom();
    });

    // Exclude dates input
    if (this.excludeDatesInput) {
      this.excludeDatesInput.addEventListener('input', (e) => {
        this.state.excludedDates = e.target.value;
        this.saveActiveState();
        this.renderPreview();
        this.updateStats();
      });
    }

    // Export Actions
    this.btnExportPDF.addEventListener('click', () => this.exportVectorPDF());
    if (this.btnExportExcel) {
      this.btnExportExcel.addEventListener('click', () => this.exportExcel());
    }
    this.btnPrintWindow.addEventListener('click', () => window.print());
    this.btnExportCSV.addEventListener('click', () => this.exportCSV());
  }

  applyZoom() {
    const rounded = Math.round(this.zoomScale * 100);
    this.zoomLevelBadge.textContent = `${rounded}%`;
    this.pdfDoc.style.transform = `scale(${this.zoomScale})`;
  }

  setMobileMode(mode) {
    if (!this.mainContainer) return;
    if (mode === 'preview') {
      this.mainContainer.classList.remove('mobile-mode-edit');
      this.mainContainer.classList.add('mobile-mode-preview');
      if (this.btnMobileViewEdit) this.btnMobileViewEdit.classList.remove('active');
      if (this.btnMobileViewPreview) this.btnMobileViewPreview.classList.add('active');
      if (this.btnMobileToggleView) this.btnMobileToggleView.innerHTML = '⚙️ Edit Settings';
      this.autoScaleMobilePreview();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.mainContainer.classList.remove('mobile-mode-preview');
      this.mainContainer.classList.add('mobile-mode-edit');
      if (this.btnMobileViewEdit) this.btnMobileViewEdit.classList.add('active');
      if (this.btnMobileViewPreview) this.btnMobileViewPreview.classList.remove('active');
      if (this.btnMobileToggleView) this.btnMobileToggleView.innerHTML = '👁️ Sheet Preview';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  autoScaleMobilePreview() {
    if (window.innerWidth <= 768) {
      const wrapper = document.querySelector('.paper-wrapper');
      if (wrapper) {
        const padding = 16;
        const availableWidth = Math.max(280, (wrapper.clientWidth || window.innerWidth) - padding);
        const docWidth = 794; // ~210mm in px
        const targetScale = Math.min(1.0, Math.max(0.35, availableWidth / docWidth));
        this.zoomScale = parseFloat(targetScale.toFixed(2));
        this.applyZoom();
      }
    }
  }

  getCurrentDates() {
    if (this.state.useCustomDates && this.state.customDates.length > 0) {
      return this.state.customDates;
    }
    return getDatesForDayOfWeek(this.state.year, this.state.month, this.state.dayOfWeek);
  }

  loadPreset(id) {
    const preset = this.presets.find(p => p.id === id);
    if (!preset) return;

    this.activePresetId = id;
    this.state.title = preset.title || 'Swimming attendance';
    this.state.subtitle = preset.subtitle || '';
    this.state.batchName = preset.batchName || preset.name;
    this.state.category = preset.category || 'Girls';
    this.state.month = preset.month !== undefined ? preset.month : 6;
    this.state.year = preset.year || 2026;
    this.state.dayOfWeek = preset.dayOfWeek !== undefined ? preset.dayOfWeek : 6;
    this.state.extraRows = preset.extraRows !== undefined ? preset.extraRows : 4;
    this.state.names = [...preset.names];

    this.updateControlsFromState();
    this.updateApp();
    this.autoFitOnePage(false);
    showToast(`Loaded "${preset.name}"`, 'info');
  }

  deletePreset(id, e) {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this preset?')) return;
    this.presets = this.presets.filter(p => p.id !== id);
    this.saveStoredPresets();
    this.renderPresets();
    showToast('Preset deleted', 'info');
  }

  updateControlsFromState() {
    this.titleInput.value = this.state.title;
    this.subtitleInput.value = this.state.subtitle;
    this.batchInput.value = this.state.batchName;
    this.monthSelect.value = this.state.month;
    this.yearInput.value = this.state.year;
    this.dayOfWeekSelect.value = this.state.dayOfWeek;
    this.extraRowsInput.value = this.state.extraRows;
    if (this.excludeDatesInput) this.excludeDatesInput.value = this.state.excludedDates || '';

    const currentHeight = this.state.rowHeight || 48;
    if (this.rowHeightInput) this.rowHeightInput.value = currentHeight;
    if (this.rowHeightValue) this.rowHeightValue.textContent = `${currentHeight}px`;
    document.documentElement.style.setProperty('--cell-row-height', `${currentHeight}px`);

    this.categoryTabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.category.toLowerCase() === this.state.category.toLowerCase());
    });
  }

  renderPresets() {
    this.presetListEl.innerHTML = '';
    this.presets.forEach(p => {
      const item = document.createElement('div');
      item.className = `preset-item ${p.id === this.activePresetId ? 'active' : ''}`;
      
      const badgeClass = p.category === 'Girls' ? 'badge-girls' : 'badge-boys';

      item.innerHTML = `
        <div class="preset-info">
          <div class="preset-name">${p.name}</div>
          <div class="preset-meta"><span class="badge ${badgeClass}">${p.category}</span> • ${p.names.length} Students</div>
        </div>
        <button class="icon-btn btn-delete-preset" title="Delete Preset">✕</button>
      `;

      item.addEventListener('click', () => this.loadPreset(p.id));
      item.querySelector('.btn-delete-preset').addEventListener('click', (e) => this.deletePreset(p.id, e));

      this.presetListEl.appendChild(item);
    });
  }

  renderStudentTags() {
    this.studentTagsEl.innerHTML = '';

    if (!this.activeUserId || this.activeUserId === 'guest') {
      this.studentTagsEl.innerHTML = `
        <div style="padding: 20px; text-align: center; color: var(--text-muted); background: var(--bg-input); border-radius: var(--radius-md);">
          <p style="font-size: 1.4rem; margin-bottom: 6px;">🔐</p>
          <p style="font-weight: 700; font-size: 0.85rem; margin-bottom: 4px; color: var(--text-main);">Sign In Required</p>
          <p style="font-size: 0.76rem;">Please log in to manage your students and access your cloud workspace.</p>
        </div>
      `;
      return;
    }

    if (this.state.names.length === 0) {
      this.studentTagsEl.innerHTML = `
        <div style="padding: 18px; text-align: center; color: var(--text-muted); border: 1px dashed var(--border-subtle); border-radius: var(--radius-md);">
          <p style="font-weight: 600; font-size: 0.82rem; margin-bottom: 2px; color: var(--text-main);">✨ Clean Empty Workspace</p>
          <p style="font-size: 0.76rem;">Add your students using the input box above or paste a list of names.</p>
        </div>
      `;
      return;
    }

    const query = this.searchQuery;
    this.state.names.forEach((name, index) => {
      if (query && !name.toLowerCase().includes(query)) {
        return;
      }

      const tag = document.createElement('div');
      tag.className = 'student-tag';

      tag.innerHTML = `
        <input type="text" value="${name}" data-index="${index}">
        <div class="tag-actions">
          <button class="icon-btn move-btn btn-move-up" data-index="${index}" title="Move Up">▲</button>
          <button class="icon-btn move-btn btn-move-down" data-index="${index}" title="Move Down">▼</button>
          <button class="icon-btn btn-remove-name" data-index="${index}" title="Remove">✕</button>
        </div>
      `;

      const input = tag.querySelector('input');
      input.addEventListener('change', (e) => {
        this.state.names[index] = e.target.value;
        this.saveActiveState();
        this.renderPreview();
      });

      // Move Up
      tag.querySelector('.btn-move-up').addEventListener('click', () => {
        if (index > 0) {
          const temp = this.state.names[index];
          this.state.names[index] = this.state.names[index - 1];
          this.state.names[index - 1] = temp;
          this.updateApp();
        }
      });

      // Move Down
      tag.querySelector('.btn-move-down').addEventListener('click', () => {
        if (index < this.state.names.length - 1) {
          const temp = this.state.names[index];
          this.state.names[index] = this.state.names[index + 1];
          this.state.names[index + 1] = temp;
          this.updateApp();
        }
      });

      // Remove
      tag.querySelector('.btn-remove-name').addEventListener('click', () => {
        this.state.names.splice(index, 1);
        this.updateApp();
        this.autoFitOnePage(false);
      });

      this.studentTagsEl.appendChild(tag);
    });
  }

  updateStats() {
    const dates = this.getCurrentDates();
    this.statStudentsCount.textContent = this.state.names.length;
    this.statDatesCount.textContent = dates.length;
    this.statRowsCount.textContent = this.state.extraRows;
  }

  renderPreview() {
    // Auth lock overlay
    if (this.previewLockOverlay) {
      if (!this.activeUserId || this.activeUserId === 'guest') {
        this.previewLockOverlay.style.display = 'flex';
      } else {
        this.previewLockOverlay.style.display = 'none';
      }
    }

    // Header
    this.docTitle.textContent = this.state.title;
    this.docSubtitle.textContent = this.state.subtitle;
    this.docBatch.textContent = this.state.batchName;

    // Get calculated dates
    const dates = this.getCurrentDates();

    // Table Header Row: Name | Date 1 | Date 2 | Date 3 | Date 4
    let headerHTML = '<th>Name</th>';
    dates.forEach(d => {
      headerHTML += `<th>${d}</th>`;
    });
    this.docTableHeader.innerHTML = headerHTML;

    // Table Rows (Student Names + Extra Blank Rows)
    let bodyHTML = '';
    
    // Existing Names
    this.state.names.forEach(name => {
      bodyHTML += '<tr>';
      bodyHTML += `<td>${name}</td>`;
      dates.forEach(() => {
        bodyHTML += '<td></td>';
      });
      bodyHTML += '</tr>';
    });

    // Extra empty rows
    for (let i = 0; i < this.state.extraRows; i++) {
      bodyHTML += '<tr>';
      bodyHTML += '<td>&nbsp;</td>';
      dates.forEach(() => {
        bodyHTML += '<td></td>';
      });
      bodyHTML += '</tr>';
    }

    this.docTableBody.innerHTML = bodyHTML;
  }

  updateApp() {
    this.saveActiveState();
    this.renderPresets();
    this.renderStudentTags();
    this.renderPreview();
    this.updateStats();
  }

  // Calculate exact row height so all student names fit on 1 single page block
  autoFitOnePage(showNotification = true) {
    const totalRows = (this.state.names ? this.state.names.length : 0) + (this.state.extraRows || 0);
    if (totalRows <= 0) return;

    // Available vertical space for table rows on 1 single printable A4 page (~710px inside printable area)
    const availableHeight = 710;
    const computedHeight = Math.floor(availableHeight / totalRows);
    const targetHeight = Math.min(65, Math.max(24, computedHeight));

    this.state.rowHeight = targetHeight;
    if (this.rowHeightInput) this.rowHeightInput.value = targetHeight;
    if (this.rowHeightValue) this.rowHeightValue.textContent = `${targetHeight}px`;
    document.documentElement.style.setProperty('--cell-row-height', `${targetHeight}px`);
    this.saveActiveState();
    this.renderPreview();
    if (showNotification) {
      showToast(`Auto-fitted ${totalRows} rows to 1 page (${targetHeight}px/row)`, 'success');
    }
  }

  exportCSV() {
    const dates = this.getCurrentDates();
    let csv = ['"Name"', ...dates.map(d => `"${d}"`)].join(',') + '\n';
    
    this.state.names.forEach(name => {
      const row = [`"${name.replace(/"/g, '""')}"`, ...dates.map(() => '""')];
      csv += row.join(',') + '\n';
    });

    for (let i = 0; i < this.state.extraRows; i++) {
      const row = ['""', ...dates.map(() => '""')];
      csv += row.join(',') + '\n';
    }

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${this.state.batchName}_Attendance.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('CSV exported successfully!', 'success');
  }

  // Formatted Excel (.xlsx) Export using SheetJS
  exportExcel() {
    if (typeof XLSX === 'undefined') {
      showToast('Excel exporter library not ready', 'error');
      return;
    }

    const dates = this.getCurrentDates();
    const wsData = [
      [this.state.title || "Attendance Sheet"],
      [this.state.subtitle || ""],
      [this.state.batchName || ""],
      [], // Empty row
      ['Name', ...dates]
    ];

    // Student Names
    this.state.names.forEach(name => {
      wsData.push([name, ...dates.map(() => '')]);
    });

    // Extra Blank Rows
    for (let i = 0; i < (this.state.extraRows || 0); i++) {
      wsData.push(['', ...dates.map(() => '')]);
    }

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Set Column Widths (Name = 32, Dates = 14)
    const colWidths = [{ wch: 32 }];
    dates.forEach(() => colWidths.push({ wch: 14 }));
    ws['!cols'] = colWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendance Sheet");

    XLSX.writeFile(wb, `${this.state.batchName || 'Attendance'}_Sheet.xlsx`);
    showToast('Formatted Excel sheet exported successfully!', 'success');
  }

  // Pure Crisp Vector PDF Generation Engine using jsPDF + AutoTable (Strict 1-Page Output)
  exportVectorPDF() {
    const jsPDFLib = window.jspdf ? window.jspdf.jsPDF : (typeof jsPDF !== 'undefined' ? jsPDF : null);
    if (!jsPDFLib) {
      window.print();
      return;
    }

    const doc = new jsPDFLib({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const dates = this.getCurrentDates();

    // 1. Draw Headers (Exact Helvetica Bold text matching reference PDF)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(19);
    doc.text(this.state.title || "Swimming attendance", 16, 22);

    doc.setFontSize(14.5);
    doc.text(this.state.subtitle || "", 16, 30);

    doc.setFontSize(15);
    doc.text(this.state.batchName || "", 16, 38);

    // 2. Prepare Table Data
    const headers = [['Name', ...dates]];
    const body = [];

    // Student Names
    this.state.names.forEach(name => {
      body.push([name, ...dates.map(() => '')]);
    });

    // Extra Blank Rows
    for (let i = 0; i < this.state.extraRows; i++) {
      body.push(['', ...dates.map(() => '')]);
    }

    // 3. Define Column Widths & Alignments
    const nameColWidth = dates.length >= 5 ? 68 : 74;
    const remainingWidth = 178 - nameColWidth;
    const dateColWidth = dates.length > 0 ? (remainingWidth / dates.length) : 25;

    const columnStyles = {
      0: { cellWidth: nameColWidth, halign: 'left', fontStyle: 'normal' }
    };
    dates.forEach((_, idx) => {
      columnStyles[idx + 1] = { cellWidth: dateColWidth, halign: 'center' };
    });

    // 4. Calculate dynamic padding and font sizes to strictly guarantee 1 single page PDF
    const totalPdfRows = body.length;
    let pdfCellPaddingY = 3.5;
    let headFontSize = dates.length >= 5 ? 10 : 11;
    let bodyFontSize = 11;

    if (totalPdfRows > 0) {
      // Available height for body rows on 1 A4 page: ~213mm
      const mmPerRow = 213 / totalPdfRows;
      pdfCellPaddingY = Math.max(1.0, Math.min(7.0, (mmPerRow - 4.5) / 2));

      if (totalPdfRows > 24) {
        bodyFontSize = 9;
        headFontSize = 9.5;
      } else if (totalPdfRows > 18) {
        bodyFontSize = 10;
        headFontSize = 10;
      } else {
        bodyFontSize = 11;
        headFontSize = dates.length >= 5 ? 10.5 : 11.5;
      }
    }

    // 5. Invoke AutoTable safely across CJS / UMD module formats
    const autoTableFunc = doc.autoTable || (window.jspdf ? window.jspdf.autoTable : null) || (window.autoTable);

    if (typeof autoTableFunc === 'function') {
      autoTableFunc.call(doc, {
        startY: 42,
        head: headers,
        body: body,
        showHead: 'everyPage',
        pageBreak: 'avoid',
        margin: { left: 16, right: 16, top: 16, bottom: 12 },
        theme: 'plain',
        styles: {
          font: 'helvetica',
          fontSize: bodyFontSize,
          cellPadding: { top: pdfCellPaddingY, bottom: pdfCellPaddingY, left: 3, right: 3 },
          lineColor: [0, 0, 0],
          lineWidth: 0.25,
          textColor: [0, 0, 0],
          valign: 'middle',
          overflow: 'linebreak'
        },
        headStyles: {
          fontStyle: 'bold',
          fontSize: headFontSize,
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
          lineWidth: 0.35,
          lineColor: [0, 0, 0],
          cellPadding: { top: 4, bottom: 4, left: 1.5, right: 1.5 }
        },
        columnStyles: columnStyles
      });
    } else {
      window.print();
      return;
    }

    doc.save(`${this.state.batchName}_Attendance.pdf`);
    showToast('Vector PDF exported successfully!', 'success');
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  window.app = new AttendanceApp();
});
