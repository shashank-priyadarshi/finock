// Requires js-yaml (https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.1.0/js-yaml.min.js)
let PDF_CONFIG = [];

async function loadPDFConfig() {
  if (PDF_CONFIG.length) return PDF_CONFIG;
  const res = await fetch('../config.yaml');
  const yamlText = await res.text();
  const config = jsyaml.load(yamlText);
  PDF_CONFIG = config.pdfs;
  return PDF_CONFIG;
}

function getOrdersByTag(tag) {
  return PDF_CONFIG.filter(o => o.tags.includes(tag));
}

function getOrderByNumberAndTag(number, tag) {
  return PDF_CONFIG.find(o => o.number === number && o.tags.includes(tag));
}

function getPDFPath(order) {
  // Config.yaml paths are relative to src/ directory
  // We need to adjust them based on current page location
  let pdfPath = order.pdf_path || order.pdf;
  
  // Get current page path to determine context
  const currentPath = window.location.pathname;
  
  // If we're in a subdirectory of src/, we need to go up one more level
  if (currentPath.includes('/pages/') || currentPath.includes('/details/') || currentPath.includes('/pdfviews/')) {
    // Config path is "../pdfs/file.pdf" (relative to src/)
    // From subdirectory, we need "../../pdfs/file.pdf" to reach root/pdfs/
    if (pdfPath.startsWith('../pdfs/')) {
      pdfPath = '../' + pdfPath; // Convert "../pdfs/" to "../../pdfs/"
    }
  }
  
  return pdfPath;
}

function renderOrderList(orders, container, detailsPage) {
  container.innerHTML = '';
  if (!orders.length) {
    container.innerHTML = '<li>No orders found.</li>';
    return;
  }
  orders.forEach(order => {
    const li = document.createElement('li');
    li.className = 'order-list-item';
    li.setAttribute('data-order', order.number);
    li.onclick = () => location.href = `../details/${detailsPage}?order=${encodeURIComponent(order.number)}`;
    li.innerHTML = `<div class='order-title'>${order.title}</div>
      <div class='order-meta'>${order.date} | ${order.number} | <span class='order-size'>${order.pdf_size || ''}</span></div>
      <div class='order-summary'>${order.summary}</div>`;
    container.appendChild(li);
  });
}

function injectNav(activeSection) {
  const nav = document.createElement('nav');
  nav.className = 'top-nav';
  nav.innerHTML = `
    <a href="../index.html">Home</a>
    <a href="../pages/filter.html">Filter Orders</a>
    <a href="../pages/all-pdfs.html">Show All PDFs</a>
  `;
  document.body.insertBefore(nav, document.body.firstChild);
}
