document.addEventListener('DOMContentLoaded', function() {
  // Collapsible sections
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

  // Order selection and details update
  const sections = document.getElementById('sections');
  const pdfViewer = document.getElementById('pdf-viewer');
  const detailsTitle = document.getElementById('details-title');
  const detailsDate = document.getElementById('details-date');
  const detailsNumber = document.getElementById('details-number');
  const detailsSummary = document.getElementById('details-summary');
  const detailsDownload = document.getElementById('details-download');

  sections.addEventListener('click', function(e) {
    const li = e.target.closest('li');
    if (li) {
      // Remove active from all
      document.querySelectorAll('.order-list li').forEach(item => item.classList.remove('active'));
      li.classList.add('active');
      // Update viewer
      pdfViewer.src = li.getAttribute('data-pdf');
      // Update details
      detailsTitle.textContent = li.getAttribute('data-title');
      detailsDate.textContent = li.getAttribute('data-date');
      detailsNumber.textContent = li.getAttribute('data-number');
      detailsSummary.textContent = li.getAttribute('data-summary');
      detailsDownload.href = li.getAttribute('data-pdf');
    }
  });

  // Search/filter functionality
  const searchBar = document.getElementById('search-bar');
  searchBar.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    document.querySelectorAll('.order-list li').forEach(li => {
      const title = li.getAttribute('data-title').toLowerCase();
      const number = li.getAttribute('data-number').toLowerCase();
      const summary = li.getAttribute('data-summary').toLowerCase();
      if (title.includes(query) || number.includes(query) || summary.includes(query)) {
        li.style.display = '';
      } else {
        li.style.display = 'none';
      }
    });
  });
});
