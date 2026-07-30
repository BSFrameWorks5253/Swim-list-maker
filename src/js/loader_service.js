// ==============================================================================
// AQUAFLOW PRO - ANIMATED SPLASH & LOADER SERVICE
// ==============================================================================

class LoaderService {
  static init() {
    const overlay = document.getElementById('loading-overlay');
    if (!overlay) return;

    let progress = 0;
    const progressText = document.getElementById('loader-progress-text');
    const progressBar = document.getElementById('loader-progress-bar');

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 30) + 20;
      if (progress > 100) progress = 100;

      if (progressText) progressText.textContent = `${progress}%`;
      if (progressBar) progressBar.style.width = `${progress}%`;

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => LoaderService.hide(), 150);
      }
    }, 40);

    // Guaranteed safety fallback to hide overlay
    setTimeout(() => LoaderService.hide(), 400);
  }

  static hide() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
      overlay.classList.add('fade-out');
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 400);
    }
  }

  static show() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
      overlay.style.display = 'flex';
      overlay.classList.remove('fade-out');
    }
  }
}

window.LoaderService = LoaderService;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => LoaderService.init());
} else {
  LoaderService.init();
}

// Immediate safety timer
setTimeout(() => LoaderService.hide(), 500);
