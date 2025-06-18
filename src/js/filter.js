// Requires js-yaml and pdfs.js
function getTagForSection(section) {
  if (section === 'Budget Orders') return 'budget';
  if (section === 'Taxation') return 'tax';
  if (section === 'Expenditure') return 'expenditure';
  return null;
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
      <div class="order-meta">${order.date} | ${order.number} | ${order.section}</div>
      <div class="order-summary">${order.summary}</div>
      <button class="details-btn">Go to Details</button>`;
    li.querySelector('.details-btn').addEventListener('click', function() {
      let page = '';
      if (order.tags.includes('budget')) page = '../details/budget-order-details.html';
      else if (order.tags.includes('tax')) page = '../details/taxation-order-details.html';
      else if (order.tags.includes('expenditure')) page = '../details/expenditure-order-details.html';
      window.location.href = `${page}?order=${encodeURIComponent(order.number)}`;
    });
    list.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', async function() {
  await loadPDFConfig();
  function filterOrders() {
    const section = document.getElementById('section-select').value;
    const query = document.getElementById('search-bar').value.toLowerCase();
    const start = document.getElementById('start-date').value;
    const end = document.getElementById('end-date').value;
    let filtered = PDF_CONFIG.filter(order => {
      let matches = true;
      if (section) {
        const tag = getTagForSection(section);
        if (!order.tags.includes(tag)) matches = false;
      }
      if (query && !(order.title.toLowerCase().includes(query) || order.number.toLowerCase().includes(query) || order.summary.toLowerCase().includes(query))) matches = false;
      if (start && order.date < start) matches = false;
      if (end && order.date > end) matches = false;
      return matches;
    });
    renderOrders(filtered);
  }
  document.getElementById('section-select').addEventListener('change', filterOrders);
  document.getElementById('search-bar').addEventListener('input', filterOrders);
  document.getElementById('start-date').addEventListener('change', filterOrders);
  document.getElementById('end-date').addEventListener('change', filterOrders);
  renderOrders(PDF_CONFIG);
});
