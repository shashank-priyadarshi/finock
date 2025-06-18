const ORDERS = [
  { number: 'EX-2024-01', title: 'Departmental Expenditure', date: '2024-01-12', summary: 'Expenditure details for Q1 2024.', pdf: '../pdfs/exp1.pdf' },
];

function getOrder() {
  const params = new URLSearchParams(window.location.search);
  return params.get('order') ? decodeURIComponent(params.get('order')) : '';
}

document.addEventListener('DOMContentLoaded', function() {
  const orderNum = getOrder();
  const order = ORDERS.find(o => o.number === orderNum);
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
