// Fungsi untuk menangani perubahan thumbnail dan scroll gambar
document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-product-image');
    const dots = document.querySelectorAll('.dot');
    const scrollLeftBtn = document.querySelector('.left-scroll');
    const scrollRightBtn = document.querySelector('.right-scroll');
    const thumbnailContainer = document.querySelector('.thumbnail-container');
    
    let currentImageIndex = 0;
    const imageSources = [
        'https://via.placeholder.com/800x500/ECF0F1/555555?text=Genteng+Premium',
        'https://via.placeholder.com/800x500/ECF0F1/555555?text=Detail+Produk',
        'https://via.placeholder.com/800x500/ECF0F1/555555?text=Warna+Brown',
        'https://via.placeholder.com/800x500/ECF0F1/555555?text=Warna+Transparan'
    ];
    
    // Fungsi untuk mengubah gambar utama
    function changeMainImage(index) {
        mainImage.src = imageSources[index];
        currentImageIndex = index;
        
        // Update active thumbnail
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
        
        // Update active dot
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    // Klik thumbnail
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            changeMainImage(index);
        });
    });
    
    // Klik dot indicator
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            changeMainImage(index);
        });
    });
    
    // Scroll buttons
    scrollLeftBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + imageSources.length) % imageSources.length;
        changeMainImage(currentImageIndex);
    });
    
    scrollRightBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % imageSources.length;
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
        qtyInput.value = parseInt(qtyInput.value) + 100;
    });
    
    document.getElementById('decrease-qty').addEventListener('click', function() {
        const qtyInput = document.getElementById('product-qty');
        if (parseInt(qtyInput.value) > 1000) {
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
