class App {
  constructor() {
    this.$photographersSection = document.querySelector(
      '.photographer_section'
    );
    this.photographersApi = new photographersApi('data/photographers.json');
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
      profileLink.appendChild(photographerPrice);
      this.$photographersSection.appendChild(profileLink);
    });
  }
}

const app = new App();
app.main();
