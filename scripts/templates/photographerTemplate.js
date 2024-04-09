function PhotographerTemplate(photographer) {
  const {_id, _name, _portrait, _tagline, _city, _country, _price} =
    photographer;
  function getUserCardDOM() {
    const article = document.createElement('article');
    article.classList.add('photographer-card');
    // Créer un lien avec l'ID du photographe
    const profileLink = document.createElement('a');
    profileLink.classList.add('photographer-link');
    profileLink.href = `photographer.html?id=${_id}`;
    profileLink.setAttribute(
        'aria-labelledby',
        'Cliquez ici si voulez accéder à la page du photographe',
    );

    const profilePicture = document.createElement('img');
    profilePicture.classList.add('profile-picture');
    profilePicture.src = `assets/photographers/${_portrait}`;
    profilePicture.alt = `Photo de profil de ${_name}`;

    const profileInfos = document.createElement('div');
    profileInfos.classList.add('photographer-infos');

    const photographerName = document.createElement('h2');
    photographerName.classList.add('photographer-name');
    photographerName.textContent = _name;
    photographerName.setAttribute('aria-label', 'Le nom du photographe');

    const photographerLocation = document.createElement('p');
    photographerLocation.classList.add('photographer-location');
    photographerLocation.textContent = `${_city}, ${_country}`;
    photographerLocation.setAttribute(
        'aria-label',
        'La localisation du photographe',
    );

    const photographerTagline = document.createElement('p');
    photographerTagline.classList.add('photographer-tagline');
    photographerTagline.textContent = _tagline;
    photographerTagline.setAttribute(
        'aria-label',
        'La citation du photographe',
    );

    profileInfos.appendChild(photographerName);
    profileInfos.appendChild(photographerLocation);
    profileInfos.appendChild(photographerTagline);

    article.appendChild(profilePicture);
    article.appendChild(profileInfos);

    profileLink.appendChild(article);

    const photographerPrice = document.createElement('span');
    photographerPrice.classList.add('photographer-price');
    photographerPrice.textContent = `${_price} €/jour`;
    photographerPrice.setAttribute('aria-label', 'Le prix du photographe');

    return {profileInfos, profilePicture, profileLink, photographerPrice};
  }
  return {getUserCardDOM};
}
