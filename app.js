v// Compatibility entry point - delegates to src/js/app_controller.js
if (typeof AttendanceApp === 'undefined' && typeof window.AttendanceApp !== 'undefined') {
  window.AttendanceApp = window.AttendanceApp;
}
