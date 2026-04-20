/* ── carousel.js — carrusel de tradiciones (#carouselTrack) ── */
(function () {
  var track    = document.getElementById('carouselTrack');
  var prevBtn  = document.getElementById('carouselPrev');
  var nextBtn  = document.getElementById('carouselNext');
  var dotsWrap = document.getElementById('carouselDots');
  if (!track) return;

  var cards   = Array.prototype.slice.call(track.querySelectorAll('.trad-card'));
  var total   = cards.length;
  var current = 0;
  var GAP     = 16;

  function cardWidth()  { return cards[0] ? cards[0].offsetWidth : 280; }
  function outerWidth() { return track.parentElement ? track.parentElement.offsetWidth : 600; }
  function visible()    { return Math.max(1, Math.floor((outerWidth() + GAP) / (cardWidth() + GAP))); }
  function maxIdx()     { return Math.max(0, total - visible()); }

  function go(idx) {
    current = Math.max(0, Math.min(idx, maxIdx()));
    track.style.transform = 'translateX(-' + current * (cardWidth() + GAP) + 'px)';
    updateDots();
  }

  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    var n = maxIdx() + 1;
    for (var i = 0; i < n; i++) {
      (function (i) {
        var d = document.createElement('button');
        d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', 'Ir a tarjeta ' + (i + 1));
        d.addEventListener('click', function () { go(i); });
        dotsWrap.appendChild(d);
      })(i);
    }
  }

  function updateDots() {
    if (!dotsWrap) return;
    var dots = dotsWrap.querySelectorAll('.carousel-dot');
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === current);
    });
  }

  prevBtn && prevBtn.addEventListener('click', function () { go(current - 1); });
  nextBtn && nextBtn.addEventListener('click', function () { go(current + 1); });

  // Swipe táctil
  var startX = 0;
  track.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) go(current + (dx < 0 ? 1 : -1));
  });

  window.addEventListener('resize', function () { buildDots(); go(current); });
  buildDots();
  go(0);
})();
