import buildGallery from "./photographer.js";
import keydown_lightbox from "./keydown.js";
import lightboxFactory from "../templates/lightboxFactory.js";

// AFFICHE LA LISTE DE TRI PAR CATEGORIES
export default function getSortFactory(data, pictures) {
  console.log(data);
  const select = document.querySelectorAll('[name="sort-select"]')[0];

  select.addEventListener("change", (e) => {
    let selected = e.target.value;

    switch (selected) {
      case "Popularité":
        pictures = pictures.sort((a1, a2) => a2.likes - a1.likes);
        break;
      case "Date":
        pictures = pictures.sort(
          (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
        );
        break;
      case "Titre":
        pictures = pictures.sort((a, b) => a.title.localeCompare(b.title));

        break;
      default:
        break;
    }

    buildGallery(pictures);

    let toReset = document.getElementsByClassName("lightbox")[0];
    toReset.innerHTML = "";
    document.removeEventListener("keydown", keydown_lightbox, false);
    const lightboxModel = lightboxFactory(data);
    lightboxModel.getLightboxDOM();

    console.debug("=================");
  });
}
