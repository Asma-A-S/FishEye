function displayModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'block';
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'none';
  modal.focus();
  document.addEventListener('keydown', closeModalOnEscape);
}

function closeModalOnEscape(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}
function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'none';
  document.removeEventListener('keydown', closeModalOnEscape);
}
const form = document.getElementById('contact_form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  // Récupérer les valeurs des champs du formulaire
  const firstName = document.getElementById('first').value.trim();
  const lastName = document.getElementById('last').value.trim();
  const email = document.getElementById('email');
  const message = document.getElementById('message').value.trim();

  // Réinitialiser les styles des champs et les messages d'erreur
  resetForm();

  // Vérifier les champs et afficher les messages d'erreur si nécessaire
  firstNameValid(firstName);
  lastNameValid(lastName);
  emailValid(email);
  messageValid(message);

  // Si le formulaire est valide, vous pouvez envoyer les données
  if (isValidForm(firstName, lastName, email, message)) {
    console.log('Formulaire valide. Envoi des données...');
    console.log(
      'Prenom : ' +
        firstName +
        ', Nom : ' +
        lastName +
        ', Email : ' +
        email.value +
        ', Message : ' +
        message
    );
    form.reset();
    closeModal();
    // Ajoutez ici le code pour envoyer les données à votre serveur
  } else {
    console.log('Le formulaire contient des erreurs. Veuillez corriger.');
  }
});

window.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    // Vérifier si le formulaire est en cours de soumission
    /*if (document.activeElement.tagName.toLowerCase() !== 'input') {
      // Si le formulaire n'a pas le focus sur un champ de saisie, soumettre le formulaire
      document.getElementById('contact_form').submit();
    }*/
    if (!form.checkValidity()) {
      // Si le formulaire n'est pas valide, soumettre le formulaire
      form.submit();
    }
  }
});
function resetForm() {
  document.querySelectorAll('.text-control').forEach((input) => {
    input.classList.remove('invalid-input');
    input.placeholder = ''; // Supprime les placeholders d'erreur
  });

  document.querySelectorAll('.error-message').forEach((error) => {
    error.style.display = 'none';
  });
}

function displayErrorMessage(fieldId, errorMessage) {
  const field = document.getElementById(fieldId);
  field.classList.add('invalid-input');
  field.placeholder = errorMessage;
}

function firstNameValid(firstName) {
  if (firstName.length < 2) {
    displayErrorMessage(
      'first',
      'Le prénom doit contenir au moins 2 caractères.'
    );
  }
}

function lastNameValid(lastName) {
  if (lastName.length < 2) {
    displayErrorMessage('last', 'Le nom doit contenir au moins 2 caractères.');
  }
}

function emailValid(email) {
  if (!email.checkValidity() || email.value === '') {
    displayErrorMessage('email', 'Veuillez saisir une adresse e-mail valide.');
  }
}

function messageValid(message) {
  if (message.length < 2) {
    displayErrorMessage(
      'message',
      'Le message doit contenir au moins 2 caractères.'
    );
  }
}

function isValidForm(firstName, lastName, email, message) {
  return (
    firstName.length >= 2 &&
    lastName.length >= 2 &&
    email.checkValidity() &&
    message.length >= 2
  );
}
