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

// ===== INTERACTIVE PARTICLES =====
// Warna partikel: pink, ungu, hitam, putih
const particleColors = ['#E91E63', '#9C27B0', '#2D2D2D', '#FFFFFF'];

// Partikel saat mouse move
let lastMouseMoveTime = 0;
const mouseMoveThrottle = 50; // milliseconds

document.addEventListener('mousemove', function(e) {
    const now = Date.now();
    if (now - lastMouseMoveTime < mouseMoveThrottle) return;
    lastMouseMoveTime = now;
    
    createMouseParticle(e.clientX, e.clientY);
});

function createMouseParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'interactive-particle';
    
    // Random size between 4-10px
    const size = Math.random() * 6 + 4;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random color from array
    const color = particleColors[Math.floor(Math.random() * particleColors.length)];
    particle.style.backgroundColor = color;
    particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
    
    // Position
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    // Random movement direction
    const tx = (Math.random() - 0.5) * 100;
    const ty = (Math.random() - 0.5) * 100;
    particle.style.setProperty('--tx', tx + 'px');
    particle.style.setProperty('--ty', ty + 'px');
    
    document.body.appendChild(particle);
    
    // Remove after animation
    setTimeout(() => {
        particle.remove();
    }, 1500);
}

// Partikel explosion saat click
document.addEventListener('click', function(e) {
    createClickExplosion(e.clientX, e.clientY);
});

function createClickExplosion(x, y) {
    // Create multiple particles in burst
    const particleCount = 12;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'click-particle';
        
        // Random size between 6-14px
        const size = Math.random() * 8 + 6;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random color from array
        const color = particleColors[Math.floor(Math.random() * particleColors.length)];
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
        
        // Position
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        // Spread particles in circle
        const angle = (i / particleCount) * Math.PI * 2;
        const distance = 50 + Math.random() * 30;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        
        document.body.appendChild(particle);
        
        // Remove after animation
        setTimeout(() => {
            particle.remove();
        }, 800);
    }
}

// Touch support for mobile
document.addEventListener('touchmove', function(e) {
    const now = Date.now();
    if (now - lastMouseMoveTime < mouseMoveThrottle) return;
    lastMouseMoveTime = now;
    
    const touch = e.touches[0];
    createMouseParticle(touch.clientX, touch.clientY);
}, { passive: true });

document.addEventListener('touchstart', function(e) {
    const touch = e.touches[0];
    createClickExplosion(touch.clientX, touch.clientY);
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
