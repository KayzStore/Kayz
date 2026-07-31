// ===== Kayz Store — script.js =====
// Renders products & contact info from data.js (window.KAYZ_DEFAULT_DATA),
// merged with any edits saved by admin.html (stored in localStorage under KAYZ_OVERRIDES_KEY).

const KAYZ_OVERRIDES_KEY = 'kayzStoreOverrides';

function kayzGetOverrides() {
  try {
    const raw = localStorage.getItem(KAYZ_OVERRIDES_KEY);
    return raw ? JSON.parse(raw) : { contact: {}, items: {} };
  } catch (e) {
    return { contact: {}, items: {} };
  }
}

function kayzGetEffectiveData() {
  const base = window.KAYZ_DEFAULT_DATA;
  const overrides = kayzGetOverrides();

  const contact = Object.assign({}, base.contact, overrides.contact || {});

  const categories = base.categories.map(cat => ({
    ...cat,
    products: cat.products.map(prod => ({
      ...prod,
      blocks: prod.blocks.map(block => ({
        ...block,
        items: block.items.map(item => {
          const ov = (overrides.items || {})[item.id];
          return ov ? { ...item, ...ov } : item;
        })
      }))
    }))
  }));

  return { contact, categories };
}

function esc(str) {
  const div = document.createElement('div');
  div.textContent = str == null ? '' : String(str);
  return div.innerHTML;
}

function renderProductCard(prod) {
  let body = '<div class="product-list">';
  let hasContent = false;

  prod.blocks.forEach(block => {
    if (block.header) {
      body += `<div class="product-group-label">${esc(block.header)}</div>`;
    }
    block.items.forEach(item => {
      if (item.type === 'price') {
        const dataName = esc(`${prod.title} - ${item.name}`);
        body += `<div class="product-item" data-name="${dataName}" data-price="${esc(item.price)}">
          <div class="product-info"><h4>${esc(item.name)}</h4><p>Rp ${esc(item.price)}</p></div>
          <span class="product-arrow">→</span></div>`;
        hasContent = true;
      } else if (item.type === 'link') {
        body += `<a class="product-item product-link" href="${esc(item.link)}" target="_blank" rel="noopener">
          <div class="product-info"><h4>${esc(item.name)}</h4><p>${esc(item.link)}</p></div>
          <span class="product-arrow">↗</span></a>`;
        hasContent = true;
      } else if (item.type === 'tag') {
        body += `<div class="product-tag">☆ ${esc(item.text)}</div>`;
      } else if (item.type === 'text') {
        const dataName = esc(`${prod.title} - ${item.text}`);
        body += `<div class="product-item" data-name="${dataName}" data-price="Tanya admin">
          <div class="product-info"><h4>${esc(item.text)}</h4></div>
          <span class="product-arrow">→</span></div>`;
        hasContent = true;
      }
    });
  });
  body += '</div>';

  if (!hasContent) {
    body = '<div class="product-list"><p class="product-empty">Tanya admin langsung untuk detail produk ini.</p></div>';
  }

  let notesHtml = '';
  if (prod.notes && prod.notes.length) {
    notesHtml = `<div class="product-notes"><h5>Catatan</h5><ul>${prod.notes.map(n => `<li>${esc(n)}</li>`).join('')}</ul></div>`;
  }

  return `<div class="package-card">
    <div class="package-header"><h3>${esc(prod.title)}</h3></div>
    ${body}
    ${notesHtml}
  </div>`;
}

function renderProducts() {
  const data = kayzGetEffectiveData();
  const tabsEl = document.getElementById('packageTabs');
  const contentsEl = document.getElementById('packageContents');
  if (!tabsEl || !contentsEl) return;

  let tabsHtml = '';
  let contentsHtml = '';

  data.categories.forEach((cat, i) => {
    const active = i === 0 ? ' active' : '';
    tabsHtml += `<button class="tab-btn${active}" data-tab="${cat.id}">${esc(cat.label)}</button>`;
    const cards = cat.products.map(renderProductCard).join('');
    contentsHtml += `<div id="content-${cat.id}" class="tab-content${active}"><div class="packages-grid">${cards}</div></div>`;
  });

  tabsEl.innerHTML = tabsHtml;
  contentsEl.innerHTML = contentsHtml;

  // Wire up tab switching
  tabsEl.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabsEl.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      contentsEl.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const content = document.getElementById('content-' + target);
      if (content) content.classList.add('active');
    });
  });

  // Wire up product item clicks -> modal
  contentsEl.querySelectorAll('.product-item[data-name]').forEach(item => {
    item.addEventListener('click', () => {
      openPaymentModal(item.dataset.name, item.dataset.price);
    });
  });
}

function renderContact() {
  const data = kayzGetEffectiveData();
  const c = data.contact;
  const waLink = 'https://wa.me/' + c.whatsapp;

  const chatAdminBtn = document.getElementById('chatAdminBtn');
  if (chatAdminBtn) chatAdminBtn.href = waLink;

  const waGroupLink = document.getElementById('waGroupLink');
  if (waGroupLink) waGroupLink.href = c.waGroup;

  const waChannelLink = document.getElementById('waChannelLink');
  if (waChannelLink) waChannelLink.href = c.waChannel;

  const igLink = document.getElementById('igLink');
  if (igLink) igLink.href = c.instagram;

  const fbLink = document.getElementById('fbLink');
  if (fbLink) fbLink.href = c.facebook;

  const floatWaBtn = document.getElementById('floatWaBtn');
  if (floatWaBtn) floatWaBtn.href = waLink;

  const floatTgBtn = document.getElementById('floatTgBtn');
  if (floatTgBtn) floatTgBtn.href = c.telegram;

  const waModalBtn = document.getElementById('waModalBtn');
  if (waModalBtn) waModalBtn.href = waLink;
}

// --- FAQ accordion ---
function wireFaq() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// --- Payment / contact modal ---
let paymentModal, productNameEl, productPriceEl, waModalBtn;

function openPaymentModal(name, price) {
  const data = kayzGetEffectiveData();
  productNameEl.textContent = name || 'Produk';
  productPriceEl.textContent = price ? ('Rp ' + price) : 'Silakan hubungi kami untuk melanjutkan';
  const message = encodeURIComponent(
    'Halo min, saya mau tanya/order produk: ' + name + (price ? (' (Rp ' + price + ')') : '')
  );
  waModalBtn.href = 'https://wa.me/' + data.contact.whatsapp + '?text=' + message;
  paymentModal.classList.add('open');
}

function closePaymentModal() {
  paymentModal.classList.remove('open');
}
window.closePaymentModal = closePaymentModal;

// legacy helper kept for compatibility with any inline onclick="openWhatsAppGroup()"
window.openWhatsAppGroup = function () {
  const data = kayzGetEffectiveData();
  window.open('https://wa.me/' + data.contact.whatsapp, '_blank');
};

document.addEventListener('DOMContentLoaded', () => {
  paymentModal = document.getElementById('paymentModal');
  productNameEl = document.getElementById('productName');
  productPriceEl = document.getElementById('productPrice');
  waModalBtn = document.getElementById('waModalBtn');

  renderContact();
  renderProducts();
  wireFaq();

  paymentModal.addEventListener('click', e => {
    if (e.target === paymentModal) closePaymentModal();
  });

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
      const isShown = navMenu.style.display === 'flex';
      navMenu.style.display = isShown ? 'none' : 'flex';
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
});
