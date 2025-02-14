function applyTheme() {
  const params = new URLSearchParams(window.location.search);
  const theme = params.get('theme') || 'light';
  // Сначала удаляем оба класса, чтобы не накапливались
  document.body.classList.remove('theme-dark', 'theme-light');
  document.body.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
}

// Если документ ещё загружается – дождаться DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyTheme);
} else {
  applyTheme();
}
