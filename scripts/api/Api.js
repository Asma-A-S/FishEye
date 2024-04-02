class Api {
    constructor(url){
        this._url = url;
    }
    async get(){
        try {
            const response = await fetch(this._url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.photographers;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; // Rejeter l'erreur pour la gérer à l'appelant
        }
        /*return fetch(this._url)
            .then(response => response.json())
            .then(response => response.data)
            .catch(err => console.log('Error', err))*/
    }
    async getMedia() {
        try {
            const response = await fetch(this._url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.media;
        } catch (error) {
            console.error('Error fetching media:', error);
            throw error;
        }
    }
}

class photographersApi extends Api {
    constructor(url){
        super(url);
    }
    async getPhotographers(){
        return await this.get()
    }
    async getPhotographerById(id) {
        const photographersData = await this.get();
        const photographer = photographersData.find(photographer => photographer.id.toString() === id);
        if (!photographer) {
            throw new Error(`Photographer with ID ${id} not found.`);
        }
        return photographer;
    }
    async getMediaByPhotographerId(id) {
        const mediaData = await this.getMedia();
        return mediaData.filter(media => media.photographerId.toString() === id);
    }
}