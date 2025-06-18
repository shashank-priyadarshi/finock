// Requires js-yaml and pdfs.js

document.addEventListener('DOMContentLoaded', async function() {
  await loadPDFConfig();
  const params = new URLSearchParams(window.location.search);
  const orderNum = params.get('order') ? decodeURIComponent(params.get('order')) : '';
  const order = PDF_CONFIG.find(o => o.number === orderNum && o.tags.includes('budget'));
  if (!order) {
    document.querySelector('.order-details-container').innerHTML = '<p>Order not found.</p>';
    return;
  }
  document.getElementById('order-title').textContent = order.title;
  document.getElementById('order-date').textContent = order.date;
  document.getElementById('order-number').textContent = order.number;
  document.getElementById('order-summary').textContent = order.summary;
  const btn = document.getElementById('view-pdf-btn');
  btn.addEventListener('click', function() {
    document.getElementById('pdf-viewer').src = getPDFPath(order);
    document.getElementById('pdf-viewer-panel').style.display = 'block';
  });
});
