// Requires js-yaml and pdfs.js

document.addEventListener('DOMContentLoaded', async function() {
  await loadPDFConfig();
  const params = new URLSearchParams(window.location.search);
  const orderNum = params.get('order') ? decodeURIComponent(params.get('order')) : '';
  const order = PDF_CONFIG.find(o => o.number === orderNum && o.tags.includes('tax'));
  if (!order) {
    document.querySelector('.order-details-container').innerHTML = '<p>Order not found.</p>';
    return;
  }
  document.getElementById('order-title').textContent = order.title;
  document.getElementById('order-date').textContent = order.date;
  document.getElementById('order-number').textContent = order.number;
  document.getElementById('order-size').textContent = order.pdf_size || '';
  document.getElementById('order-summary').textContent = order.summary;
  const btn = document.getElementById('show-pdf-link-btn');
  btn.addEventListener('click', function() {
    const linkPanel = document.getElementById('pdf-link-panel');
    const pdfLink = document.getElementById('pdf-link');
    pdfLink.href = getPDFPath(order);
    linkPanel.style.display = 'block';
  });
});
