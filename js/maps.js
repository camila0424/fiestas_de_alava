/* ── maps.js — modal de ubicación, placeData, openModal, closeModal ── */
(function () {
  var placeData = {
    'plaza de la provincia': {
      lugar: 'Plaza de la Provincia, Vitoria-Gasteiz',
      mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Plaza+de+la+Provincia+Vitoria-Gasteiz',
      embedUrl: 'https://maps.google.com/maps?q=Plaza+de+la+Provincia+Vitoria-Gasteiz&output=embed'
    },
    'balcón de la diputación': {
      lugar: 'Balcón de la Diputación, Vitoria-Gasteiz',
      mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Diputacion+Foral+de+Alava+Vitoria-Gasteiz',
      embedUrl: 'https://maps.google.com/maps?q=Diputacion+Foral+de+Alava+Vitoria-Gasteiz&output=embed'
    },
    'casco medieval': {
      lugar: 'Casco Medieval, Vitoria-Gasteiz',
      mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Casco+Medieval+Vitoria-Gasteiz',
      embedUrl: 'https://maps.google.com/maps?q=Casco+Medieval+Vitoria-Gasteiz&output=embed'
    },
    'centro ciudad': {
      lugar: 'Centro ciudad, Vitoria-Gasteiz',
      mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Centro+Vitoria-Gasteiz',
      embedUrl: 'https://maps.google.com/maps?q=Centro+Vitoria-Gasteiz&output=embed'
    },
    'basílica de san prudencio': {
      lugar: 'Basílica de San Prudencio de Armentia, Vitoria-Gasteiz',
      mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Basilica+San+Prudencio+Armentia+Vitoria-Gasteiz',
      embedUrl: 'https://maps.google.com/maps?q=Basilica+San+Prudencio+de+Armentia+Vitoria-Gasteiz&output=embed'
    },
    'campas de armentia': {
      lugar: 'Campas de Armentia, Vitoria-Gasteiz',
      mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Campas+de+Armentia+Vitoria-Gasteiz',
      embedUrl: 'https://maps.google.com/maps?q=Campas+de+Armentia+Vitoria-Gasteiz&output=embed'
    },
    'casco viejo': {
      lugar: 'Casco Viejo, Vitoria-Gasteiz',
      mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Casco+Viejo+Vitoria-Gasteiz',
      embedUrl: 'https://maps.google.com/maps?q=Casco+Viejo+Vitoria-Gasteiz&output=embed'
    },
    'cerro de estíbaliz': {
      lugar: 'Cerro de Estíbaliz, Argandoña, Álava',
      mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Basilica+Estibaliz+Argandona+Alava',
      embedUrl: 'https://maps.google.com/maps?q=Basilica+de+Estibaliz+Argandona+Alava&output=embed'
    },
    'campas de estíbaliz': {
      lugar: 'Campas de Estíbaliz, Argandoña, Álava',
      mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Estibaliz+Argandona+Alava',
      embedUrl: 'https://maps.google.com/maps?q=Estibaliz+Argandona+Alava&output=embed'
    }
  };

  /* Busca en placeData por coincidencia parcial del texto del lugar */
  function findPlace(rawText) {
    var norm = rawText.toLowerCase().split('·')[0].trim();
    if (placeData[norm]) return placeData[norm];
    var keys = Object.keys(placeData);
    for (var i = 0; i < keys.length; i++) {
      if (norm.indexOf(keys[i]) !== -1 || keys[i].indexOf(norm) !== -1) {
        return placeData[keys[i]];
      }
    }
    return null;
  }

  var modal    = document.getElementById('locationModal');
  var overlay  = document.getElementById('locationOverlay');
  var closeBtn = document.getElementById('locationClose');
  var iframe   = document.getElementById('modalMapIframe');
  var mapsBtn  = document.getElementById('modalMapsBtn');
  if (!modal) return;

  function openModal(evName, evTime, data, dayLabel) {
    document.getElementById('modalDayBadge').textContent  = dayLabel;
    document.getElementById('modalTitle').textContent     = evName;
    document.getElementById('modalPlaceName').textContent = data.lugar;
    iframe.src   = data.embedUrl;
    mapsBtn.href = data.mapsUrl;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    iframe.src = '';
    document.body.style.overflow = '';
  }

  /* Click en cada <li> de evento */
  document.querySelectorAll('.prog-day').forEach(function (article) {
    var day    = article.dataset.day;
    var month  = article.querySelector('.prog-month')  ? article.querySelector('.prog-month').textContent.trim()  : '';
    var badge  = day + ' ' + (month || '') ;

    article.querySelectorAll('.prog-events li').forEach(function (li) {
      li.style.cursor = 'pointer';
      li.addEventListener('click', function (e) {
        e.stopPropagation();
        var placeEl = li.querySelector('.ev-place');
        var nameEl  = li.querySelector('.ev-name');
        if (!placeEl) return;
        var data = findPlace(placeEl.textContent);
        if (!data) return;
        openModal(
          nameEl ? nameEl.textContent.trim() : '',
          '',
          data,
          badge
        );
      });
    });
  });

  overlay  && overlay.addEventListener('click', closeModal);
  closeBtn && closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
})();
