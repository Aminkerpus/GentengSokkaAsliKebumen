/* INTRO ANIMATION */
function showIntro() {
    const introIcon = document.getElementById('intro-icon');
    const introContainer = document.getElementById('intro-container');
    const mainContent = document.getElementById('main-content');
    
    if (sessionStorage.getItem('introShown')) {
        document.getElementById('intro-container').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        initMainContent();
        return;
    }

    // Tandai intro sudah ditampilkan
    sessionStorage.setItem('introShown', 'true');
    // Animasi pop-up
    setTimeout(() => {
        introIcon.style.opacity = '1';
        introIcon.style.transform = 'scale(1.2)';
    }, 300);

    // Animasi fade-out
    setTimeout(() => {
        introIcon.style.opacity = '0';
        introIcon.style.transform = 'scale(0.8)';
    }, 1800);

    // Hapus intro setelah animasi selesai
    setTimeout(() => {
        introContainer.style.opacity = '0';
        
        setTimeout(() => {
            introContainer.style.display = 'none';
            mainContent.style.display = 'block';
            initMainContent(); // Panggil inisialisasi konten utama
        }, 500);
    }, 2600);
}

/* VARIABEL PENCARIAN */
let products = []; // Deklarasi variabel global
let searchResults = [];
let currentSearchIndex = -1;

