const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('requestForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const message = [
    'درخواست از وب‌سایت TahaPC',
    `نام: ${form.get('name')}`,
    `شماره تماس: ${form.get('phone')}`,
    `نوع درخواست: ${form.get('type')}`,
    `توضیحات: ${form.get('details') || '—'}`
  ].join('\\n');
  try {
    await navigator.clipboard.writeText(message);
    document.getElementById('formStatus').textContent = 'متن درخواست کپی شد؛ آن را در پیام‌رسان موردنظر برای ما ارسال کنید.';
  } catch {
    document.getElementById('formStatus').textContent = 'مرورگر اجازه کپی خودکار نداد. لطفاً اطلاعات فرم را کپی و ارسال کنید.';
  }
});