const ITEMS = [
  { id: 'i1', name: 'Laptop Pro',    price: 1299, desc: '16" M3, 18hr battery' },
  { id: 'i2', name: 'Smartphone X',  price: 899,  desc: '6.7" OLED, 200MP' },
  { id: 'i3', name: 'Monitor 4K',    price: 549,  desc: '32" IPS, 144Hz' },
  { id: 'i4', name: 'Keyboard',      price: 149,  desc: 'Mechanical, TKL' },
  { id: 'i5', name: 'Mouse',         price: 79,   desc: 'Wireless, 4000 DPI' },
];

function getCart() {
  try { return JSON.parse(sessionStorage.getItem('cart')) || {}; } catch { return {}; }
}
function saveCart(cart) {
  sessionStorage.setItem('cart', JSON.stringify(cart));
}

function setQty(id, delta) {
  const cart = getCart();
  const current = cart[id] || 0;
  const next = current + delta;
  if (next <= 0) delete cart[id]; else cart[id] = next;
  saveCart(cart);
  render();
}

function removeItem(id) {
  const cart = getCart();
  delete cart[id];
  saveCart(cart);
  render();
}

function clearCart() {
  sessionStorage.removeItem('cart');
  render();
}

function checkout() {
  alert('✅ Order placed! (demo)\nCart cleared from sessionStorage.');
  clearCart();
}

function render() {
  const cart = getCart();

  // Product rows
  document.getElementById('productList').innerHTML = ITEMS.map(item => {
    const qty = cart[item.id] || 0;
    return `
      <div class="product-row">
        <div class="product-info">
          <strong>${item.name}</strong>
          <span>${item.desc}</span>
        </div>
        <span class="price-badge">$${item.price}</span>
        <div class="qty-control">
          <button class="qty-btn" onclick="setQty('${item.id}', -1)">−</button>
          <span class="qty-display">${qty}</span>
          <button class="qty-btn" onclick="setQty('${item.id}', 1)">+</button>
        </div>
      </div>`;
  }).join('');

  // Cart panel
  const entries = Object.entries(cart);
  const cartEl = document.getElementById('cartItems');
  if (!entries.length) {
    cartEl.innerHTML = '<div class="empty-cart">Cart is empty</div>';
  } else {
    cartEl.innerHTML = entries.map(([id, qty]) => {
      const item = ITEMS.find(i => i.id === id);
      return `
        <div class="cart-item">
          <span>${item.name} × ${qty}</span>
          <span>$${(item.price * qty).toLocaleString()}
            <button class="remove-btn" onclick="removeItem('${id}')" title="Remove">✕</button>
          </span>
        </div>`;
    }).join('');
  }

  const total = entries.reduce((sum, [id, qty]) => {
    return sum + (ITEMS.find(i => i.id === id)?.price || 0) * qty;
  }, 0);
  document.getElementById('cartTotal').textContent = `$${total.toLocaleString()}`;
}

render();
