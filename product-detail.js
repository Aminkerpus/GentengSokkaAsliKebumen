// Fungsi untuk menangani perubahan thumbnail dan scroll gambar
document.addEventListener('DOMContentLoaded', function() {
    const product = JSON.parse(localStorage.getItem('selectedProduct'));
    const mainImage = document.getElementById('main-product-image');
    const thumbnailsContainer = document.querySelector('.thumbnail-container');
    const dotsContainer = document.querySelector('.image-indicator');
    const scrollLeftBtn = document.querySelector('.left-scroll');
    const scrollRightBtn = document.querySelector('.right-scroll');
    
    let currentImageIndex = 0;
    let productImages = [];

    if (product) {
        // Gunakan array images jika ada, jika tidak gunakan image tunggal
        productImages = product.images || [product.image];
        
        // Update konten halaman
        document.getElementById('product-title').textContent = product.title;
        document.getElementById('product-price').textContent = product.price;
        document.getElementById('product-full-description').textContent = product.fullDescription;
        const specsContainer = document.getElementById('product-specs');
        specsContainer.innerHTML = ''; // Clear existing content
        
        // Create list for specs
        const ul = document.createElement('ul');
        ul.className = 'specs-list';
        
        product.specs.forEach(spec => {
            const li = document.createElement('li');
            li.textContent = spec;
            ul.appendChild(li);
        });
        
        specsContainer.appendChild(ul);
        // Update badge
        const productBadge = document.getElementById('product-badge');
        productBadge.textContent = product.category === 'top' ? 'Top' : 
                              product.category === 'kerpus' ? 'Kerpus' : 
                              product.category === 'kw1' ? 'kw1' : 'kw2';
        productBadge.classList.add('product-badge', `badge-${product.category}`);
        
        // Update WhatsApp link
        function updateWhatsAppOrder() {
            const selectedColor = document.querySelector('.color-box.active .color-name').textContent;
            const quantity = document.getElementById('product-qty').value;
            
            const message = `Halo, saya ingin memesan:\n\n` +
                           `Produk: ${product.title}\n` +
                           `Warna: ${selectedColor}\n` +
                           `Jumlah: ${quantity} buah\n\n` +
                           `Apakah masih tersedia?`;
            
            const waButton = document.getElementById('whatsapp-order-button');
            waButton.href = `https://wa.me/6285282214033?text=${encodeURIComponent(message)}`;
        }

        // Update link WhatsApp pertama kali
        updateWhatsAppOrder();
         // Tambahkan event untuk warna
        document.querySelectorAll('.color-box').forEach(box => {
            box.addEventListener('click', updateWhatsAppOrder);
        });

        // Tambahkan event untuk jumlah
        document.getElementById('increase-qty').addEventListener('click', updateWhatsAppOrder);
        document.getElementById('decrease-qty').addEventListener('click', updateWhatsAppOrder);
        document.getElementById('product-qty').addEventListener('change', updateWhatsAppOrder);
        
        // Set gambar utama
        mainImage.src = productImages[0];
        
        // Bersihkan thumbnail dan dot yang ada
        thumbnailsContainer.innerHTML = '';
        dotsContainer.innerHTML = '';
        
        // Buat thumbnail dan dot indicator
        productImages.forEach((img, index) => {
            // Buat thumbnail
            const thumb = document.createElement('div');
            thumb.className = `thumbnail ${index === 0 ? 'active' : ''}`;
            thumb.dataset.image = img;
            
            const thumbImg = document.createElement('img');
            thumbImg.src = img;
            thumbImg.alt = `Thumbnail ${index + 1}`;
            
            thumb.appendChild(thumbImg);
            thumb.addEventListener('click', () => changeMainImage(index));
            thumbnailsContainer.appendChild(thumb);
            
            // Buat dot indicator
            const dot = document.createElement('span');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => changeMainImage(index));
            dotsContainer.appendChild(dot);
        });
    }

    // Fungsi untuk mengubah gambar utama
    function changeMainImage(index) {
        if (index < 0 || index >= productImages.length) return;
        
        mainImage.src = productImages[index];
        currentImageIndex = index;
        
        // Update active thumbnail
        document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
        
        // Update active dot
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    // Scroll buttons
    scrollLeftBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + productImages.length) % productImages.length;
        changeMainImage(currentImageIndex);
    });
    
    scrollRightBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % productImages.length;
        changeMainImage(currentImageIndex);
    });
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + imageSources.length) % imageSources.length;
            changeMainImage(currentImageIndex);
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % imageSources.length;
            changeMainImage(currentImageIndex);
        }
    });
    
    // Fungsi untuk menangani pemilihan warna
    document.querySelectorAll('.color-box').forEach(colorBox => {
        colorBox.addEventListener('click', function() {
            if (!this.classList.contains('active') && !this.querySelector('.color-name').classList.contains('unavailable')) {
                document.querySelectorAll('.color-box').forEach(cb => {
                    cb.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Fungsi untuk mengatur jumlah produk (per 100)
    document.getElementById('increase-qty').addEventListener('click', function() {
        const qtyInput = document.getElementById('product-qty');
        qtyInput.value = parseInt(qtyInput.value) + 10;
    });
    
    document.getElementById('decrease-qty').addEventListener('click', function() {
        const qtyInput = document.getElementById('product-qty');
        if (parseInt(qtyInput.value) > 100) {
            qtyInput.value = parseInt(qtyInput.value) - 100;
        }
    });
    
    // Validasi input manual
    document.getElementById('product-qty').addEventListener('change', function() {
        let value = parseInt(this.value);
        if (isNaN(value) || value < 1000) {
            value = 1000;
        } else {
            // Round to nearest 100
            value = Math.round(value / 100) * 100;
        }
        this.value = value;
    });
    
    // Thumbnail scroll (untuk mobile)
    let isDragging = false;
    let startX, scrollLeft;
    
    thumbnailContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - thumbnailContainer.offsetLeft;
        scrollLeft = thumbnailContainer.scrollLeft;
    });
    
    thumbnailContainer.addEventListener('mouseleave', () => {
        isDragging = false;
    });
    
    thumbnailContainer.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    thumbnailContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - thumbnailContainer.offsetLeft;
        const walk = (x - startX) * 2;
        thumbnailContainer.scrollLeft = scrollLeft - walk;
    });
});