/* DATA PRODUK GENTENG */
const productsData = [    // Data produk tetap sama seperti sebelumnyaconst products = [
    {
        id: 1,
        title: "Genteng Morando",
        image: "product/img/morando1.jpg",
        images: [ // Tambahkan array gambar
            "product/img/morando1.jpg",
            "product/img/morando2.jpg",
            "product/img/morando1.jpg",
            "product/img/morando2.jpg"
        ],
        description: "Genteng dengan tampilan kuat dan elegan dengan perlindungan superior, tahan bocor, tahan lama.",
        price: "Rp 5.800 / buah",
        category: "top",
        fullDescription: "Genteng Morando menghadirkan kombinasi sempurna antara kekuatan dan estetika. Dibuat dari keramik berkualitas tinggi dengan sistem interlocking presisi, genteng ini memberikan perlindungan maksimal terhadap cuaca ekstrem, mencegah kebocoran, dan meminimalkan perawatan. memberikan kesan  hangat dan modern, Morando menambah nilai estetika hunian Anda. kokoh, serta mudah dipasang, genteng ini adalah pilihan ideal bagi Anda yang menginginkan atap premium yang tahan lama dan berkelas. Siap meningkatkan kualitas properti Anda? Pilih Genteng Morando!",
        specs: [
            "Dimensi: 30cm x 20cm x 1.5cm",
            "Berat: 2.5 kg/buah",
            "Kebutuhan per m²: 24 buah",
            "Jarak Reng: 25cm"
        ]
    },
    {
        id: 2,
        title: "Genteng Magas glasur",
        image: "product/img/magas3.jpg",
        images: [ // Tambahkan array gambar
            "product/img/magas3.jpg",
            "product/img/magas3.jpg",
            "product/img/magas3.jpg",
            "product/img/magas3.jpg"
        ],
        description: "Genteng kualitas terbaik dengan lapis glasur premium, kilap mewah, tahan cuaca, pemasangan mudah, atap anggun dan kuat.",
        price: "Rp 2.600 / buah",
        category: "top",
        fullDescription: "Genteng Magas Glasur menggabungkan keramik solid dengan lapisan glasur premium untuk tampilan mewah. Ukuran 29 × 23 cm, jarak reng 23 cm, ketebalan 1,4 cm, berat ± 1,6 kg, kebutuhan 25 pcs/m². Desain interlocking canggih menghasilkan sambungan kuat tanpa celah, melindungi hunian dari kebocoran. Glasur anti-UV menjaga kilap warna, pori rendah menghindari kelembapan berlebih dan tumbuh lumut. Ringan dan mudah dipasang, genteng ini ideal untuk projek arsitektur modern yang menuntut performa dan estetika tinggi.",
        specs: [
            "Dimensi: 30cm x 20cm x 1.5cm",
            "Berat: 2.5 kg/buah",
            "Kebutuhan per m²: 24 buah",
            "Jarak Reng: 15cm"
        ]
    },
    {
        id: 3,
        title: "Genteng Klasik Kodok",
        image: "product/img/kodok1.jpg",
        images: [ // Tambahkan array gambar
            "product/img/kodok1.jpg",
            "product/img/kodok1.jpg",
            "product/img/kodok1.jpg",
            "product/img/kodok1.jpg"
        ],
        description: "Genteng klasik warisan Hindia-Belanda, desain ikonik, keramik kuat, ventilasi optimal, menambah karakter klasik rumah.",
        price: "Rp 2.300 / buah",
        category: "top",
        fullDescription: "Genteng Kodok, atau genteng pentol Hindia-Belanda, hadir dengan profil melengkung unik yang meningkatkan sirkulasi udara di bawah atap. Dimensi 27 × 21 cm, jarak reng 22 cm, ketebalan 1,2 cm, berat ± 1,5 kg, dan kebutuhan 25 pcs/m². Bentuk klasiknya menambah daya tarik arsitektur heritage, sementara pemasangan tanpa sambungan tambahan mempercepat proses instalasi. Pilihan sempurna untuk restorasi bangunan tua atau hunian bergaya kolonial.",
        specs: [
            "Dimensi: 30cm x 20cm x 1.5cm",
            "Berat: 2.5 kg/buah",
            "Kebutuhan per m²: 24 buah",
            "Jarak Reng: 22cm"
        ]
    },
    {
        id: 4,
        title: "Genteng Magas biasa",
        image: "product/img/magas2.jpg",
        images: [ // Tambahkan array gambar
            "product/img/magas2.jpg",
            "product/img/magas1.jpg",
            "product/img/magas4.jpg",
            "product/img/magas1.jpg"
        ],
        description: "Genteng  terlaris dengan perlindungan handal, dan awet, harga terjangkau, pemasangan praktis, solusi atap efisien.",
        price: "Rp 2.250 / buah",
        category: "kw1",
        fullDescription: "Genteng Magas Glasur menggabungkan keramik solid dengan lapisan glasur premium untuk tampilan mewah. Ukuran 29 × 23 cm, jarak reng 23 cm, ketebalan 1,4 cm, berat ± 1,6 kg, kebutuhan 25 pcs/m². Desain interlocking canggih menghasilkan sambungan kuat tanpa celah, melindungi hunian dari kebocoran. Ringan dan mudah dipasang, genteng ini ideal untuk projek arsitektur modern yang menuntut performa dan estetika tinggi.",
        specs: [
            "Dimensi: 30cm x 20cm x 1.5cm",
            "Berat: 2.5 kg/buah",
            "Kebutuhan per m²: 24 buah",
            "Jarak Reng: 15cm"
        ]
    },
    {
        id: 5,
        title: "Genteng Plentong Gepak",
        image: "product/img/gepak1.jpg",
        images: [ // Tambahkan array gambar
            "product/img/gepak1.jpg",
            "product/img/gepak1.jpg",
            "product/img/gepak1.jpg",
            "product/img/gepak1.jpg"
        ],
        description: "Genteng ekonomis dengan gaya tradisional solid, pori rendah, ringan, mudah pasang, tampilan rumah natural.",
        price: "Rp 1.650 / buah",
        category: "kw1",
        fullDescription: "Genteng Plentong Gepak menawarkan kualitas genteng tradisional dengan bentuk papak datar. Dimensi 29 × 21 cm, jarak reng 22 cm, ketebalan 1,3 cm, berat ± 1,4 kg, kebutuhan 25 pcs/m². Made in Indonesia dari tanah liat alami yang dibakar pada suhu tinggi, menghasilkan kepadatan optimal dan pori rendah. Profil gepak memudahkan overlapping antar keping, meminimalkan risiko bocor. Permukaan matt memberikan nuansa rustic, cocok untuk konsep natural atau tradisional. Pemasangan cepat, perawatan minimal, hadir dengan harga terjangkau.",
        specs: [
            "Dimensi: 30cm x 20cm x 1.5cm",
            "Berat: 2.5 kg/buah",
            "Kebutuhan per m²: 24 buah",
            "Jarak Reng: 22cm"
        ]
    },
    {
        id: 6,
        title: "Genteng Plentong Bulat",
        image: "product/img/plentong1.jpg",
        images: [ // Tambahkan array gambar
            "product/img/plentong1.jpg",
            "product/img/plentong2.jpg",
            "product/img/plentong1.jpg",
            "product/img/plentong2.jpg"
        ],
        description: "Genteng ekonomis dengan kualitas memadai untuk bangunan sederhana estetika melengkung klasik, ketahanan baik, ventilasi prima, metode pemasangan fleksibel.",
        price: "Rp 1.650 / buah",
        category: "kw1",
        fullDescription: "Genteng Plentong Bulat memiliki ujung melengkung khas yang mempercantik profil atap. Ukuran 29 × 21 cm, jarak reng 22 cm, ketebalan 1,3 cm, berat ± 1,5 kg, kebutuhan 25 pcs/m². Tanah liat berkualitas tinggi diproses presisi, menghasilkan struktur kuat dan pori rendah. Bentuk bunder mendukung aliran air hujan efisien sekaligus menambah ventilasi alami di bawah atap. Ringan dan mudah dipasang dengan metode fleksibel, genteng ini cocok untuk renovasi bangunan lama maupun konstruksi baru bergaya tradisional. Perawatan rendah dan daya tahan sudah terbukti.",
        specs: [
            "Dimensi: 29cm x 21cm x 1.3cm",
            "Berat: 1.5 kg/buah",
            "Kebutuhan per m²: 25 buah",
            "Jarak Reng: 22cm"
        ]
    },
    {
        id: 8,title: "etalase kosong",
        image: "product/img/genteng.png",
        images: [ // Tambahkan array gambar
            "product/img/genteng.png",
            "product/img/genteng.png",
            "product/img/genteng.png",
            "product/img/genteng.png"
        ],
        description: "space iklan Kosong.",
        price: "Rp 0.000 / buah",
        category: "kw2",
        fullDescription: "bagi yang minat hubungi segera",
        specs: [
            "Dimensi: kosong",
            "Berat: kosong",
            "Kebutuhan per m²: kosong",
            "Jarak Reng: kosong"
        ]
    },
    {
        id: 9,
        title: "etalase kosong",
        image: "product/img/genteng.png",
        images: [ // Tambahkan array gambar
            "product/img/genteng.png",
            "product/img/genteng.png",
            "product/img/genteng.png",
            "product/img/genteng.png"
        ],
        description: "space iklan Kosong.",
        price: "Rp 0.000 / buah",
        category: "kerpus",
        fullDescription: "bagi yang minat hubungi segera",
        specs: [
            "Dimensi: kosong",
            "Berat: kosong",
            "Kebutuhan per m²: kosong",
            "Jarak Reng: kosong"
        ]
    }
];


