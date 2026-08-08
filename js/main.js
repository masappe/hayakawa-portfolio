// ===== ナビゲーション =====
const header = document.getElementById('header');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== フェードインアニメーション =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ===== 機能比較表アコーディオン =====
document.querySelectorAll('.fmap-table tbody tr[data-desc]').forEach(tr => {
  const td = tr.querySelector('td.fmap-clickable');
  if (!td) return;
  const desc = tr.getAttribute('data-desc');
  const detailRow = document.createElement('tr');
  detailRow.className = 'fmap-detail-row';
  detailRow.innerHTML = `<td colspan="6"><div class="fmap-detail-inner"><div class="fmap-detail-text">${desc}</div></div></td>`;
  tr.after(detailRow);
  td.addEventListener('click', () => {
    const isOpen = detailRow.classList.contains('open');
    detailRow.classList.toggle('open', !isOpen);
    td.querySelector('.fmap-chevron').style.transform = isOpen ? '' : 'rotate(180deg)';
    td.querySelector('.fmap-chevron').style.opacity = isOpen ? '0.5' : '0.8';
  });
});

// ===== フォーム送信フィードバック =====
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    const btn = form.querySelector('.form-submit');
    btn.textContent = '送信中...';
    btn.disabled = true;
  });
}
