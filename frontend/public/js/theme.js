const themeKey = 'echo-records-theme'
const themeToggleBtn = document.getElementById('theme-toggle')

function applyTheme(theme) {
  const activeTheme = theme === 'light' ? 'light' : 'dark'
  document.body.dataset.theme = activeTheme

  if (themeToggleBtn) {
    themeToggleBtn.textContent = activeTheme === 'dark' ? 'Light Mode' : 'Dark Mode'
    themeToggleBtn.setAttribute('aria-pressed', String(activeTheme === 'light'))
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem(themeKey) || 'dark'
  applyTheme(savedTheme)
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const nextTheme = document.body.dataset.theme === 'light' ? 'dark' : 'light'
    localStorage.setItem(themeKey, nextTheme)
    applyTheme(nextTheme)
  })
}

initTheme()
