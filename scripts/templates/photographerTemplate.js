function PhotographerTemplate(photographer){
    const {_id, _name, _portrait, _tagline, _city, _country, _price } = photographer;
    function getUserCardDOM(){
        const article = document.createElement('article');
        article.classList.add('photographer-card');

        // Créer un lien avec l'ID du photographe
        const profileLink = document.createElement('a');
        profileLink.classList.add('photographer-link')
        profileLink.href = `photographer.html?id=${_id}`;

        const profilePicture = document.createElement('img');
        profilePicture.classList.add('profile-picture');
        profilePicture.src = `assets/photographers/${_portrait}`;
        profilePicture.alt = `Photo de profil de ${_name}`;

        const profileInfos = document.createElement('div');
        profileInfos.classList.add('photographer-infos');

        const photographerName = document.createElement('h2');
        photographerName.classList.add('photographer-name');
        photographerName.textContent = _name;

        const photographerLocation = document.createElement('p');
        photographerLocation.classList.add('photographer-location');
        photographerLocation.textContent = `${_city}, ${_country}`;

        const photographerTagline = document.createElement('p');
        photographerTagline.classList.add('photographer-tagline');
        photographerTagline.textContent = _tagline;

        profileInfos.appendChild(photographerName);
        profileInfos.appendChild(photographerLocation);
        profileInfos.appendChild(photographerTagline);

        article.appendChild(profilePicture);
        article.appendChild(profileInfos);

        profileLink.appendChild(article);

        const photographerPrice = document.createElement('span');
        photographerPrice.classList.add('photographer-price');
        photographerPrice.textContent = `${_price} €/jour`;
        return {profileInfos, profilePicture, profileLink, photographerPrice}
    }
    return { getUserCardDOM }
}



/*function PhotographerTemplate(photographer) {
    const {_id, _name, _portrait, _tagline, _city, _country, _price } = photographer;

    function getUserCardDOM() {
       /* const article = document.createElement('article');
        article.classList.add('photographer-card');

        // Créer un lien avec l'ID du photographe
        const profileLink = document.createElement('a');
        profileLink.classList.add('photographer-link')
        profileLink.href = `photographer.html?id=${_id}`;*/

        //
       /* const profilePicture = document.createElement('img');
        profilePicture.classList.add('profile-picture');
        profilePicture.src = `assets/photographers/${_portrait}`;
        profilePicture.alt = `Photo de profil de ${_name}`;

        const photographerName = document.createElement('h2');
        photographerName.classList.add('photographer-name');
        photographerName.textContent = _name;

        const photographerLocation = document.createElement('p');
        photographerLocation.classList.add('photographer-location');
        photographerLocation.textContent = `${_city}, ${_country}`;

        const photographerTagline = document.createElement('p');
        photographerTagline.classList.add('photographer-tagline');
        photographerTagline.textContent = _tagline;

            const photographerPrice = document.createElement('span');
            photographerPrice.classList.add('photographer-price');
            photographerPrice.textContent = `${_price} €/jour`;

        /*profileLink.appendChild(profilePicture)
        profileLink.appendChild(photographerName);
        profileLink.appendChild(photographerLocation);
        profileLink.appendChild(photographerTagline);
        profileLink.appendChild(photographerPrice);

        article.appendChild(profileLink);*/

       /* return {profilePicture, photographerName, photographerLocation, photographerTagline, photographerPrice};
    }

    return { getUserCardDOM };
}*/

/*class PhotographerCard {
    constructor(photographer) {
        this._photographer = photographer;
    }

    createPhotographerCard() {
        const $article = document.createElement('article');
        $article.classList.add('photographer-section');

        // Créez le lien vers la page dédiée du photographe en ajoutant l'ID à l'URL
       // const photographerLink = document.createElement('a');
        //photographerLink.href = `photographer.html?id=${this._photographer.id}`;

        const photographerCard = `
        <a href="photographer.html?id=${this._photographer._id}">
            <div class="profile-picture-container">
                <img class="profile-picture" src="/assets/photographers/${this._photographer._portrait}" alt="Photo de profil de ${this._photographer._name}"/>
                <div class="masque"></div>
            </div>
            <div class="profile-infos">
                <h2 class="photographer-infos photographer-title" aria-label="Nom du photographe">${this._photographer._name}</h2>
                <p class="photographer-infos photographer-city" aria-label="Ville et pays du photographe">${this._photographer._city}, ${this._photographer._country}</p>
                <p class="photographer-infos photographer-tagline" aria-label="tagline du photographe">${this._photographer._tagline}</p>
                <span class="photographer-infos photographer-price" aria-label="le prix du photographe par jour">${this._photographer._price}€/jour </span>
            </div>  
        </a>   
        `;
        
        $article.innerHTML = photographerCard;

        // Ajoutez le lien autour de l'article
        //photographerLink.appendChild($article);
        
        return $article;
    }
}*/