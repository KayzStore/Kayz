// ========================================
// KONFIGURASI NOMOR - UBAH DI SINI SAJA!
// ========================================
const WHATSAPP_NUMBER = '6285126053305'; // Format: 62xxxxxxxxxx (pakai kode negara 62, tanpa +)
const DANA_NUMBER = '081230637481'; // Format: 08xxxxxxxxxx

// Tab Switching Functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(`content-${targetTab}`).classList.add('active');
        });
    });
});

// Payment Modal Functions
let currentProduct = '';
let currentPrice = '';

function openPaymentModal(productName, price) {
    currentProduct = productName;
    currentPrice = price;
    
    document.getElementById('productName').textContent = productName;
    document.getElementById('paymentModal').classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Update WhatsApp links dengan nama produk
    const encodedProduct = encodeURIComponent(productName);
    const waMessage = `Halo%20Admin,%20saya%20sudah%20melakukan%20pembayaran%20untuk%20produk%20*${encodedProduct}*`;
    const whatsappLinks = document.querySelectorAll('.whatsapp-btn');
    whatsappLinks.forEach(link => {
        link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;
    });
    
    // Reset payment details
    document.getElementById('paymentMethods').style.display = 'grid';
    document.getElementById('danaDetail').classList.remove('active');
    document.getElementById('qrisDetail').classList.remove('active');
}

function closePaymentModal() {
    document.getElementById('paymentModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function showPaymentDetail(method) {
    document.getElementById('paymentMethods').style.display = 'none';
    
    if (method === 'dana') {
        document.getElementById('danaDetail').classList.add('active');
    } else if (method === 'qris') {
        document.getElementById('qrisDetail').classList.add('active');
    }
}

function copyDana() {
    // Fallback method untuk browser yang tidak support clipboard API
    const textArea = document.createElement('textarea');
    textArea.value = DANA_NUMBER;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
            // Change button text temporarily
            const btn = event.target;
            const originalText = btn.textContent;
            btn.textContent = '✅ Tersalin: ' + DANA_NUMBER;
            btn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)';
            }, 2000);
        } else {
            alert('Nomor DANA: ' + DANA_NUMBER + '\nSilakan salin manual');
        }
    } catch (err) {
        document.body.removeChild(textArea);
        alert('Nomor DANA: ' + DANA_NUMBER + '\nSilakan salin manual');
    }
}

function downloadQris() {
    const qrisImg = document.getElementById('qrisImg');
    const link = document.createElement('a');
    link.href = qrisImg.src;
    link.download = 'QRIS_KayzStore.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Change button text temporarily
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✅ Berhasil Download!';
    btn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = 'linear-gradient(135deg, #9C27B0 0%, #673AB7 100%)';
    }, 2000);
}

// Close modal when clicking outside
document.getElementById('paymentModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closePaymentModal();
    }
});

// FAQ Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 30px rgba(233, 30, 99, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(233, 30, 99, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Update WhatsApp link di footer saat halaman load
document.addEventListener('DOMContentLoaded', function() {
    const footerWaLink = document.querySelector('.footer-social a[aria-label="WhatsApp"]');
    if (footerWaLink) {
        footerWaLink.href = `https://wa.me/${WHATSAPP_NUMBER}`;
    }
});

// ===== EPIC INTERACTIVE PARTICLES =====
// Warna pelangi untuk partikel
const rainbowColors = [
    '#FF1493', // Hot Pink
    '#E91E63', // Pink
    '#9C27B0', // Purple
    '#673AB7', // Deep Purple
    '#3F51B5', // Indigo
    '#2196F3', // Blue
    '#00BCD4', // Cyan
    '#00E676', // Green
    '#FFEB3B', // Yellow
    '#FF9800', // Orange
    '#FF5722', // Red-Orange
    '#FFFFFF'  // White
];

// Mouse trail dengan garis putih + partikel pelangi
let lastTrailTime = 0;
const trailThrottle = 20; // Sangat cepat untuk trail smooth

document.addEventListener('mousemove', function(e) {
    const now = Date.now();
    if (now - lastTrailTime < trailThrottle) return;
    lastTrailTime = now;
    
    createMouseTrail(e.clientX, e.clientY);
});

