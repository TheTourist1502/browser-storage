const PRODUCTS = [
  { id: 'p1', name: 'Laptop Pro', price: '$1,299', desc: '16" display, M3 chip, 18-hour battery life. Perfect for developers.' },
  { id: 'p2', name: 'Smartphone X', price: '$899', desc: '6.7" OLED, 200MP camera, 5G. Flagship performance.' },
  { id: 'p3', name: 'Monitor 4K', price: '$549', desc: '32" 4K IPS panel, 144Hz, HDR600. Stunning color accuracy.' },
];

function get(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
}
function set(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

function getFavs() { return get('favorites') || []; }
function getRatings() { return get('ratings') || {}; }
function getHistory() { return get('viewHistory') || []; }
function isDark() { return get('darkMode') !== false; }

function toggleFav(id) {
  const favs = getFavs();
  const next = favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id];
  set('favorites', next);
  render();
}

function rateProduct(id, stars) {
  const ratings = getRatings();
  ratings[id] = stars;
  set('ratings', ratings);
  render();
}

function viewProduct(id) {
  const history = getHistory().filter(h => h !== id);
  set('viewHistory', [id, ...history].slice(0, 10));
  render();
}

function toggleDark() {
  set('darkMode', !isDark());
  applyTheme();
}

function applyTheme() {
  document.body.classList.toggle('light', !isDark());
  document.getElementById('themeBtn').textContent = isDark() ? '☀️ Light Mode' : '🌙 Dark Mode';
}

function clearAll() {
  localStorage.clear();
  render();
}

function render() {
  const favs = getFavs();
  const ratings = getRatings();

  const container = document.getElementById('products');
  container.innerHTML = PRODUCTS.map(p => {
    const isFav = favs.includes(p.id);
    const rating = ratings[p.id] || 0;
    const stars = [1,2,3,4,5].map(n =>
      `<span class="star ${n <= rating ? 'active' : ''}" onclick="rateProduct('${p.id}', ${n})">★</span>`
    ).join('');
    return `
      <div class="product-card ${isFav ? 'favorited' : ''}">
        <h2>${p.name}</h2>
        <div class="price">${p.price}</div>
        <p class="desc">${p.desc}</p>
        <div class="stars">${stars}</div>
        <div class="card-actions">
          <button class="btn-fav ${isFav ? 'active' : ''}" onclick="toggleFav('${p.id}')">
            ${isFav ? '❤️ Saved' : '🤍 Favorite'}
          </button>
          <button class="btn-view" onclick="viewProduct('${p.id}')">👁 View</button>
        </div>
      </div>`;
  }).join('');

  const history = getHistory();
  const histPanel = document.getElementById('historyPanel');
  if (history.length) {
    const names = history.map(id => PRODUCTS.find(p => p.id === id)?.name || id);
    histPanel.style.display = 'block';
    document.getElementById('historyList').innerHTML =
      names.map(n => `<span class="history-tag">${n}</span>`).join('');
  } else {
    histPanel.style.display = 'none';
  }
}

applyTheme();
render();
