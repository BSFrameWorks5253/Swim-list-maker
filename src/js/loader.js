// ==============================================================================
// AQUAFLOW PRO - ULTRA-PREMIUM ANIMATED SPLASH & LOADER SERVICE
// ==============================================================================

class LoaderService {
  static init() {
    const overlay = document.getElementById('loading-overlay');
    if (!overlay) return;

    let progress = 0;
    const progressText = document.getElementById('loader-progress-text');
    const progressBar = document.getElementById('loader-progress-bar');

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 25) + 15;
      if (progress > 100) progress = 100;

      if (progressText) progressText.textContent = `${progress}%`;
      if (progressBar) progressBar.style.width = `${progress}%`;

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => LoaderService.hide(), 250);
      }
    }, 60);

    // Fallback safety timeout
    setTimeout(() => LoaderService.hide(), 1200);
  }

  static hide() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
      overlay.classList.add('fade-out');
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 500);
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

document.addEventListener('DOMContentLoaded', () => {
  LoaderService.init();
});
