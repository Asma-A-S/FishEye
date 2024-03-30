class Portfolio {
    constructor(){
        // Initialisation des éléments DOM et autres propriétés
        this.$photographeHeader = document.querySelector('.photograph-header')
        this.$photographeHeaderInfos = document.querySelector('.photograph-header-infos')
        this.$photographeHeaderPicture = document.querySelector('.photograph-header-photo')
        this.$main = document.querySelector('#main');
        this.$lightbox = document.getElementById('lightbox');
        this.$lightboxImage = document.querySelector(".lightbox-image");
        this.$lightboxVideo = document.querySelector(".lightbox-video");
        this.$lightboxTitle = document.querySelector(".lightbox-title");
        this.mediaArray = []; // Tableau pour stocker les informations sur les médias
        this.currentIndex = 0;
        this.photographersApi = new photographersApi("/data/photographers.json");
    }

    async main(){
        // Récupération de l'ID du photographe depuis l'URL
        const photographerId = new URLSearchParams(window.location.search).get('id');
        if (photographerId) {
            try {
                // Récupération des données du photographe depuis l'API
                const photographerData = await this.photographersApi.getPhotographerById(photographerId);
                // Affichage des informations du photographe
                this.displayPhotographerInfo(photographerData);
                // Affichage de la galerie de médias
                await this.displayMediaGallery(photographerId);
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.error('Photographer ID is missing.');
        }
    }

    async displayMediaGallery(photographerId) {
        try {
            // Récupération des médias du photographe depuis l'API
            const mediaData = await this.photographersApi.getMediaByPhotographerId(photographerId);
            
            // Création de la galerie de médias
            const mediaContainer = document.createElement('div');
            mediaContainer.classList.add('media-gallery');

            // Parcours des médias pour affichage et stockage dans le tableau
            mediaData.forEach((media, index) => {
                console.log('photoId', photographerId)
                let mediaElement;
                if (media.image) {
                    mediaElement = imageTemplate(new MediaFactory(media, 'image'));
                } else if (media.video) {
                    mediaElement = videoTemplate(new MediaFactory(media, 'video'));
                } else {
                    throw new Error('Unknown media type format');
                }
                
                // Ajout d'écouteur d'événements pour l'ouverture de la lightbox
                mediaElement.addEventListener('click', () => {
                    this.openLightbox(media.id);
                    console.log('media', media)
                });
                // Ajout du média au conteneur
                mediaContainer.appendChild(mediaElement);
                // Stockage des informations sur le média dans le tableau
                this.mediaArray.push({
                    // chemin vers l'image
                    image: media.image,
                    title: media.title,
                    photographerId: media.photographerId,
                    index: index, 
                    id: media.id
                });
            });
    
            // Ajout du conteneur de médias à la page
            this.$main.appendChild(mediaContainer);
        } catch (error) {
            console.error('Error fetching media data:', error);
        }
    }
    
    async displayPhotographerInfo(photographerData) {
        // Affichage des informations sur le photographe
        const photographer = new Photographer(photographerData);
        const template = new PhotographerTemplate(photographer);
        const {profileInfos, profilePicture, photographerPrice } = template.getUserCardDOM();
    
        this.$photographeHeaderInfos.appendChild(profileInfos)
        this.$photographeHeaderPicture.appendChild(profilePicture)
        this.$main.appendChild(photographerPrice)
    
        // Affichage du nom du photographe sur la modal formulaire
        this.displayPhotographerName(photographerData.name);
    }
    
    async displayPhotographerName(photographerName) {
        // Affichage du nom du photographe sur la modal formulaire
        const $formTitle = document.querySelector('.form-title');
        $formTitle.innerHTML =`Contactez-moi <br> ${photographerName}`;
    }
    async openLightbox(mediaId) {
        console.log('lightbox media', mediaId);
        // Afficher la lightbox
        this.$lightbox.style.display = "block";
       
        //this.currentIndex = index;
        const mediaIndex = this.mediaArray.findIndex(media => media.id === mediaId)
        
        console.log('mediaaffiche', mediaId)
        console.log('this.currentIndex', this.currentIndex)
        console.log('mediaIndex', mediaIndex)
        if (mediaIndex !== -1) {
            const media = this.mediaArray[mediaIndex];
            console.log('media test', media);
            // Afficher la lightbox
            this.$lightbox.style.display = "block";
            this.$lightboxTitle.innerHTML = `${media.title}`
            this.currentIndex = mediaIndex;
        // Afficher l'image ou la vidéo en fonction du type de média
        if (media.image) {
            console.log('oui')
            this.$lightboxImage.src = `/assets/media/${media.photographerId}/${media.image}`;
            this.$lightboxImage.style.display = "block";
            this.$lightboxVideo.style.display = "none";
        } else if (media.video) {
            this.$lightboxVideo.src = `/assets/media/${media.photographerId}/${media.video}`;
            this.$lightboxVideo.style.display = "block";
            this.$lightboxImage.style.display = "none";
        } else {
            console.error('Media with ID', mediaId, 'not found.');
        }
    }}
    /*closeModal(){
        // Fermer la lightbox
        this.$lightbox.style.display = "none";
        // Arrêter la vidéo s'il y en a une
        this.$lightboxVideo.pause();
    }*/
    nextMedia(){
        console.log('mediaArray', this.mediaArray)
        // Incrémenter l'index
        this.currentIndex++;
        // Vérifier si l'index dépasse la longueur de l'array  
        if (this.currentIndex >= this.mediaArray.length) {
            this.currentIndex = 0; // Revenir au début de l'array
        }
        // Récupérer le média suivant
        const nextmediaId = this.mediaArray[this.currentIndex].id;
        // Ouvrir la lightbox avec le média suivant
        this.openLightbox(nextmediaId);
    }

    prevMedia(){
        // Décrémenter l'index
        this.currentIndex--;
        // Vérifier si l'index est inférieur à 0
        if (this.currentIndex < 0) {
            this.currentIndex = this.mediaArray.length - 1; // Revenir à la fin de l'array
        }
        // Récupérer le média précédent
        const prevMediaId = this.mediaArray[this.currentIndex].id;
        // Ouvrir la lightbox avec le média précédent
        this.openLightbox(prevMediaId);
    }
}
const portfolio = new Portfolio();
portfolio.main();    