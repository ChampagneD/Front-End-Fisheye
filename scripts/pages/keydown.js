export default function keydown_lightbox(
  lightbox,
  closeLightbox,
  nextMedia,
  previousMedia,
  e
) {
  // e.stopImmediatePropagation();
  // e.preventDefault();
  const keyCode = e.key;

  // console.log('lightbox: ' + lightbox)
  // console.log('e: ' + e)
  // console.log('closeLightbox: ' + closeLightbox)
  // console.log('nextMedia: ' + nextMedia)
  // console.log('previousMedia: ' + previousMedia)

  if (lightbox.style.display == "block") {
    switch (keyCode) {
      case "Escape":
        closeLightbox();
        break;
      case "ArrowLeft":
        previousMedia();
        break;
      case "ArrowRight":
        nextMedia();
        break;
      default:
        break;
    }
  }
}
