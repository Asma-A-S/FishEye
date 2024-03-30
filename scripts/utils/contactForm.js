function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    const lightbox = document.getElementById("lightbox");
    lightbox
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "none";
}

//récupérer les données du formulaires
let firstName = document.getElementById("first");
console.log("prenom", firstName)
let lastName = document.getElementById("last");
let email = document.getElementById("email");
let message = document.getElementById("message");

function errorMessage(champ, message) {
    let formData = champ.closest(".formData");
    if (formData) {
      formData.setAttribute("data-error", message);
      if (message) {
        formData.setAttribute("data-error-visible", "true");
      } else {
        formData.removeAttribute("data-error-visible");
      }
    }
  }


function firstNameValid(firstName) {
    let value = firstName.value.trim();
    if (value.length < 2) {
      errorMessage(
        firstName,
        "Le prénom doit avoir au moins deux caractères"
      );
      return false
    } else {
      errorMessage(firstName, "");
      return true
    }
  }

  function lastNameValid(lastName) {
    let value = lastName.value.trim();
    if (value.length < 2) {
      errorMessage(lastName, "Le nom doit avoir au moins deux caractères");
      return false;
    } else {
      errorMessage(lastName, "");
      return true;
    }
  }

  function emailValid(email) {
    if (!email.checkValidity() || email.value === "") {
      //utiliser checkValidity fonction intégrée pour valider l'email
      errorMessage(email, "EMAIL NON VALID");
      return false;
    } else {
      errorMessage(email, "");
      return true;
    }
  }

  function messageValid(message) {
    if (message === ""){
        errorMessage(message, "EMAIL NON VALID");
      return false;
    } else {
        errorMessage(email, "");
        return true;
      }
  }

  function validationForm(){
    let isValid = true
    isValid &= firstNameValid(firstName);
    isValid &= lastNameValid(lastName);
    isValid &= emailValid(email);
    isValid &= messageValid(message);
    return isValid;
  }
let form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    try{
      if(validationForm()){
        console.log('prénom', firstName.value)
        console.log('nom', lastName.value)
        console.log('email', email.value)
        console.log('message', message.value)
      }
  } catch (erreur) {
   // Afficher l'erreur dans la console
      errorMessage(erreur.champ, erreur.message); // Afficher le message d'erreur sous le champ concerné
    }; 
  });