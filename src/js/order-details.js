const ORDERS = [
  { number: 'BO-2024-01', title: 'Budget 2024 Allocation', date: '2024-04-01', summary: 'Annual budget allocation for FY 2024-25.', pdf: '../pdfs/budget1.pdf' },
  { number: 'BO-2024-02', title: 'Supplementary Grant', date: '2024-05-15', summary: 'Supplementary grant for infrastructure projects.', pdf: '../pdfs/budget2.pdf' },
  { number: 'TX-2024-01', title: 'GST Amendment', date: '2024-03-10', summary: 'Amendment to GST rates for select goods.', pdf: '../pdfs/tax1.pdf' },
  { number: 'TX-2024-02', title: 'Income Tax Slab Revision', date: '2024-02-20', summary: 'Revision of income tax slabs for FY 2024-25.', pdf: '../pdfs/tax2.pdf' },
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
