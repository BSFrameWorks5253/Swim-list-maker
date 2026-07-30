// Compatibility shim for LoaderService
if (typeof LoaderService === 'undefined' && typeof window.LoaderService !== 'undefined') {
  window.LoaderService = window.LoaderService;
}
