// Compatibility shim for ToastService
if (typeof ToastService === 'undefined' && typeof window.ToastService !== 'undefined') {
  window.ToastService = window.ToastService;
}
