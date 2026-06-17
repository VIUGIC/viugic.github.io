document.addEventListener('DOMContentLoaded', function () {
  var lightbox = document.getElementById('image-lightbox');
  var lightboxImage = document.getElementById('image-lightbox-img');
  var lightboxCaption = document.getElementById('image-lightbox-caption');
  var closeButton = lightbox ? lightbox.querySelector('.image-lightbox__close') : null;
  var datasetCards = document.querySelectorAll('.dataset-card');

  if (!lightbox || !lightboxImage || !lightboxCaption || !closeButton || !datasetCards.length) {
    return;
  }

  function openLightbox(card) {
    var image = card.querySelector('img');
    var caption = card.querySelector('figcaption');

    if (!image) {
      return;
    }

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt || '';
    lightboxCaption.textContent = caption ? caption.textContent : '';
    if (!lightbox.open) {
      lightbox.showModal();
    }
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (lightbox.open) {
      lightbox.close();
    }
    lightboxImage.src = '';
    document.body.style.overflow = '';
  }

  datasetCards.forEach(function (card) {
    var caption = card.querySelector('figcaption');
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', 'Open ' + (caption ? caption.textContent : 'dataset image'));

    card.addEventListener('click', function () {
      openLightbox(card);
    });

    card.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(card);
      }
    });
  });

  closeButton.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', function (event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  lightbox.addEventListener('close', function () {
    lightboxImage.src = '';
    document.body.style.overflow = '';
  });
});
