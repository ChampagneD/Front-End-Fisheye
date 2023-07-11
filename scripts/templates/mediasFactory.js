// AFFICHE LES MEDIAS DU PHOTOGRAPHE
export default function mediasFactory(data) {
  const { image, video, title, likes } = data;

  let mediaImage = `assets/medias/${image}`;
  let mediaVideo = `assets/medias/${video}`;

  function getMediasCardDOM() {
    const figure = document.createElement("figure");

    const mediaTitle = document.createElement("p");
    const mediaLikes = document.createElement("div");
    const numberOfLikes = document.createElement("input");
    const buttonHeart = document.createElement("button");

    figure.style.marginBottom = "40px";
    figure.style.width = "450px";

    const mediaLink = document.createElement("button");
    mediaLink.classList.add("galleryLink");
    mediaLink.style.width = "450px";
    mediaLink.style.height = "450px";
    mediaLink.style.borderStyle = "none";

    const mediaCaption = document.createElement("figcaption");
    mediaCaption.classList.add("figcaption");
    mediaCaption.style.display = "flex";
    mediaCaption.style.justifyContent = "space-between";

    mediaTitle.classList.add("mediaTitle");
    mediaTitle.textContent = title;
    mediaTitle.style.fontSize = "20px";
    mediaTitle.style.color = "#901C1C";

    mediaLikes.classList.add("likesContainer");
    mediaLikes.style.display = "flex";
    mediaLikes.style.fontSize = "20px";
    mediaLikes.style.color = "#901C1C";

    numberOfLikes.setAttribute("value", likes);
    numberOfLikes.classList.add("numberOfLikes");
    numberOfLikes.style.width = "32px";
    numberOfLikes.style.border = "none";
    numberOfLikes.style.color = "#901C1C";
    numberOfLikes.style.fontSize = "20px";

    buttonHeart.classList.add("buttonHeart");
    buttonHeart.innerHTML = '<i class="fas fa-heart" title="Likes"></i>';
    buttonHeart.style.background = "white";
    buttonHeart.style.border = "none";
    buttonHeart.style.fontSize = "20px";
    buttonHeart.style.color = "#901C1C";
    buttonHeart.style.cursor = "pointer";

    figure.appendChild(mediaLink);
    figure.appendChild(mediaCaption);
    mediaCaption.appendChild(mediaTitle);
    mediaCaption.appendChild(mediaLikes);
    mediaLikes.appendChild(numberOfLikes);
    mediaLikes.appendChild(buttonHeart);

    if (video == undefined) {
      const img = document.createElement("img");
      img.setAttribute("src", mediaImage);
      img.setAttribute("alt", title);
      img.classList.add("currentMedia");
      img.style.width = "450px";
      img.style.height = "450px";
      img.style.borderRadius = "5px";
      img.style.objectFit = "cover";
      img.style.cursor = "pointer";
      mediaLink.appendChild(img);
    }

    if (video != undefined) {
      const vid = document.createElement("video");
      vid.className = "vid";
      vid.style.width = "450px";
      vid.style.height = "450px";
      vid.style.borderRadius = "5px";
      vid.style.objectFit = "cover";
      vid.style.cursor = "pointer";
      vid.setAttribute("src", mediaVideo);
      vid.setAttribute("alt", title);
      vid.classList.add("currentMedia");
      mediaLink.appendChild(vid);
    }

    return figure;
  }

  return { image, video, title, likes, getMediasCardDOM };
}
