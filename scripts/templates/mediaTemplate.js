function imageTemplate(media) {
  const {_title, _image, _photographerId, _likes} = media;
  const article = document.createElement('article');
  article.classList.add('gallery-card');
  const card = `
        <img class="card-media" src="assets/media/${_photographerId}/${_image}" alt = ""/>
        <div class="card-footer">
            <p class="card-title">${_title}</p>
            <div class="card-likes">
                <p class="card-nbr-like">${_likes}</p>
                <button class="like-button">
                    <i class="fas fa-heart likes-icon" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    `;
  article.innerHTML = card;
  return article;
}
function videoTemplate(media) {
  const article = document.createElement('article');
  article.classList.add('gallery-card');
  const card = `<a href="/assets/media/${media._photographerId}/${media._video}" target="_blank">
  <video controls class= "card-media">
      <source src="/assets/media/${media._photographerId}/${media._video}" type="video/mp4" alt = "">
    </video>
    <div class="card-footer">
        <p class="card-title">${media._title}</p>
        <div class="card-likes">
            <p class="card-nbr-like">${media._likes}</p>
            <button class="like-button">
                <i class="fas fa-heart likes-icon" aria-hidden="true"></i>
            </button>
        </div>
    </div>
</a>`;
  article.innerHTML = card;
  return article;
}