function createMouseTrail(x, y) {
    // Garis putih trail
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
    document.body.appendChild(trail);
    
    setTimeout(() => trail.remove(), 600);
    
    // Partikel pelangi kecil di sekitar trail (random spawn)
    if (Math.random() > 0.6) { // 40% chance
        createRainbowParticle(x, y);
    }
    
    // Sparkle bintang sesekali saat geser
    if (Math.random() > 0.95) { // 5% chance - rare
        createSparkle(x, y, 1); // 1 sparkle
    }
}

function createRainbowParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'rainbow-particle';
    
    // Random rainbow color
    const color = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
    particle.style.backgroundColor = color;
    particle.style.boxShadow = `0 0 8px ${color}`;
    
    // Position dengan offset
    const offsetX = (Math.random() - 0.5) * 15;
    const offsetY = (Math.random() - 0.5) * 15;
    particle.style.left = (x + offsetX) + 'px';
    particle.style.top = (y + offsetY) + 'px';
    
    // Float movement
    const tx = (Math.random() - 0.5) * 30;
    const ty = (Math.random() - 0.5) * 30;
    particle.style.setProperty('--tx', tx + 'px');
    particle.style.setProperty('--ty', ty + 'px');
    
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 800);
}

// Sparkle star effect
function createSparkle(x, y, count = 1) {
    for (let i = 0; i < count; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle-particle';
        sparkle.innerHTML = '✨'; // Emoji sparkle
        sparkle.style.fontSize = (12 + Math.random() * 8) + 'px';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        
        // Random movement
        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 40;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        sparkle.style.setProperty('--tx', tx + 'px');
        sparkle.style.setProperty('--ty', ty + 'px');
        
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }
}

// EPIC CLICK EXPLOSION - Bintang meledak seperti di game!
document.addEventListener('click', function(e) {
    // Jangan ganggu button/link
    if (e.target.closest('button, a, .payment-btn, .product-item')) return;
    
    createStarExplosion(e.clientX, e.clientY);
});

function createStarExplosion(x, y) {
    // Jumlah bintang yang meledak: 15-20 (LEBIH BANYAK!)
    const starCount = 15 + Math.floor(Math.random() * 6);
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star-explosion';
        
        // Berbagai jenis bintang
        const starTypes = ['✨', '⭐', '🌟', '💫', '⚡', '💥', '✦', '★'];
        star.innerHTML = starTypes[Math.floor(Math.random() * starTypes.length)];
        
        // Size random
        const size = 14 + Math.random() * 12;
        star.style.fontSize = size + 'px';
        
        // Random color dari rainbow
        const color = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
        star.style.color = color;
        star.style.textShadow = `0 0 ${size}px ${color}, 0 0 ${size * 2}px ${color}`;
        
        // Position
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        
        // Explosion spread - meledak ke segala arah!
        const angle = (i / starCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const distance = 60 + Math.random() * 80;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        star.style.setProperty('--tx', tx + 'px');
        star.style.setProperty('--ty', ty + 'px');
        
        document.body.appendChild(star);
        setTimeout(() => star.remove(), 1200);
    }
    
    // Tambahan: Flash putih di center
    createFlash(x, y);
}

function createFlash(x, y) {
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.left = x + 'px';
    flash.style.top = y + 'px';
    flash.style.width = '20px';
    flash.style.height = '20px';
    flash.style.background = 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)';
    flash.style.borderRadius = '50%';
    flash.style.transform = 'translate(-50%, -50%)';
    flash.style.pointerEvents = 'none';
    flash.style.zIndex = '9999';
    flash.style.animation = 'flashExpand 0.3s ease-out';
    
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 300);
}

// CSS untuk flash animation
const flashStyle = document.createElement('style');
flashStyle.textContent = `
@keyframes flashExpand {
    0% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(0);
    }
    50% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(3);
    }
    100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(5);
    }
}
`;
document.head.appendChild(flashStyle);

// Touch support - EPIC VERSION
let lastTouchMoveTime = 0;
document.addEventListener('touchmove', function(e) {
    const now = Date.now();
    if (now - lastTouchMoveTime < 30) return;
    lastTouchMoveTime = now;
    
    const touch = e.touches[0];
    createMouseTrail(touch.clientX, touch.clientY);
}, { passive: true });

document.addEventListener('touchstart', function(e) {
    const touch = e.touches[0];
    if (e.target.closest('button, a, .payment-btn, .product-item')) return;
    
    createStarExplosion(touch.clientX, touch.clientY);
}, { passive: true });

// Add CSS for tab content
const style = document.createElement('style');
style.textContent = `
    .tab-content {
        display: none;
    }
    .tab-content.active {
        display: block;
        animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
