import { galleryItems } from "./gallery-items.js";
// Change code below this line
const galleryListEl = document.querySelector(".gallery");

const galleryItemsMarkup = createGalleryItemsMarkup(galleryItems);

galleryListEl.insertAdjacentHTML("afterbegin", galleryItemsMarkup);

function createGalleryItemsMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
        </a>
    </li>`;
    })
    .join("");
}

galleryListEl.addEventListener("click", handleClickOnGalleryItem);

function handleClickOnGalleryItem(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }
  const instance = basicLightbox.create(
    `
    <img src="${event.target.dataset.source}">
`,
    {
      onShow: (instance) => {
        document.addEventListener("keydown", escapeImg);
      },
      onClose: (instance) => {
        document.removeEventListener("keydown", escapeImg);
      },
    }
  );

  instance.show();

  function escapeImg({ code }) {
    if (basicLightbox.visible() === true && code === "Escape") {
      instance.close();
    }
  }
}
