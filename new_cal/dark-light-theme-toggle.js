let themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('change', () => {
  let lightThemeEnabled = document.body.classList.toggle('light-theme');
  localStorage.setItem('light-theme-enabled', lightThemeEnabled);
});

if (JSON.parse(localStorage.getItem('light-theme-enabled'))) {
  document.body.classList.add('light-theme');
  themeToggle.setAttribute('checked', 'checked');
}
