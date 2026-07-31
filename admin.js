// ===== Kayz Store — admin.js =====
// NOTE: this is a static site with no backend. Auth here is a basic client-side
// gate (fine for keeping casual visitors out) — it is NOT real security, since
// anyone can view this file's source. Don't rely on it to protect sensitive data.

const ADMIN_PASSWORD = 'kayz2026'; // change this to your own password
const OVERRIDES_KEY = 'kayzStoreOverrides';
const AUTH_KEY = 'kayzStoreAdminAuthed';

const loginCard = document.getElementById('loginCard');
const adminShell = document.getElementById('adminShell');
const passwordInput = document.getElementById('passwordInput');
const loginBtn = document.getElementById('loginBtn');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const statusMsg = document.getElementById('statusMsg');

function getOverrides() {
  try {
    const raw = localStorage.getItem(OVERRIDES_KEY);
    return raw ? JSON.parse(raw) : { contact: {}, items: {} };
  } catch (e) {
    return { contact: {}, items: {} };
  }
}

function showStatus(text) {
  statusMsg.textContent = text;
  statusMsg.classList.add('show');
  setTimeout(() => statusMsg.classList.remove('show'), 4000);
}

// ---------- Auth ----------
function tryLogin() {
  if (passwordInput.value === ADMIN_PASSWORD) {
    sessionStorage.setItem(AUTH_KEY, '1');
    showDashboard();
  } else {
    loginError.textContent = 'Password salah, coba lagi.';
  }
}

loginBtn.addEventListener('click', tryLogin);
passwordInput.addEventListener('keydown', e => { if (e.key === 'Enter') tryLogin(); });

logoutBtn.addEventListener('click', () => {
  sessionStorage.removeItem(AUTH_KEY);
  adminShell.classList.remove('active');
  loginCard.style.display = 'block';
  passwordInput.value = '';
});

function showDashboard() {
  loginCard.style.display = 'none';
  adminShell.classList.add('active');
  buildForm();
}

if (sessionStorage.getItem(AUTH_KEY) === '1') {
  showDashboard();
}

// ---------- Build form ----------
function buildForm() {
  const base = window.KAYZ_DEFAULT_DATA;
  const overrides = getOverrides();

  // Contact fields
  const c = Object.assign({}, base.contact, overrides.contact || {});
  document.getElementById('contactWhatsapp').value = c.whatsapp || '';
  document.getElementById('contactTelegram').value = c.telegram || '';
  document.getElementById('contactInstagram').value = c.instagram || '';
  document.getElementById('contactFacebook').value = c.facebook || '';
  document.getElementById('contactWaGroup').value = c.waGroup || '';
  document.getElementById('contactWaChannel').value = c.waChannel || '';

  // Product sections grouped by category, collapsible
  const container = document.getElementById('productsSections');
  container.innerHTML = '';

  base.categories.forEach((cat, ci) => {
    const section = document.createElement('div');
    section.className = 'admin-section';

    const toggle = document.createElement('div');
    toggle.className = 'admin-category-toggle';
    toggle.innerHTML = `<h2 style="border:none;margin:0;padding:0;">${cat.label}</h2><span class="admin-arrow">▶</span>`;
    section.appendChild(toggle);

    const body = document.createElement('div');
    body.className = 'admin-category-body' + (ci === 0 ? ' open' : '');
    if (ci === 0) toggle.classList.add('open');

    cat.products.forEach(prod => {
      const block = document.createElement('div');
      block.className = 'admin-product-block';
      let html = `<h3>${prod.title}</h3>`;

      prod.blocks.forEach(b => {
        if (b.header) {
          html += `<div class="admin-item-tag">${b.header}</div>`;
        }
        b.items.forEach(item => {
          const ov = (overrides.items || {})[item.id] || {};
          if (item.type === 'price') {
            const name = ov.name != null ? ov.name : item.name;
            const price = ov.price != null ? ov.price : item.price;
            html += `<div class="admin-item-row">
              <input type="text" class="admin-input" data-item-id="${item.id}" data-field="name" value="${escAttr(name)}">
              <input type="text" class="admin-input" data-item-id="${item.id}" data-field="price" value="${escAttr(price)}">
            </div>`;
          } else if (item.type === 'link') {
            const name = ov.name != null ? ov.name : item.name;
            const link = ov.link != null ? ov.link : item.link;
            html += `<div class="admin-item-row">
              <input type="text" class="admin-input" data-item-id="${item.id}" data-field="name" value="${escAttr(name)}">
              <input type="text" class="admin-input" data-item-id="${item.id}" data-field="link" value="${escAttr(link)}">
            </div>`;
          } else if (item.type === 'text') {
            const text = ov.text != null ? ov.text : item.text;
            html += `<div class="admin-item-row" style="grid-template-columns:1fr;">
              <input type="text" class="admin-input" data-item-id="${item.id}" data-field="text" value="${escAttr(text)}">
            </div>`;
          } else if (item.type === 'tag') {
            html += `<div class="admin-item-tag">☆ ${item.text} <span style="opacity:.6">(badge, tidak diedit di sini)</span></div>`;
          }
        });
      });

      block.innerHTML = html;
      body.appendChild(block);
    });

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      body.classList.toggle('open');
    });

    section.appendChild(body);
    container.appendChild(section);
  });
}

