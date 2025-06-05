const products = [
  { id: 1, title: "Genteng Morando Glasur", description: "Genteng kualitas premium...", price: "Rp 5.800 / buah", category: "a" },
  { id: 2, title: "Genteng Glasiran Magas", description: "Genteng kualitas terbaik...", price: "Rp 1.800 / buah", category: "a" },
  { id: 3, title: "Genteng Gepak glasiran", description: "Genteng kualitas baik...", price: "Rp 1.600 / buah", category: "a" },
  { id: 4, title: "Genteng Magas Super", description: "Genteng kualitas menengah atas...", price: "Rp 1.400 / buah", category: "b" },
  { id: 5, title: "Genteng Gepak Super", description: "Genteng kualitas menengah...", price: "Rp 1.300 / buah", category: "b" },
  { id: 6, title: "Genteng Plentong Super", description: "Genteng ekonomis...", price: "Rp 1.200 / buah", category: "b" },
  { id: 7, title: "Genteng Lancip", description: "Genteng ekonomis kualitas terbaik...", price: "Rp 1.100 / buah", category: "c" },
  { id: 8, title: "Genteng Dorengan Gepak", description: "Genteng standar untuk gudang...", price: "Rp 1.000 / buah", category: "c" },
  { id: 9, title: "Genteng Dorengan Plentong", description: "Genteng harga termurah...", price: "Rp 900 / buah", category: "c" },
  { id: 10, title: "Genteng Dorengan Lancip", description: "Genteng ekonomis kualitas terbaik...", price: "Rp 1.100 / buah", category: "c" }
];

let searchResults = [];
let currentSearchIndex = -1;

function renderProducts(category = 'all') {
  const container = document.getElementById('products-container');
  container.innerHTML = '';

  const filtered = category === 'all' ? products : products.filter(p => p.category === category);

  filtered.forEach(product => {
    const badgeClass = `badge-${product.category}`;
    const badgeText = product.category === 'a' ? 'Kelas A' : product.category === 'b' ? 'Kelas B' : 'Kelas C';
    const iconClass = product.category === 'a' ? 'fas fa-house-chimney' : product.category === 'b' ? 'fas fa-home' : 'fas fa-building';

    const html = `
      <div class="product-card" data-id="${product.id}">
        <div class="product-badge ${badgeClass}">${badgeText}</div>
        <div class="product-image"><i class="${iconClass}"></i></div>
        <div class="product-info">
          <h3 class="product-title">${product.title}</h3>
          <div class="product-price">${product.price}</div>
          <p class="product-description">${product.description}</p>
          <a href="https://wa.me/6285282214033?text=Saya%20ingin%20memesan%20${encodeURIComponent(product.title)}" class="order-button" target="_blank">
            <i class="fab fa-whatsapp"></i> Pesan Sekarang
          </a>
        </div>
      </div>`;

    container.innerHTML += html;
  });
}

function performSearch() {
  const term = document.getElementById('search-input').value.trim().toLowerCase();
  if (!term) {
    renderProducts();
    document.getElementById('search-indicator').style.display = 'none';
    searchResults = [];
    currentSearchIndex = -1;
    return;
  }

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(term) ||
    p.description.toLowerCase().includes(term)
  );

  renderFilteredProducts(filtered);
}

function renderFilteredProducts(list) {
  const container = document.getElementById('products-container');
  container.innerHTML = '';

  if (list.length === 0) {
    container.innerHTML = '<p class="no-results">Produk tidak ditemukan. Coba kata kunci lain.</p>';
    document.getElementById('search-indicator').style.display = 'none';
    searchResults = [];
    currentSearchIndex = -1;
    return;
  }

  list.forEach(product => {
    const badgeClass = `badge-${product.category}`;
    const badgeText = product.category === 'a' ? 'Kelas A' : product.category === 'b' ? 'Kelas B' : 'Kelas C';
    const iconClass = product.category === 'a' ? 'fas fa-house-chimney' : product.category === 'b' ? 'fas fa-home' : 'fas fa-building';

    const html = `
      <div class="product-card" data-id="${product.id}">
        <div class="product-badge ${badgeClass}">${badgeText}</div>
        <div class="product-image"><i class="${iconClass}"></i></div>
        <div class="product-info">
          <h3 class="product-title">${product.title}</h3>
          <div class="product-price">${product.price}</div>
          <p class="product-description">${product.description}</p>
          <a href="https://wa.me/6285282214033?text=Saya%20ingin%20memesan%20${encodeURIComponent(product.title)}" class="order-button" target="_blank">
            <i class="fab fa-whatsapp"></i> Pesan Sekarang
          </a>
        </div>
      </div>`;

    container.innerHTML += html;
  });

  searchResults = Array.from(document.querySelectorAll('.product-card'));
  document.getElementById('search-indicator').style.display = 'flex';
  document.getElementById('total-results').textContent = searchResults.length;
  navigateSearchResults(0);
}

function navigateSearchResults(index) {
  if (!searchResults.length) return;

  if (index < 0) index = searchResults.length - 1;
  if (index >= searchResults.length) index = 0;

  searchResults.forEach(card => card.classList.remove('search-highlight'));
  currentSearchIndex = index;
  const card = searchResults[currentSearchIndex];
  card.classList.add('search-highlight');
  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  document.getElementById('current-result').textContent = currentSearchIndex + 1;
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();

  document.getElementById('search-button').addEventListener('click', performSearch);
  document.getElementById('search-input').addEventListener('keypress', e => {
    if (e.key === 'Enter') performSearch();
  });

  document.getElementById('prev-result').addEventListener('click', () => navigateSearchResults(currentSearchIndex - 1));
  document.getElementById('next-result').addEventListener('click', () => navigateSearchResults(currentSearchIndex + 1));
  document.getElementById('close-indicator').addEventListener('click', () => {
    document.getElementById('search-indicator').style.display = 'none';
    searchResults.forEach(card => card.classList.remove('search-highlight'));
    searchResults = [];
    currentSearchIndex = -1;
  });

  document.querySelectorAll('.category-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderProducts(tab.dataset.category);
      document.getElementById('search-input').value = '';
      document.getElementById('search-indicator').style.display = 'none';
    });
  });

  document.getElementById('promo-button').addEventListener('click', () => {
    document.getElementById('promo-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  document.addEventListener('keydown', e => {
    if (searchResults.length > 0) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        navigateSearchResults(currentSearchIndex - 1);
        e.preventDefault();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        navigateSearchResults(currentSearchIndex + 1);
        e.preventDefault();
      }
    }
  });
});
