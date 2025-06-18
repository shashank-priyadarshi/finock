document.addEventListener('DOMContentLoaded', function() {
  const pdfList = document.getElementById('all-pdf-list');
  const pdfViewer = document.getElementById('all-pdf-viewer');
  pdfList.addEventListener('click', function(e) {
    const link = e.target.closest('a[data-pdf]');
    if (link) {
      e.preventDefault();
      document.querySelectorAll('#all-pdf-list a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
      pdfViewer.src = link.getAttribute('data-pdf');
      pdfViewer.style.display = 'block';
    }
  });
});
