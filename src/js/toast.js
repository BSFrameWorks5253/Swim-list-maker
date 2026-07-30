// ==============================================================================
// AQUAFLOW PRO - ULTRA-SLEEK GLASSMORTIC TOAST NOTIFICATION ENGINE
// ==============================================================================

class ToastService {
  static show(message, type = 'info', duration = 3200) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type} toast-enter`;

    const iconMap = {
      success: '⚡',
      error: '💥',
      warning: '⚠️',
      info: '✨'
    };

    const icon = iconMap[type] || '✨';

    toast.innerHTML = `
      <div class="toast-content">
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
      </div>
      <button class="toast-close" title="Dismiss">✕</button>
      <div class="toast-progress-bar" style="animation-duration: ${duration}ms;"></div>
    `;

    const closeBtn = toast.querySelector('.toast-close');
    const dismiss = () => {
      toast.classList.remove('toast-enter');
      toast.classList.add('toast-exit');
      setTimeout(() => toast.remove(), 280);
    };

    closeBtn.addEventListener('click', dismiss);

    container.appendChild(toast);

    // Haptic Feedback for Supported Touch Devices
    if (navigator.vibrate) {
      if (type === 'error') navigator.vibrate([40, 60, 40]);
      else if (type === 'success') navigator.vibrate(25);
    }

    const timer = setTimeout(dismiss, duration);
    toast.addEventListener('mouseenter', () => clearTimeout(timer));
  }

  static success(msg) { ToastService.show(msg, 'success'); }
  static error(msg) { ToastService.show(msg, 'error', 4200); }
  static warning(msg) { ToastService.show(msg, 'warning'); }
  static info(msg) { ToastService.show(msg, 'info'); }
}

window.ToastService = ToastService;
// Backwards compatibility helper
window.showToast = (msg, type = 'info') => ToastService.show(msg, type);
