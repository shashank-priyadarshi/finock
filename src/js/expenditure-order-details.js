const ORDERS = [
  { number: 'EX-2024-01', title: 'Departmental Expenditure', date: '2024-01-12', summary: 'Expenditure details for Q1 2024.', pdf: '../pdfs/exp1.pdf' },
];

function getOrder() {
  const params = new URLSearchParams(window.location.search);
  return params.get('order') ? decodeURIComponent(params.get('order')) : '';
}

document.addEventListener('DOMContentLoaded', async function() {
  await loadPDFConfig();
  const params = new URLSearchParams(window.location.search);
  const orderNum = params.get('order') ? decodeURIComponent(params.get('order')) : '';
  const order = PDF_CONFIG.find(o => o.number === orderNum && o.tags.includes('expenditure'));
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