/* FUNGSI RENDER PRODUK */
function renderProducts(category = 'all') {
    const container = document.getElementById('products-container');
    if (!container) return; // Handle jika element tidak ditemukan
    
    container.innerHTML = '';
    
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    if (filteredProducts.length === 0) {
        container.innerHTML = '<p class="no-results">Tidak ada produk yang ditemukan.</p>';
        return;
    }
        filteredProducts.forEach(product => {
        const badgeClass = `badge-${product.category}`;
        const badgeText = product.category === 'top' ? 'Top' : 
                         product.category === 'kerpus' ? 'Kerpus' : 
                         product.category === 'kw1' ? 'kw1' : 'kw2';
        
        const iconClass = product.category === 'top' ? 'fas fa-building' :
                          product.category === 'kerpus' ? 'fas fa-building' : 
                          product.category === 'kw1' ? 'fas fa-house-chimney' : 'fas fa-home';
        
        const productCard = `
    <div class="product-card" data-id="${product.id}">
        <div class="product-badge ${badgeClass}">${badgeText}</div>
        <div class="product-image">
            <img src="${product.image}" alt="${product.title}" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <div class="product-price">${product.price}</div>
            <p class="product-description">${product.description}</p>
            <div class="product-buttons">
                <a href="https://wa.me/6285282214033?text=Saya%20ingin%20memesan%20${encodeURIComponent(product.title)}" 
                   class="order-button" target="_blank">
                    <i class="fab fa-whatsapp"></i> Pesan Sekarang
                </a>
                <a href="product-detail.html?id=${product.id}" class="detail-button">
                    <i class="fas fa-eye"></i> Lihat Selengkapnya
                </a>
            </div>
        </div>
    </div>
`;
        
        container.innerHTML += productCard;
    });
    
    
    // Tambahkan event listener untuk card produk
    container.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.order-button') && 
                !e.target.closest('.detail-button')) {
                
                const productId = this.dataset.id;
                const product = products.find(p => p.id == productId);
                
                if (product) {
                    localStorage.setItem('selectedProduct', JSON.stringify(product));
                    window.location.href = 'product-detail.html';
                }
            }
        });
    });
}

/* FUNGSIONALITAS TAB KATEGORI */
function initCategoryTabs() {
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.category-tab').forEach(t => {
                t.classList.remove('active');
            });
            
            tab.classList.add('active');
            
            const category = tab.getAttribute('data-category');
            renderProducts(category);
            
            // Reset pencarian
            document.getElementById('search-input').value = '';
            searchResults = [];
            currentSearchIndex = -1;
            document.getElementById('search-indicator').style.display = 'none';
        });
    });
}

