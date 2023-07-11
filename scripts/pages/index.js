let pictures = [];

function getPhotographers() {
  fetch("data/photographers.json")
    .then((res) => res.json())
    .then((data) => {
      const photographers = data.photographers;

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
