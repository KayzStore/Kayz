// ========================================
// KONFIGURASI NOMOR - UBAH DI SINI SAJA!
// ========================================
const WHATSAPP_NUMBER = '6285126053305'; // Format: 62xxxxxxxxxx (pakai kode negara 62, tanpa +)
const DANA_NUMBER = '6285126053305'; // Format: 08xxxxxxxxxx

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

// ===== SIMPLE PARTICLES - GAME STYLE =====
// Trail putih saat geser mouse (seperti melukis)
let lastTrailTime = 0;
const trailThrottle = 15; // Very smooth

document.addEventListener('mousemove', function(e) {
    const now = Date.now();
    if (now - lastTrailTime < trailThrottle) return;
    lastTrailTime = now;
    
    createMouseTrail(e.clientX, e.clientY);
});

function createMouseTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
    document.body.appendChild(trail);
    
    setTimeout(() => trail.remove(), 500);
}

// Click - Sparkle bintang PUTIH meledak (seperti di gambar)
document.addEventListener('click', function(e) {
    if (e.target.closest('button, a, .payment-btn, .product-item, .tab-btn')) return;
    
    createSparkleExplosion(e.clientX, e.clientY);
});

function createSparkleExplosion(x, y) {
    // 8-12 bintang sparkle putih
    const sparkleCount = 8 + Math.floor(Math.random() * 5);
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle-star';
        
        // Bintang putih
        const size = 14 + Math.random() * 10;
        sparkle.innerHTML = '✨';
        sparkle.style.fontSize = size + 'px';
        sparkle.style.filter = 'brightness(2)'; // Extra bright
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        
        // Meledak ke segala arah
        const angle = (i / sparkleCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
        const distance = 40 + Math.random() * 60;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        sparkle.style.setProperty('--tx', tx + 'px');
        sparkle.style.setProperty('--ty', ty + 'px');
        
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }
    
    // Flash putih di center
    const flash = document.createElement('div');
    flash.className = 'click-flash';
    flash.style.left = x + 'px';
    flash.style.top = y + 'px';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 400);
}

// Touch support
let lastTouchMoveTime = 0;
document.addEventListener('touchmove', function(e) {
    const now = Date.now();
    if (now - lastTouchMoveTime < 20) return;
    lastTouchMoveTime = now;
    
    const touch = e.touches[0];
    createMouseTrail(touch.clientX, touch.clientY);
}, { passive: true });

document.addEventListener('touchstart', function(e) {
    const touch = e.touches[0];
    if (e.target.closest('button, a, .payment-btn, .product-item, .tab-btn')) return;
    
    createSparkleExplosion(touch.clientX, touch.clientY);
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