function escAttr(str) {
  return String(str == null ? '' : str).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

// ---------- Collect current form values into an overrides object ----------
function collectOverrides() {
  const overrides = { contact: {}, items: {} };

  overrides.contact = {
    whatsapp: document.getElementById('contactWhatsapp').value.trim(),
    telegram: document.getElementById('contactTelegram').value.trim(),
    instagram: document.getElementById('contactInstagram').value.trim(),
    facebook: document.getElementById('contactFacebook').value.trim(),
    waGroup: document.getElementById('contactWaGroup').value.trim(),
    waChannel: document.getElementById('contactWaChannel').value.trim(),
  };

  document.querySelectorAll('#productsSections [data-item-id]').forEach(input => {
    const id = input.dataset.itemId;
    const field = input.dataset.field;
    if (!overrides.items[id]) overrides.items[id] = {};
    overrides.items[id][field] = input.value;
  });

  return overrides;
}

// ---------- Save (localStorage preview) ----------
document.getElementById('saveBtn').addEventListener('click', () => {
  const overrides = collectOverrides();
  localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides));
  showStatus('Tersimpan di browser ini. Buka/refresh index.html (di browser yang sama) untuk melihat preview.');
});

// ---------- Reset ----------
document.getElementById('resetBtn').addEventListener('click', () => {
  if (!confirm('Hapus semua perubahan yang tersimpan di browser ini dan kembali ke data default?')) return;
  localStorage.removeItem(OVERRIDES_KEY);
  buildForm();
  showStatus('Sudah direset ke data default.');
});

// ---------- Download updated data.js ----------
document.getElementById('downloadBtn').addEventListener('click', () => {
  const overrides = collectOverrides();
  const base = window.KAYZ_DEFAULT_DATA;

  const merged = {
    contact: Object.assign({}, base.contact, overrides.contact),
    categories: base.categories.map(cat => ({
      ...cat,
      products: cat.products.map(prod => ({
        ...prod,
        blocks: prod.blocks.map(b => ({
          ...b,
          items: b.items.map(item => {
            const ov = overrides.items[item.id];
            return ov ? { ...item, ...ov } : item;
          })
        }))
      }))
    }))
  };

  const js = '// Kayz Store — default site data (edited via admin.html)\nwindow.KAYZ_DEFAULT_DATA = ' + JSON.stringify(merged, null, 2) + ';\n';
  const blob = new Blob([js], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.js';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showStatus('data.js sudah didownload. Upload file ini ke hosting kamu untuk menerapkan perubahan ke semua pengunjung.');
});
