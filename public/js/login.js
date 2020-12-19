const formElement = document.querySelector('form');

const validateFormInputs = async (event) => {
  event.preventDefault();

  const formInputs = [...document.getElementsByClassName('validate')];
  const inputsValidated = formInputs.every((formInput) => formInput.checkValidity());

  if (inputsValidated) {
    const form = event.target;
    const endpoint = form.action;
    const formData = new FormData(form);

    const user = {};
    formData.forEach((value, key) => {
      user[key] = value;
    });

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(user),
      });

      const jsonResponse = await response.json();

      const errorMessageElement = document.querySelector('.error-message');

      if (jsonResponse.success) {
        if (errorMessageElement.classList.contains('display-block')) {
          errorMessageElement.classList.remove('display-block');
        }
        window.location.href = 'https://healthic.herokuapp.com/pages/index';
      } else {
        errorMessageElement.classList.add('display-block');
      }
    } catch (error) {
      console.log(error);
    }
  }
};

formElement.addEventListener('submit', validateFormInputs);
