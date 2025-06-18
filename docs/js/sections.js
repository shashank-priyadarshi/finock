document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.section-card').forEach(card => {
    card.addEventListener('click', function() {
      const section = encodeURIComponent(this.getAttribute('data-section'));
      window.location.href = `orders-list.html?section=${section}`;
    });
  });
});
