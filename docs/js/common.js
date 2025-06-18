// Requires js-yaml (https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.1.0/js-yaml.min.js)
let PDF_CONFIG = [];

async function loadPDFConfig() {
  if (PDF_CONFIG.length) return PDF_CONFIG;
  
  try {
    const remoteUrl = 'https://media.finock.ssnk.in/config.yaml';
    const response = await fetch(remoteUrl);
    if (!response.ok) throw new Error('Failed to fetch config');
    
    const yamlText = await response.text();
    const config = jsyaml.load(yamlText);
    
    if (!config.pdfs || !Array.isArray(config.pdfs) || config.pdfs.length === 0) {
      throw new Error('No PDF configurations found in the remote config');
    }
    
    PDF_CONFIG = config.pdfs;
    return PDF_CONFIG;
  } catch (error) {
    console.error('Failed to load remote config:', error);
    throw new Error('Failed to load PDF configuration: ' + error.message);
  }
}

function getOrdersByTag(tag) {
  return PDF_CONFIG.filter(o => o.tags.includes(tag));
}

function getOrderByNumberAndTag(number, tag) {
  return PDF_CONFIG.find(o => o.number === number && o.tags.includes(tag));
}

function getPDFPath(order) {
  // Config.yaml paths are now relative to docs/ directory
  let pdfPath = order.pdf_path || order.pdf;
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
