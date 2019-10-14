let themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('change', () => {
  let lightThemeEnabled = document.body.classList.toggle('light-theme');
  localStorage.setItem('light-theme-enadled', lightThemeEnabled);
});

if (JSON.parse(localStorage.getItem('light-theme-enadled'))) {
  document.body.classList.add('light-theme');
  themeToggle.setAttribute('checked', 'checked');
}
