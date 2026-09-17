import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import '../styles/photo-lightbox.css';

document.querySelectorAll<HTMLElement>('[data-photo-gallery]').forEach((gallery) => {
  let captionHeight = 0;
  let trigger: HTMLElement | null = null;
  const lightbox = new PhotoSwipeLightbox({
    gallery,
    children: 'a.photo-link',
    pswpModule: () => import('photoswipe'),
    mainClass: 'photo-lightbox',
    showHideAnimationType: 'fade',
    bgOpacity: 0.94,
    loop: true,
    closeTitle: 'Chiudi',
    zoomTitle: 'Ingrandisci o riduci',
    arrowPrevTitle: 'Foto precedente',
    arrowNextTitle: 'Foto successiva',
    indexIndicatorSep: ' / ',
    errorMsg: 'Impossibile caricare la fotografia.',
    paddingFn: (viewport) => ({
      top: 64,
      bottom: captionHeight + 24,
      left: viewport.x < 600 ? 12 : 64,
      right: viewport.x < 600 ? 12 : 64,
    }),
  });

  lightbox.on('beforeOpen', () => {
    trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.dispatchEvent(new Event('photo-lightbox:open'));
  });

  lightbox.on('uiRegister', () => {
    const pswp = lightbox.pswp!;
    pswp.ui?.registerElement({
      name: 'photo-caption',
      order: 9,
      isButton: false,
      appendTo: 'root',
      onInit: (element) => {
        const location = document.createElement('span');
        location.className = 'photo-lightbox-location';
        const caption = document.createElement('p');
        element.append(location, caption);
        element.setAttribute('aria-live', 'polite');
        element.setAttribute('aria-atomic', 'true');

        const resizeCaption = () => {
          const height = element.getBoundingClientRect().height;
          if (height !== captionHeight) {
            captionHeight = height;
            pswp.updateSize(true);
          }
        };
        const updateCaption = () => {
          const link = pswp.getItemData(pswp.currIndex).element as HTMLElement | undefined;
          location.textContent = link?.dataset.photoLocation || '';
          location.hidden = !location.textContent;
          caption.textContent = link?.dataset.photoCaption || '';
          element.hidden = !location.textContent && !caption.textContent;
          resizeCaption();
        };
        // Measure before the first slide is laid out to avoid a resize on opening.
        pswp.on('firstUpdate', updateCaption);
        pswp.on('change', updateCaption);

        // Reserve the actual caption height, including wrapped text on phones.
        const observer = new ResizeObserver(resizeCaption);
        observer.observe(element);
        pswp.on('destroy', () => observer.disconnect());
      },
    });
  });

  lightbox.on('afterInit', () => {
    const dialog = lightbox.pswp?.element;
    dialog?.setAttribute('aria-label', 'Visualizzatore di fotografie');
    dialog?.setAttribute('aria-modal', 'true');
    dialog?.focus({ preventScroll: true });
  });
  lightbox.on('destroy', () => {
    captionHeight = 0;
    trigger?.focus({ preventScroll: true });
    trigger = null;
    document.dispatchEvent(new Event('photo-lightbox:close'));
  });
  lightbox.init();
});
