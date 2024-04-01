/*export function likesPrice(photographerData, mediaData) {
    const likes = document.querySelector(".photograph-likes")
    const price = document.querySelector(".photograph-price")
    let likesButton = document.querySelectorAll(".like-button")
    let likedMediaIds = new Set();
    console.log("likesButton", likesButton)

    likesButton.forEach((button, index) => {
        button.addEventListener('click', () => {
            mediaData[index].likes += 1;
            const mediaId = mediaData[index].id;
            // Vérifie si le média a déjà été liké
            if (!likedMediaIds.has(mediaId)) {
                // Incrémente le nombre de likes du média
                mediaData[index].likes++;
                // Ajoute l'ID du média à l'ensemble des médias likés
                likedMediaIds.add(mediaId);
                // Met à jour le nombre total de likes
                const updatedTotalLikes = mediaData.reduce(
                    (accumulator, media) => accumulator + media.likes,
                    initialLike);
                likes.innerHTML = `${updatedTotalLikes}`;
            }
        });
    });
    const allLikes = mediaData.map(el => el.likes);

    let initialLike = 0;
    const totalLikes = allLikes.reduce(
        (accumulator, currentLike) => accumulator + currentLike,
        initialLike);
        console.log("total", totalLikes)
    price.innerHTML = `${photographerData.price}€ /jour`
    likes.innerHTML = `${totalLikes}`
}
*/
/*export function likesPrice(photographerData, mediaData) {
    const likes = document.querySelector(".photograph-likes");
    const price = document.querySelector(".photograph-price");
    let likesButton = document.querySelectorAll(".like-button");
    let likedMediaIds = new Set();

    likesButton.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Incrémente le nombre de likes du média
            mediaData[index].likes += 1;
            // Met à jour le nombre de likes affiché sur la carte
            const cardLikes = document.querySelectorAll(".card-nbr-like");
            cardLikes[index].textContent = mediaData[index].likes;
            
            // Met à jour le nombre total de likes
            const updatedTotalLikes = mediaData.reduce(
                (accumulator, media) => accumulator + media.likes,
                0);
            likes.textContent = updatedTotalLikes;
        });
    });
    const allLikes = mediaData.map(el => el.likes);
    const initialLike = 0;
    const totalLikes = allLikes.reduce(
        (accumulator, currentLike) => accumulator + currentLike,
        initialLike);
    console.log("total", totalLikes);
    price.innerHTML = `${photographerData.price}€ /jour`;
    likes.innerHTML = `${totalLikes}`;
}*/
export function likesPrice(photographerData, mediaData) {
    const likes = document.querySelector(".photograph-likes");
    const price = document.querySelector(".photograph-price");
    let likesButton = document.querySelectorAll(".like-button");
    let likedMediaIds = new Set();

    likesButton.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Vérifie si le média a déjà été liké
            const mediaId = mediaData[index].id;
            if (likedMediaIds.has(mediaId)) {
                // Si le média a déjà été liké, ne faites rien
                return;
            }

            // Incrémente le nombre de likes du média
            mediaData[index].likes += 1;
            // Met à jour le nombre de likes affiché sur la carte
            const cardLikes = document.querySelectorAll(".card-nbr-like");
            cardLikes[index].textContent = mediaData[index].likes;
            
            // Met à jour le nombre total de likes
            const updatedTotalLikes = mediaData.reduce(
                (accumulator, media) => accumulator + media.likes,
                0);
            likes.textContent = updatedTotalLikes;

            // Ajoute l'ID du média à l'ensemble des médias likés
            likedMediaIds.add(mediaId);

            // Désactive le bouton de like
            button.disabled = true;
            // Facultatif : changez l'apparence du bouton pour indiquer qu'il a été liké
            button.classList.add('liked');
        });
    });
    const allLikes = mediaData.map(el => el.likes);
    const initialLike = 0;
    const totalLikes = allLikes.reduce(
        (accumulator, currentLike) => accumulator + currentLike,
        initialLike);
    console.log("total", totalLikes);
    price.innerHTML = `${photographerData.price}€ /jour`;
    likes.innerHTML = `${totalLikes}`;
}