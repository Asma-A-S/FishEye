/**
 * Met à jour les informations sur les likes et le prix du photographe.
 * @param {Object[]} mediaData -
 * Les données des médias.
 * @param {number} mediaData[].id -
 * L'identifiant unique du média.
 * @param {number} mediaData[].likes -
 * Le nombre de likes du média.
 * @param {HTMLElement[]} mediaData[].cardLikes -
 *  Les éléments HTML pour afficher le nombre de like sur chaque carte.
 * @param {HTMLElement[]} mediaData[].likeButtons -
 * Les boutons de like pour chaque média.
 * @param {Set<number>} likedMediaIds -
 * Ensemble contenant les identifiants des médias déjà likés.
 */
export function likesPrice(mediaData) {
  const likes = document.querySelector('.photograph-likes');
  const likesButton = document.querySelectorAll('.like-button');
  const likedMediaIds = new Set();

  // Mise à jours de l'affichage des likes
  function updateLikesDisplay() {
    const totalLikes = mediaData.reduce(
      (accumulator, media) => accumulator + media.likes,
      0
    );
    likes.textContent = totalLikes;

    // Mise à jour de l'affichage des likes pour chaque carte
    const cardLikes = document.querySelectorAll('.card-nbr-like');
    cardLikes.forEach((cardLike, index) => {
      cardLike.textContent = mediaData[index].likes;
    });
  }

  // Gérer l'évenement click bouton like
  likesButton.forEach((button, index) => {
    button.addEventListener('click', () => {
      const mediaId = mediaData[index].id;
      if (likedMediaIds.has(mediaId)) {
        mediaData[index].likes -= 1;
        likedMediaIds.delete(mediaId);
        button.classList.remove('liked');
      } else {
        mediaData[index].likes += 1;
        likedMediaIds.add(mediaId);
        button.classList.add('liked');
      }
      // Mise à jour de l'affichage des likes après chaque clic
      updateLikesDisplay();
    });
  });

  // Initialiser l'affichage des likes au chargement de la page
  updateLikesDisplay();
}
