import photographerFactory from "../templates/photographer.js";

function getPhotographers() {
  fetch("data/photographers.json")
    .then((res) => res.json())
    .then((data) => {
      const { photographers } = data;

      const photographersSection = document.querySelector(
        ".photographer_section"
      );

      photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
      });
    });
}

getPhotographers();
