(() => {
  const root = document.documentElement;
  const saved = localStorage.getItem('tahapc-theme');
  if (saved === 'light' || saved === 'dark') root.dataset.theme = saved;
  const toggle = document.querySelector('.theme-toggle');
  const updateIcon = () => { if (toggle) { const light = root.dataset.theme === 'light'; toggle.textContent = light ? '☾' : '☀'; toggle.setAttribute('aria-label', light ? 'فعال‌کردن تم تاریک' : 'فعال‌کردن تم روشن'); } };
  updateIcon();
  toggle?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('tahapc-theme', root.dataset.theme);
    updateIcon();
  });
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  menuButton?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  const form = document.querySelector('#requestForm');
  form?.addEventListener('submit', async e => {
    e.preventDefault();
    const d = new FormData(form);
    const message = ['درخواست از وب‌سایت TahaPC',`نام: ${d.get('name')}`,`شماره تماس: ${d.get('phone')}`,`نوع درخواست: ${d.get('type')}`,`توضیحات: ${d.get('details') || '—'}`].join('\\n');
    const status = document.querySelector('#formStatus');
    try { await navigator.clipboard.writeText(message); status.textContent = 'متن درخواست کپی شد؛ آن را در پیام‌رسان موردنظر ارسال کنید.'; }
    catch { status.textContent = 'کپی خودکار ممکن نبود؛ اطلاعات فرم را دستی کپی کنید.'; }
  });
})();