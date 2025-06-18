// Requires js-yaml and pdfs.js

document.addEventListener('DOMContentLoaded', async function() {
  await loadPDFConfig();
  const params = new URLSearchParams(window.location.search);
  const orderNum = params.get('order') ? decodeURIComponent(params.get('order')) : '';
  
  console.log('Looking for order:', orderNum); // Debug log
  console.log('Available orders:', PDF_CONFIG); // Debug log
  
  const order = PDF_CONFIG.find(o => o.number === orderNum && o.tags.includes('budget'));
  if (!order) {
    console.log('Order not found!'); // Debug log
    document.querySelector('.order-details-container').innerHTML = '<p>Order not found.</p>';
    return;
  }
  
  console.log('Found order:', order); // Debug log
  
  document.getElementById('order-title').textContent = order.title;
  document.getElementById('order-date').textContent = order.date;
  document.getElementById('order-number').textContent = order.number;
  document.getElementById('order-size').textContent = order.pdf_size || '';
  document.getElementById('order-summary').textContent = order.summary;
  const btn = document.getElementById('show-pdf-link-btn');
  btn.addEventListener('click', function() {
    const linkPanel = document.getElementById('pdf-link-panel');
    const pdfLink = document.getElementById('pdf-link');
    
    // Use getPDFPath function for proper path resolution
    const pdfUrl = getPDFPath(order);
    console.log('Setting PDF link to:', pdfUrl); // Debug log
    
    pdfLink.href = pdfUrl;
    linkPanel.style.display = 'block';
  });
});
