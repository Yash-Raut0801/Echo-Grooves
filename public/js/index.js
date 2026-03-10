import { checkAuth, renderGreeting, showHideMenuItems } from './authUI.js'
import { getProducts, populateGenreSelect } from './productServices.js'
import { renderProducts } from './productUI.js'
import { updateCartIcon } from './cartService.js'
import { logout } from './logout.js'

const searchInput = document.getElementById('search-input')
const searchForm = document.querySelector('form[role="search"]')
const genreSelect = document.getElementById('genre-select')
const logoutBtn = document.getElementById('logout-btn')

logoutBtn.addEventListener('click', logout)

async function refreshProducts(filters = {}) {
  const products = await getProducts(filters)
  renderProducts(products)
}

async function applySearchFilter() {
  const search = searchInput.value.trim()
  const filters = {}
  if (search) filters.search = search
  await refreshProducts(filters)
}

searchInput.addEventListener('input', applySearchFilter)

searchForm.addEventListener('submit', (event) => {
  event.preventDefault()
  applySearchFilter()
})

genreSelect.addEventListener('change', async (event) => {
  const genre = event.target.value
  await refreshProducts(genre ? { genre } : {})
})

async function init() {
  await populateGenreSelect()
  await refreshProducts()

  const name = await checkAuth()
  renderGreeting(name)
  showHideMenuItems(name)

  if (name) {
    await updateCartIcon()
  }
}

init()
