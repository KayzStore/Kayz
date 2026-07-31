// ===== Kayz Store — script.js =====

// --- Product tabs ---
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    const content = document.getElementById('content-' + target);
    if (content) content.classList.add('active');
  });
});

// --- FAQ accordion ---
document.querySelectorAll('.faq-item').forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// --- Payment / contact modal ---
const paymentModal = document.getElementById('paymentModal');
const productNameEl = document.getElementById('productName');
const productPriceEl = document.getElementById('productPrice');
const waModalBtn = document.getElementById('waModalBtn');
const WA_NUMBER = '6285126053305';

function openPaymentModal(name, price) {
  productNameEl.textContent = name || 'Produk';
  productPriceEl.textContent = price ? ('Rp ' + price) : 'Silakan hubungi kami untuk melanjutkan';
  const message = encodeURIComponent(
    'Halo min, saya mau tanya/order produk: ' + name + (price ? (' (Rp ' + price + ')') : '')
  );
  waModalBtn.href = 'https://wa.me/' + WA_NUMBER + '?text=' + message;
  paymentModal.classList.add('open');
}

function closePaymentModal() {
  paymentModal.classList.remove('open');
}

document.querySelectorAll('.product-item[data-name]').forEach(item => {
  item.addEventListener('click', () => {
    openPaymentModal(item.dataset.name, item.dataset.price);
  });
});

paymentModal.addEventListener('click', e => {
  if (e.target === paymentModal) closePaymentModal();
});

// expose for inline onclick on the close button
window.closePaymentModal = closePaymentModal;

// legacy helper kept for compatibility with any inline onclick="openWhatsAppGroup()"
window.openWhatsAppGroup = function () {
  window.open('https://wa.me/' + WA_NUMBER, '_blank');
};

// --- Floating chat toggle ---
const chatContainer = document.querySelector('.chat-owner-container');
const chatBtn = document.querySelector('.chat-owner-btn');
if (chatBtn) {
  chatBtn.addEventListener('click', () => {
    chatContainer.classList.toggle('open');
  });
}

// --- Mobile nav toggle ---
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    navMenu.style.flexDirection = 'column';
    navMenu.style.position = 'absolute';
    navMenu.style.top = '64px';
    navMenu.style.left = '0';
    navMenu.style.right = '0';
    navMenu.style.background = '#0b0b14';
    navMenu.style.padding = '20px 24px';
    navMenu.style.gap = '16px';
    navMenu.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
  });
}
