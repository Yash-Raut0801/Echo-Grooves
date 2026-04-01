export async function logout() {
  try {
    await fetch('https://echo-grooves.onrender.com/api/auth/logout', { credentials: 'include' })
    window.location.href = '/'
  } catch (err) {
    console.error('Failed to log out:', err)
  }
}
