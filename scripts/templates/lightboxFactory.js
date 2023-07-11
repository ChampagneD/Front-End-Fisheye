import keydown_lightbox from "../pages/keydown.js";

let keydownlistener = undefined;
export default function lightboxFactory(data) {
  const { image, video, title } = data;

  function getLightboxDOM() {
    const main = document.querySelector("#main");
    const lightbox = document.querySelector(".lightbox");
    const previous = document.createElement("i");
    const next = document.createElement("i");
    const closeBtn = document.createElement("i");
    const container = document.createElement("div");
    const titleMedia = document.createElement("p");

    let selectedMedia;
    let currentIndex;

    /*previous.className = "previous fas fa-chevron-left";
        previous.setAttribute("title", "Image précédente");*/
    previous.innerHTML =
      '<button><i class="fas fa-chevron-left" title="image précédente"></i></button>';
    previous.style.position = "absolute";
    previous.style.top = "47%";
    previous.style.left = "16%";
    previous.style.fontSize = "40px";
    previous.style.color = "#901C1C";
    previous.style.cursor = "pointer";
    previous.classList.add = "previous";
    previous.setAttribute("title", "Image précédente");

    next.innerHTML =
      '<button><i class="fas fa-chevron-right" title="image suivante"></i></button>';
    next.style.position = "absolute";
    next.style.top = "47%";
    next.style.right = "16%";
    next.style.fontSize = "40px";
    next.style.color = "#901C1C";
    next.style.cursor = "pointer";
    next.classList.add = "next";
    next.setAttribute("title", "Image suivante");

    closeBtn.innerHTML =
      '<button><i class="fas fa-times" title="Fermer la lightbox"></i></button>';
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "6%";
    closeBtn.style.right = "16%";
    closeBtn.style.fontSize = "40px";
    closeBtn.style.color = "#901C1C";
    closeBtn.style.cursor = "pointer";

    container.classList.add("container");
    container.style.width = "55%";
    container.style.height = "85%";
    container.style.position = "absolute";
    container.style.margin = "auto";
    container.style.top = "0";
    container.style.bottom = "0";
    container.style.left = "0";
    container.style.right = "0";

    const img = document.createElement("img");
    const vid = document.createElement("video");
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.borderRadius = "5px";
    img.style.objectFit = "cover";
    img.setAttribute("src", "");
    img.setAttribute("alt", "");
    container.appendChild(img);
    vid.style.width = "100%";
    vid.style.height = "100%";
    vid.style.borderRadius = "5px";
    vid.style.objectFit = "cover";
    vid.setAttribute("src", "");
    vid.setAttribute("alt", "");

    titleMedia.style.fontSize = "24px";
    titleMedia.style.color = "#901C1C";
    titleMedia.style.width = "100%";
    titleMedia.style.height = "30px";
    titleMedia.style.textAlign = "start";

    // Ouverture de la lightbox
    function openLightbox() {
      lightbox.style.display = "block";
      lightbox.setAttribute("aria-hidden", "false");
      main.setAttribute("aria-hidden", "true");
      closeBtn.focus();

      // add all the elements inside modal which you want to make focusable
      const focusableElements =
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

      const firstFocusableElement =
        lightbox.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
      const focusableContent = lightbox.querySelectorAll(focusableElements);
      const lastFocusableElement =
        focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

      document.addEventListener("keydown", function (e) {
        let isTabPressed = e.key === "Tab" || e.keyCode === 9;

        if (!isTabPressed) {
          return;
        }

        if (e.shiftKey) {
          // if shift key pressed for shift + tab combination
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus(); // add focus for the last focusable element
            e.preventDefault();
          }
        } else {
          // if tab key is pressed
          if (document.activeElement === lastFocusableElement) {
            // if focused has reached to last focusable element then focus first focusable element after pressing tab
            firstFocusableElement.focus(); // add focus for the first focusable element
            e.preventDefault();
          }
        }
      });

      firstFocusableElement.focus();
    }

    // Affiche le média sélectionné
    function displayMedia(selectedMedia) {
      img.src = selectedMedia.src;
      img.alt = selectedMedia.alt;
      titleMedia.textContent = selectedMedia.alt;

      if (typeof selectedMedia.alt === "undefined") {
        img.replaceWith(vid);
        vid.src = selectedMedia.src;
        vid.alt = selectedMedia.alt;
        titleMedia.textContent = "Wild horses in the mountains";
        vid.play();
      } else {
        vid.replaceWith(img);
      }
    }

    // Affiche le média précédent
    function previousMedia() {
      selectedMedia.classList.remove("selected");
      console.debug("previousMedia");
      console.debug(sources);
      console.debug(selectedMedia);
      currentIndex = sources.indexOf(clean_uri(selectedMedia.src), 0) - 1;
      console.debug(currentIndex);
      if (currentIndex < 0) {
        currentIndex = sources.length - 1;
      }

      selectedMedia = document.querySelector(
        `[src="${sources[currentIndex]}"]`
      );
      selectedMedia.classList.add("selected");
      displayMedia(selectedMedia);
    }

    previous.addEventListener("click", (e) => {
      e.preventDefault();
      previousMedia();
    });

    // Affiche le média suivant
    function nextMedia() {
      selectedMedia.classList.remove("selected");
      currentIndex = sources.indexOf(clean_uri(selectedMedia.src), 0) + 1;
      if (currentIndex >= sources.length) {
        currentIndex = 0;
      }

      selectedMedia = document.querySelector(
        `[src="${sources[currentIndex]}"]`
      );
      selectedMedia.classList.add("selected");
      displayMedia(selectedMedia);
    }

    next.addEventListener("click", (e) => {
      e.preventDefault();
      nextMedia();
    });

    function clean_uri(src) {
      let source = new URL(src).pathname;

      return source.slice(1, source.length);
    }

    // Accessibilité Lightbox
    let callback = (e) => {
      keydown_lightbox(lightbox, closeLightbox, nextMedia, previousMedia, e);
    };
    if (keydownlistener) {
      document.removeEventListener("keydown", keydownlistener);
    }
    document.addEventListener("keydown", callback);
    keydownlistener = callback;

    // Fermeture de la ligtbox
    function closeLightbox() {
      selectedMedia.classList.remove("selected");
      lightbox.style.display = "none";
      lightbox.setAttribute("aria-hidden", "true");
      main.setAttribute("aria-hidden", "false");
    }
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      closeLightbox();
    });

    const medias = document.querySelectorAll(".galleryLink");
    let sources = [];

    for (let i = 0; i < medias.length; i++) {
      let mediaLink = medias[i];
      sources.push(clean_uri(mediaLink.children[0].src));
      mediaLink.addEventListener("click", (e) => {
        e.preventDefault();
        openLightbox();

        selectedMedia = e.target;
        let img = selectedMedia.querySelector("img");
        if (img) selectedMedia = img;
        selectedMedia.classList.add("selected");
        displayMedia(selectedMedia);
      });
    }

    console.debug(sources);
    lightbox.appendChild(container);
    container.appendChild(titleMedia);
    lightbox.appendChild(previous);
    lightbox.appendChild(next);
    lightbox.appendChild(closeBtn);
    console.log(lightbox);
  }

  return { image, video, title, getLightboxDOM };
}