/* FUNGSI SCROLL KE PROMO */
function scrollToPromo() {
    const promoSection = document.getElementById('promo-section');
    if (promoSection) {
        promoSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/* FUNGSI PENCARIAN PRODUK */
function performSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm) {
        const filtered = products.filter(product => 
            product.title.toLowerCase().includes(searchTerm) || 
            product.description.toLowerCase().includes(searchTerm)
        );
        renderFilteredProducts(filtered);
    } else {
        renderProducts();
        document.getElementById('search-indicator').style.display = 'none';
        searchResults = [];
        currentSearchIndex = -1;
    }
}

/* RENDER HASIL PENCARIAN */
function renderFilteredProducts(filteredProducts) {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        container.innerHTML = '<p class="no-results">Produk tidak ditemukan. Coba kata kunci lain.</p>';
        document.getElementById('search-indicator').style.display = 'none';
        searchResults = [];
        currentSearchIndex = -1;
        return;
    }
        filteredProducts.forEach(product => {
        const badgeClass = `badge-${product.category}`;
        const badgeText = product.category === 'top' ? 'Top' : 
                         product.category === 'kerpus' ? 'Kerpus' : 
                         product.category === 'kw1' ? 'kw1' : 'kw2';
        
        const iconClass = product.category === 'top' ? 'fas fa-building' :
                          product.category === 'kerpus' ? 'fas fa-building' : 
                          product.category === 'kw1' ? 'fas fa-house-chimney' : 'fas fa-home';
        
        const productCard = `
    <div class="product-card" data-id="${product.id}">
        <div class="product-badge ${badgeClass}">${badgeText}</div>
        <div class="product-image">
            <img src="${product.image}" alt="${product.title}" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <div class="product-price">${product.price}</div>
            <p class="product-description">${product.description}</p>
            <div class="product-buttons">
                <a href="https://wa.me/6285282214033?text=Saya%20ingin%20memesan%20${encodeURIComponent(product.title)}" 
                   class="order-button" target="_blank">
                    <i class="fab fa-whatsapp"></i> Pesan Sekarang
                </a>
                <a href="product-detail.html?id=${product.id}" class="detail-button">
                    <i class="fas fa-eye"></i> Lihat Selengkapnya
                </a>
            </div>
        </div>
    </div>
`;
        
        container.innerHTML += productCard;
    });

    
    // Tambahkan event listener untuk card produk
    container.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.order-button') && 
                !e.target.closest('.detail-button')) {
                
                const productId = this.dataset.id;
                const product = products.find(p => p.id == productId);
                
                if (product) {
                    localStorage.setItem('selectedProduct', JSON.stringify(product));
                    window.location.href = 'product-detail.html';
                }
            }
        });
    });
    
    searchResults = Array.from(document.querySelectorAll('.product-card'));
    
    document.getElementById('current-result').textContent = '0';
    document.getElementById('total-results').textContent = searchResults.length;
    document.getElementById('search-indicator').style.display = 'flex';
    
    navigateSearchResults(0);
}

/* NAVIGASI HASIL PENCARIAN */
function navigateSearchResults(index) {
    if (searchResults.length === 0) return;
    
    if (index < 0) index = searchResults.length - 1;
    if (index >= searchResults.length) index = 0;
    
    searchResults.forEach(card => card.classList.remove('search-highlight'));
    
    currentSearchIndex = index;
    const currentCard = searchResults[currentSearchIndex];
    currentCard.classList.add('search-highlight');
    
    document.getElementById('current-result').textContent = currentSearchIndex + 1;
    
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;
    const yOffset = -headerHeight - 20;
    
    const y = currentCard.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({top: y, behavior: 'smooth'});
}

/* INISIALISASI KONTEN UTAMA */
function initMainContent() {
    // Isi variabel products dengan data produk
    products = [...productsData];
    
    renderProducts();
    initCategoryTabs();
    
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.focus();
    }
    
    // Event listener untuk pencarian
    const searchButton = document.getElementById('search-button');
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') performSearch();
        });
    }
    
    // Tombol promo
    const promoButton = document.getElementById('promo-button');
    if (promoButton) {
        promoButton.addEventListener('click', scrollToPromo);
    }
    
    // Navigasi hasil pencarian
    const prevResult = document.getElementById('prev-result');
    const nextResult = document.getElementById('next-result');
    const closeIndicator = document.getElementById('close-indicator');
    
    if (prevResult) prevResult.addEventListener('click', () => navigateSearchResults(currentSearchIndex - 1));
    if (nextResult) nextResult.addEventListener('click', () => navigateSearchResults(currentSearchIndex + 1));
    if (closeIndicator) closeIndicator.addEventListener('click', () => {
        document.getElementById('search-indicator').style.display = 'none';
        searchResults.forEach(card => card.classList.remove('search-highlight'));
        searchResults = [];
        currentSearchIndex = -1;
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
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
}

// Mulai dengan menampilkan intro
document.addEventListener('DOMContentLoaded', showIntro);