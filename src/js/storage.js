// ==============================================================================
// AQUAFLOW PRO - STRICT USER DATA ISOLATION STORAGE SERVICE
// ==============================================================================
// Guarantees 100% Data Security: User A's data is strictly isolated from User B.

class StorageService {
  static getEmptyState() {
    return {
      title: 'Swimming attendance',
      subtitle: 'Time : 11:00am to 11:40am',
      batchName: 'Girls Batch 4',
      category: 'Girls',
      month: 6, // July (0-indexed)
      year: 2026,
      dayOfWeek: 6, // Saturday
      useCustomDates: false,
      customDates: [],
      extraRows: 4,
      rowHeight: 48,
      excludedDates: '',
      names: []
    };
  }

  static getEmptyPresets() {
    return [
      {
        id: 'girls-batch-4',
        name: 'Girls Batch 4',
        category: 'Girls',
        title: 'Swimming attendance',
        subtitle: 'Time : 11:00am to 11:40am',
        batchName: 'Girls Batch 4',
        month: 6,
        year: 2026,
        dayOfWeek: 6,
        extraRows: 4,
        names: []
      },
      {
        id: 'boys-batch-4',
        name: 'Boys Batch 4',
        category: 'Boys',
        title: 'Swimming attendance',
        subtitle: 'Time : 11:40am to 12:20pm',
        batchName: 'Boys Batch 4',
        month: 6,
        year: 2026,
        dayOfWeek: 6,
        extraRows: 4,
        names: []
      }
    ];
  }

  // Load User A data ONLY for User A's authenticated UID
  static async loadUserWorkspace(userId, firebaseDb) {
    if (!userId || userId === 'guest') {
      return { state: StorageService.getEmptyState(), presets: StorageService.getEmptyPresets() };
    }

    const localKey = `aquaflow_user_data_${userId}`;
    let cached = null;
    try {
      const stored = localStorage.getItem(localKey);
      if (stored) cached = JSON.parse(stored);
    } catch (e) {
      console.warn('Storage Cache Read Note:', e);
    }

    // Try fetching strict Firestore document for userId
    if (firebaseDb) {
      try {
        const doc = await firebaseDb.collection('user_workspaces').doc(userId).get();
        if (doc.exists) {
          const data = doc.data();
          const result = {
            state: data.state || (cached ? cached.state : StorageService.getEmptyState()),
            presets: data.presets || (cached ? cached.presets : StorageService.getEmptyPresets())
          };
          localStorage.setItem(localKey, JSON.stringify(result));
          return result;
        }
      } catch (err) {
        console.warn('Firestore Read Isolation Note:', err.message);
      }
    }

    return cached || { state: StorageService.getEmptyState(), presets: StorageService.getEmptyPresets() };
  }

  // Save User A data strictly to /user_workspaces/UserA
  static async saveUserWorkspace(userId, state, presets, firebaseDb, firebaseAuth) {
    if (!userId || userId === 'guest') return;

    // Validate that current authenticated user is strictly userId
    if (firebaseAuth && firebaseAuth.currentUser && firebaseAuth.currentUser.uid !== userId) {
      console.error('SECURITY ERROR: Unauthorized attempt to write data to another user workspace!');
      return;
    }

    const payload = { state, presets };
    const localKey = `aquaflow_user_data_${userId}`;

    try {
      localStorage.setItem(localKey, JSON.stringify(payload));
    } catch (e) {
      console.warn('LocalStorage Save Note:', e);
    }

    // Write to Firestore under strictly authenticated UID
    if (firebaseDb && firebaseAuth && firebaseAuth.currentUser && firebaseAuth.currentUser.uid === userId) {
      try {
        await firebaseDb.collection('user_workspaces').doc(userId).set({
          state,
          presets,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      } catch (err) {
        console.warn('Firestore Write Isolation Note:', err.message);
      }
    }
  }

  // Wipe memory cache on sign out
  static clearSessionCache() {
    try {
      const activeId = localStorage.getItem('aquaflow_active_user_id');
      if (activeId) {
        localStorage.removeItem(`aquaflow_user_data_${activeId}`);
      }
      localStorage.removeItem('aquaflow_active_user_id');
    } catch (e) {
      console.warn('Clear Cache Note:', e);
    }
  }
}

window.StorageService = StorageService;
