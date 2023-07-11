import profileFactory from "../templates/profileFactory.js";
import mediasFactory from "../templates/mediasFactory.js";
import { likesCounter, buildTotalLikes } from "./likesCounter.js";
import getSortFactory from "./sort.js";
import lightboxFactory from "../templates/lightboxFactory.js";

export default function buildGallery(pictures) {
  const photographMedias = document.querySelector(".photograph-medias");
  photographMedias.innerHTML = "";

  pictures.forEach((picture) => {
    const mediaModel = mediasFactory(picture);
    const mediaCardDOM = mediaModel.getMediasCardDOM();
    photographMedias.appendChild(mediaCardDOM);
  });
  likesCounter();
}

function getProfile() {
  fetch("data/photographers.json")
    .then((res) => res.json())
    .then((data) => {
      const photographers = data.photographers;
      globalThis.photographers = photographers;
      const medias = data.media;
      const photographHeader = document.querySelector(".photograph-header");

      // Récupère l'id du photographe à afficher sur la page
      let verifyUrl = new URLSearchParams(window.location.search);
      let photographerId = verifyUrl.get("id");

      let pictures = medias.filter(
        (obj) => obj.photographerId == photographerId
      );
      console.log(pictures);
      photographers.forEach((photographer) => {
        // Verifie si l'url contient l'id du photographe
        if (photographer.id == photographerId) {
          // Affiche le profil du photographe
          const photographerModel = profileFactory(photographer);
          const userCardDOM = photographerModel.getUserCardDOM();
          photographHeader.appendChild(userCardDOM);

          // Affiche le formulaire de contact du photographe
          const contactModel = contactFactory(photographer);
          contactModel.getContactCardDOM();

          // Affiche la gallerie d'images
          pictures = pictures.sort((a1, a2) => a2.likes - a1.likes);
          buildGallery(pictures);
          getSortFactory(data, pictures);

          // Affiche le compteur total de likes
          buildTotalLikes(pictures);

          // Affiche la lightbox
          const lightboxModel = lightboxFactory(photographer);
          lightboxModel.getLightboxDOM();
          return;
        }
      });
    });
}
getProfile();
