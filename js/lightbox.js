/* ── lightbox.js — lightbox galería con YouTube embeds ── */
(function () {
  var lb      = document.getElementById('lightbox');
  var overlay = document.getElementById('lightboxOverlay');
  var closeBtn= document.getElementById('lightboxClose');
  var imgWrap = document.getElementById('lightboxImg');
  var caption = document.getElementById('lightboxCaption');
  if (!lb) return;

  var videoMap = {
    'tamborrada': 'https://www.youtube.com/embed/_22G9-d7fpk?autoplay=1',
    'retreta':    'https://www.youtube.com/embed/eoj5EGmWWGg?autoplay=1',
    'armentia':   'https://www.youtube.com/embed/NmOXDl6lC0A?autoplay=1',
    'perretxicos':'https://www.youtube.com/embed/jvPFmM93QFA?autoplay=1',
    'danzas':     'https://www.youtube.com/embed/_P_jMkdWFXg?autoplay=1',
    'deportes':   'https://www.youtube.com/embed/5NVFtEdajT0?autoplay=1',
    'estibaliz':  'https://www.youtube.com/embed/TPO491zLtbw?autoplay=1'
  };

  document.querySelectorAll('.gallery-item, .gal-item').forEach(function (item) {
    item.addEventListener('click', function () {
      var name     = item.querySelector('.gallery-name');
      var videoKey = item.dataset.video;
      var embedUrl = videoKey && videoMap[videoKey];
      if (imgWrap) {
        imgWrap.innerHTML = '';
        if (embedUrl) {
          var iframe = document.createElement('iframe');
          iframe.src = embedUrl;
          iframe.width = '100%';
          iframe.height = '360';
          iframe.frameBorder = '0';
          iframe.allowFullscreen = true;
          iframe.allow = 'autoplay; encrypted-media';
          imgWrap.appendChild(iframe);
        } else {
          var img = item.querySelector('.gallery-img');
          if (img) {
            var clone = document.createElement('img');
            clone.src = img.src;
            clone.alt = img.alt;
            imgWrap.appendChild(clone);
          }
        }
      }
      if (caption) caption.textContent = name ? name.textContent.trim() : (item.dataset.label || '');
      lb.classList.add('open');
    });
  });

  function close() {
    lb.classList.remove('open');
    if (imgWrap) imgWrap.innerHTML = '';
  }
  overlay  && overlay.addEventListener('click', close);
  closeBtn && closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
})();
