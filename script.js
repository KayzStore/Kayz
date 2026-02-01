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
    const whatsappLinks = document.querySelectorAll('.whatsapp-btn');
    whatsappLinks.forEach(link => {
        link.href = `https://wa.me/6285126053305?text=Halo%20Admin,%20saya%20sudah%20melakukan%20pembayaran%20untuk%20produk%20*${encodedProduct}*`;
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
    const danaNumber = '081230637481'; // Nomor tanpa format
    
    // Copy to clipboard
    navigator.clipboard.writeText(danaNumber).then(() => {
        // Change button text temporarily
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '✅ Tersalin!';
        btn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)';
        }, 2000);
    }).catch(err => {
        alert('Gagal menyalin. Silakan salin manual: ' + danaNumber);
    });
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
