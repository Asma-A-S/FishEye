class PhotographerHeader {
    constructor(photographer) {
        this._photographer = photographer;
    }
createPhotographerHeader(){
    const $article = document.createElement('article')
    $article.classList.add('photographer-header')
    
    const photographerHeader = `
    <div>
        <h2 class="photographer-infos photographer-title" aria-label="Nom du photographe">${this._photographer.name}</h2>
        <p class="photographer-infos photographer-city" aria-label="Ville et pays du photographe">${this._photographer.city}, ${this._photographer.country}</p>
        <p class="photographer-infos photographer-tagline" aria-label="tagline du photographe">${this._photographer.tagline}</p> 
    </div>
    `
    $article.innerHTML = photographerHeader
    return $article
}
}