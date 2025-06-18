const ORDERS = {
  'Budget Orders': [
    { number: 'BO-2024-01', title: 'Budget 2024 Allocation', date: '2024-04-01', summary: 'Annual budget allocation for FY 2024-25.', pdf: 'pdfs/budget1.pdf' },
    { number: 'BO-2024-02', title: 'Supplementary Grant', date: '2024-05-15', summary: 'Supplementary grant for infrastructure projects.', pdf: 'pdfs/budget2.pdf' },
  ],
  'Taxation': [
    { number: 'TX-2024-01', title: 'GST Amendment', date: '2024-03-10', summary: 'Amendment to GST rates for select goods.', pdf: 'pdfs/tax1.pdf' },
    { number: 'TX-2024-02', title: 'Income Tax Slab Revision', date: '2024-02-20', summary: 'Revision of income tax slabs for FY 2024-25.', pdf: 'pdfs/tax2.pdf' },
  ],
  'Expenditure': [
    { number: 'EX-2024-01', title: 'Departmental Expenditure', date: '2024-01-12', summary: 'Expenditure details for Q1 2024.', pdf: 'pdfs/exp1.pdf' },
  ]
};

function getSection() {
  const params = new URLSearchParams(window.location.search);
  return params.get('section') ? decodeURIComponent(params.get('section')) : '';
}

function renderOrders(orders) {
  const list = document.getElementById('orders-list');
  list.innerHTML = '';
  if (!orders.length) {
    list.innerHTML = '<li>No orders found.</li>';
    return;
  }
  orders.forEach(order => {
    const li = document.createElement('li');
    li.className = 'order-list-item';
    li.innerHTML = `<div class="order-title">${order.title}</div>
      <div class="order-meta">${order.date} | ${order.number}</div>
      <div class="order-summary">${order.summary}</div>`;
    li.setAttribute('data-order', order.number);
    li.addEventListener('click', function() {
      window.location.href = `order-details.html?order=${encodeURIComponent(order.number)}`;
    });
    list.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const section = getSection();
  document.getElementById('section-title').textContent = section;
  let orders = ORDERS[section] || [];

  function filterOrders() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const start = document.getElementById('start-date').value;
    const end = document.getElementById('end-date').value;
    let filtered = orders.filter(order => {
      let matches = true;
      if (query && !(order.title.toLowerCase().includes(query) || order.number.toLowerCase().includes(query) || order.summary.toLowerCase().includes(query))) {
        matches = false;
      }
      if (start && order.date < start) matches = false;
      if (end && order.date > end) matches = false;
      return matches;
    });
    renderOrders(filtered);
  }

  document.getElementById('search-bar').addEventListener('input', filterOrders);
  document.getElementById('start-date').addEventListener('change', filterOrders);
  document.getElementById('end-date').addEventListener('change', filterOrders);

  renderOrders(orders);
});
