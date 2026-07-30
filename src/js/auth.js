// Compatibility shim for AuthService
if (typeof AuthService === 'undefined' && typeof window.AuthService !== 'undefined') {
  window.AuthService = window.AuthService;
}
