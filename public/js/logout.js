export async function logout() {
  try {
    await fetch('/api/auth/logout', { credentials: 'include' })
    window.location.href = '/'
  } catch (err) {
    console.error('Failed to log out:', err)
  }
}
