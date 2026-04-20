/* ── nav.js — toggle menú móvil ── */
(function () {
  var btn   = document.getElementById('nav-toggle');
  var links = document.querySelector('.nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', function () {
    links.classList.toggle('open');
    btn.classList.toggle('open');
  });

  // Cerrar al hacer clic en un enlace
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('open');
      btn.classList.remove('open');
    });
  });
})();
