import { likesPrice } from '../utils/likesPrice.js';

class Portfolio {
  constructor() {
    // Initialisation des éléments DOM et autres propriétés
    this.$photographerHeader = document.querySelector('.photograph-header');
    this.$photographerHeaderInfos = document.querySelector(
      '.photograph-header-infos'
    );
    this.$photographerHeaderPicture = document.querySelector(
      '.photograph-header-photo'
    );
    this.$main = document.querySelector('#main');
    this.$mediaGallery = document.querySelector('.media-gallery');
    this.$lightbox = document.getElementById('lightbox');
    this.$lightboxImage = document.querySelector('.lightbox-image');
    this.$lightboxVideo = document.querySelector('.lightbox-video');
    this.$lightboxTitle = document.querySelector('.lightbox-title');
    this.$lightboxNext = document.querySelector('.lightbox-next');
    this.$lightboxPrev = document.querySelector('.lightbox-previous');
    this.mediaArray = []; // Tableau pour stocker les informations sur les médias
    this.currentIndex = 0;
    this.photographersApi = new photographersApi('data/photographers.json');

    this.$lightboxPrev.addEventListener('click', () => this.prevMedia());
    this.$lightboxNext.addEventListener('click', () => this.nextMedia());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.prevMedia();
      } else if (e.key === 'ArrowRight') {
        this.nextMedia();
      }
    });
  }

  async main() {
    // Récupération de l'ID du photographe depuis l'URL
    const photographerId = new URLSearchParams(window.location.search).get(
      'id'
    );
    if (photographerId) {
      try {
        // Récupération des données du photographe depuis l'API
        const photographerData =
          await this.photographersApi.getPhotographerById(photographerId);
        const mediaData =
          await this.photographersApi.getMediaByPhotographerId(photographerId);
        const type = typeof mediaData;
        console.log('type', type, mediaData);
        // Affichage des informations du photographe
        this.displayPhotographerHeader(photographerData);

        // Affichage de la galerie de médias
        this.displayMediaGallery(mediaData);
        likesPrice(mediaData);
        this.sortMedia(mediaData, 'popularity');
        const select = document.querySelector('.dropbtn');
        select.querySelector('#dropdown-title').textContent = 'Popularité';

        // Ajout de l'écouteur d'événements pour le tri une fois que la galerie de médias est affichée
        this.sortSelect(mediaData);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.error('Photographer ID is missing.');
    }
  }
  // Afficher le header du portfolio
  async displayPhotographerHeader(photographerData) {
    // Affichage des informations sur le photographe
    const photographer = new Photographer(photographerData);
    const template = new PhotographerTemplate(photographer);
    const { profileInfos, profilePicture } = template.getUserCardDOM();

    this.$photographerHeaderInfos.appendChild(profileInfos);
    this.$photographerHeaderPicture.appendChild(profilePicture);
    // Affichage du nom du photographe sur la modal formulaire
    this.displayPhotographerName(photographerData.name);
    // affichage prix dans l'encart prix et likes
    const price = document.querySelector('.photograph-price');
    price.innerHTML = `${photographerData.price}€ /jour`;
  }

  // Affichage du nom du photographe sur la modal formulaire
  async displayPhotographerName(photographerName) {
    const $formTitle = document.querySelector('.form-title');
    $formTitle.innerHTML = `Contactez-moi <br> ${photographerName}`;
  }

  displayMediaGallery(mediaData) {
    try {
      // Création de la galerie de médias
      const mediaContainer = this.$mediaGallery;
      mediaContainer.innerHTML = '';
      // Parcours des médias pour affichage et stockage dans le tableau
      mediaData.forEach((media, index) => {
        let mediaElement;
        if (media.image) {
          mediaElement = imageTemplate(new MediaFactory(media, 'image'));
        } else if (media.video) {
          mediaElement = videoTemplate(new MediaFactory(media, 'video'));
        } else {
          throw new Error('Unknown media type format');
        }

        // Ajout du média au conteneur
        mediaContainer.appendChild(mediaElement);

        // Stockage des informations sur le média dans le tableau
        this.mediaArray.push(media);

        // Ajout de l'écouteur d'événements pour ouvrir la lightbox sur chaque élément .card-media
        const cardMedia = mediaElement.querySelector('.card-media');
        cardMedia.addEventListener('click', () => this.openLightbox(index));
      });

      // Ajout du conteneur de médias à la page principale

      // Ajout du conteneur de médias à la page
      this.$main.appendChild(mediaContainer);
    } catch (error) {
      console.error('Error fetching media data:', error);
    }
  }

  // Fonction pour ouvrir la lightbox
  async openLightbox(index) {
    // Afficher la lightbox
    this.$lightbox.style.display = 'block';
    lightbox.focus();
    document.addEventListener('keydown', closeModalOnEscape);
    // Récupérer le média actuel
    this.currentIndex = index;
    const media = this.mediaArray[this.currentIndex];

    // this.$lightboxNext.addEventListener("click", () =>nextMedia())
    // this.$lightboxPrev.addEventListener("click", () =>prevMedia())

    // Afficher la lightbox avec les informations du média actuel
    if (media) {
      this.$lightboxTitle.innerHTML = `${media.title}`;
      // Afficher l'image ou la vidéo en fonction du type de média
      if (media.image) {
        this.$lightboxImage.src = `/assets/media/${media.photographerId}/${media.image}`;
        this.$lightboxImage.style.display = 'block';
        this.$lightboxVideo.style.display = 'none';
      } else if (media.video) {
        this.$lightboxVideo.src = `/assets/media/${media.photographerId}/${media.video}`;
        this.$lightboxVideo.style.display = 'block';
        this.$lightboxImage.style.display = 'none';
      } else {
        console.error('Media not found.');
      }
    } else {
      console.error('Media not found.');
    }
  }

  // Fonction pour passer au média suivant
  nextMedia() {
    let index = this.currentIndex; // Stockez la valeur actuelle de this.currentIndex
    index++;
    if (index >= this.mediaArray.length) {
      index = 0; // Revenir au début de l'array
    }
    this.openLightbox(index); // Passez l'index à la fonction openLightbox()
  }

  // Fonction pour passer au média précédent
  prevMedia() {
    let index = this.currentIndex; // Stockez la valeur actuelle de this.currentIndex
    index--;
    if (index < 0) {
      index = this.mediaArray.length - 1; // Revenir à la fin de l'array
    }
    this.openLightbox(index);
  }

  async sortSelect(mediaData) {
    const select = document.querySelector('.dropbtn');
    const dropdown = document.querySelector('#sort-dropdown');

    select.addEventListener('click', () => {
      dropdown.style.display =
        dropdown.style.display === 'none' ? 'block' : 'none';
    });

    dropdown.addEventListener('click', (event) => {
      const clickedButton = event.target.closest('button');
      if (clickedButton) {
        const selectedOption = clickedButton.dataset.sortValue;
        dropdown.style.display = 'none';
        select.querySelector('#dropdown-title').textContent =
          clickedButton.textContent;
        this.sortMedia(mediaData, selectedOption);

        const previousSortBtn = dropdown.querySelector('.hide');
        if (previousSortBtn) {
          previousSortBtn.classList.remove('hide');
        }
        clickedButton.classList.add('hide');
      }
    });
  }

  sortMedia(mediaData, selectedOption) {
    let mediaSorted = mediaData;
    removeHide('.sort-button');
    switch (selectedOption) {
      case 'popularity':
        mediaSorted = mediaData.slice().sort((a, b) => b.likes - a.likes);
        break;
      case 'date':
        mediaSorted = mediaData
          .slice()
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        break;
      case 'title':
        mediaSorted = mediaData
          .slice()
          .sort((a, b) => a.title.localeCompare(b.title));

        break;
      default:
        // Aucune action spécifique si l'option n'est pas sélectionnée
        break;
    }
    this.displayMediaGallery(mediaSorted);
    likesPrice(mediaSorted);
  }
}
const removeHide = (classname) => {
  const elements = document.querySelectorAll(classname);
  elements.forEach((el) => el.classList.remove('hide'));
};
const portfolio = new Portfolio();
portfolio.main();
