const signinForm = document.getElementById('signin-form')
const errorMessage = document.getElementById('error-message')
const urlParams = new URLSearchParams(window.location.search)
const returnTo = urlParams.get('returnTo') || '/'

signinForm.addEventListener('submit', async (e) => {
  e.preventDefault() // Prevent form from reloading the page

  const username = document.getElementById('signin-username').value.trim()
  const password = document.getElementById('signin-password').value.trim()
  const submitBtn = signinForm.querySelector('button')

  errorMessage.textContent = '' // Clear old error messages
  submitBtn.disabled = true

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', // Ensure session cookie is sent
      body: JSON.stringify({ username, password })
    })

    let data = {}
    const contentType = res.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      data = await res.json()
    } else {
      const text = await res.text()
      data.error = text || 'Login failed. Please try again.'
    }

    if (res.ok) {
      window.location.href = returnTo
    } else {
      errorMessage.textContent = data.error || 'Login failed. Please try again.'
    }
  } catch (err) {
    console.error('Network error:', err)
    errorMessage.textContent = 'Unable to connect. Please try again.'
  } finally {
    submitBtn.disabled = false
  }
})
