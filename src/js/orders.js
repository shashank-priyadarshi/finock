document.addEventListener('DOMContentLoaded', async function() {
  // Load PDF configuration
  await loadPDFConfig();
  
  // Populate sections dynamically from PDF_CONFIG
  populateSections();
  
  // Initialize collapsible sections
  initializeCollapsibleSections();
  
  // Initialize order selection and PDF viewer
  initializeOrderSelection();
  
  // Initialize search and filter functionality
  initializeSearchAndFilter();
});

function populateSections() {
  const sectionsContainer = document.getElementById('sections');
  const sections = {
    'Budget Orders': [],
    'Taxation': [],
    'Expenditure': [],
    'General': []
  };
  
  // Group PDFs by section
  PDF_CONFIG.forEach(pdf => {
    if (pdf.tags.includes('budget')) {
      sections['Budget Orders'].push(pdf);
    } else if (pdf.tags.includes('tax')) {
      sections['Taxation'].push(pdf);
    } else if (pdf.tags.includes('expenditure')) {
      sections['Expenditure'].push(pdf);
    } else {
      sections['General'].push(pdf);
    }
  });
  
  // Create section HTML
  let sectionsHTML = '';
  Object.keys(sections).forEach(sectionName => {
    if (sections[sectionName].length > 0) {
      sectionsHTML += `
        <div class="section">
          <div class="section-header" tabindex="0">${sectionName}</div>
          <ul class="order-list">`;
      
      sections[sectionName].forEach((pdf, index) => {
        const isActive = sectionName === 'Budget Orders' && index === 0 ? 'active' : '';
        sectionsHTML += `
            <li data-pdf="${pdf.pdf_path || pdf.pdf}" data-title="${pdf.title}" data-date="${pdf.date}" data-number="${pdf.number}" data-summary="${pdf.summary}" class="${isActive}">
              <span class="order-title">${pdf.title}</span>
              <span class="order-meta">${pdf.date} | ${pdf.number}</span>
            </li>`;
      });
      
      sectionsHTML += `
          </ul>
        </div>`;
    }
  });
  
  sectionsContainer.innerHTML = sectionsHTML;
  
  // Set initial PDF display
  const firstPdf = sections['Budget Orders'][0] || sections['Taxation'][0] || sections['Expenditure'][0] || sections['General'][0];
  if (firstPdf) {
    displayPDF(firstPdf);
  }
}

function initializeCollapsibleSections() {
  document.querySelectorAll('.section-header').forEach(header => {
    header.addEventListener('click', function() {
      const orderList = this.nextElementSibling;
      orderList.classList.toggle('collapsed');
    });
    header.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
}

function initializeOrderSelection() {
  const sections = document.getElementById('sections');
  
  sections.addEventListener('click', function(e) {
    const li = e.target.closest('li');
    if (li) {
      document.querySelectorAll('.order-list li').forEach(item => item.classList.remove('active'));
      li.classList.add('active');
      
      // Create order object from data attributes and use getPDFPath for proper path resolution
      const order = {
        pdf_path: li.getAttribute('data-pdf'),
        pdf: li.getAttribute('data-pdf'),
        title: li.getAttribute('data-title'),
        date: li.getAttribute('data-date'),
        number: li.getAttribute('data-number'),
        summary: li.getAttribute('data-summary')
      };
      
      displayPDF(order);
    }
  });
}

function displayPDF(order) {
  const pdfViewer = document.getElementById('pdf-viewer');
  const detailsTitle = document.getElementById('details-title');
  const detailsDate = document.getElementById('details-date');
  const detailsNumber = document.getElementById('details-number');
  const detailsSummary = document.getElementById('details-summary');
  const detailsDownload = document.getElementById('details-download');
  
  const resolvedPdfPath = getPDFPath(order);
  
  pdfViewer.src = resolvedPdfPath;
  pdfViewer.style.display = 'block';
  detailsTitle.textContent = order.title;
  detailsDate.textContent = order.date;
  detailsNumber.textContent = order.number;
  detailsSummary.textContent = order.summary;
  detailsDownload.href = resolvedPdfPath;
  detailsDownload.style.display = 'inline-block';
}

function initializeSearchAndFilter() {
  const searchBar = document.getElementById('search-bar');
  const startDate = document.getElementById('start-date');
  const endDate = document.getElementById('end-date');
  
  searchBar.addEventListener('input', filterOrders);
  startDate.addEventListener('change', filterOrders);
  endDate.addEventListener('change', filterOrders);
}

function filterOrders() {
  const searchBar = document.getElementById('search-bar');
  const startDate = document.getElementById('start-date');
  const endDate = document.getElementById('end-date');
  
  const query = searchBar.value.toLowerCase();
  const start = startDate.value ? new Date(startDate.value) : null;
  const end = endDate.value ? new Date(endDate.value) : null;
  
  document.querySelectorAll('.order-list li').forEach(li => {
    const title = li.getAttribute('data-title').toLowerCase();
    const number = li.getAttribute('data-number').toLowerCase();
    const summary = li.getAttribute('data-summary').toLowerCase();
    const dateStr = li.getAttribute('data-date');
    const date = new Date(dateStr);
    let matches = true;
    
    if (query && !(title.includes(query) || number.includes(query) || summary.includes(query))) {
      matches = false;
    }
    if (start && date < start) {
      matches = false;
    }
    if (end && date > end) {
      matches = false;
    }
    li.style.display = matches ? '' : 'none';
  });
}
