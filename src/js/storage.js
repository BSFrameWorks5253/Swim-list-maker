// Compatibility shim for StorageService
if (typeof StorageService === 'undefined' && typeof window.StorageService !== 'undefined') {
  window.StorageService = window.StorageService;
}
