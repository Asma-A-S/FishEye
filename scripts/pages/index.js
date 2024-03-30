class App {
    constructor() {
        this.$photographersSection = document.querySelector('.photographer_section');
        this.photographersApi = new photographersApi("/data/photographers.json");
    }

    async main() {
        try {
            const photographers = await this.photographersApi.getPhotographers();
            this.displayData(photographers);
        } catch (error) {
            console.error('Error fetching photographers:', error);
        }
    }
    displayData(photographers) {
        photographers.forEach((photographerData) => {
            const photographer = new Photographer(photographerData);
            const template = new PhotographerTemplate(photographer);
            const { profileLink, photographerPrice } = template.getUserCardDOM();
            profileLink.appendChild(photographerPrice)
            this.$photographersSection.appendChild(profileLink);

        });
    }
}

const app = new App();
app.main();

/*class App {
    constructor(){
        this.$photographersSection = document.querySelector('.photographer_section')
        this.photographersApi = new photographersApi("/data/photographers.json")
    }
    async main(){
        const photographers = await this.photographersApi.getPhotographers()
        console.log(photographers)

        photographers
        .map(photographer => new Photographer(photographer))
        .forEach(photographer => {
            const template = new PhotographerCard(photographer)
            this.$photographersSection.appendChild(template.createPhotographerCard()
            )
        });
    }
}
 const app = new App()
 app.main()

*/

/*const api = new Api("/data/photographers.json")
async function getPhotographers() {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        const reponse = await fetch("/data/photographers.json")
        const pp = await reponse.json()
        console.log(pp)
        // et bien retourner le tableau photographers seulement une fois récupéré
        }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    */
