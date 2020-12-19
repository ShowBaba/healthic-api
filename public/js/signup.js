const formElement = document.querySelector('form');

const validatePasswords = () => {
  const passwordInputs = [
    ...document.querySelectorAll('input[type="password"]'),
  ];
  return passwordInputs[0].value === passwordInputs[1].value;
};

const validateFormInputs = async (event) => {
  event.preventDefault();

  const formInputs = [...document.getElementsByClassName('validate')];
  const inputsValidated = formInputs.every((formInput) => formInput.checkValidity());
  if (inputsValidated && validatePasswords()) {
    const form = event.target;
    const endpoint = form.action;
    const formData = new FormData(form);

    const user = {};
    formData.forEach((value, key) => {
      user[key] = value;
    });

    delete user.terms;
    delete user['confirm-password'];
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(user),
      });

      const jsonResponse = await response.json();

      const feedbackMessageElement = document.querySelector(
        '.feedback-message'
      );

      if (jsonResponse.success) {
        if (feedbackMessageElement.classList.contains('display-block')) {
          feedbackMessageElement.classList.remove('display-block');
        } else {
          feedbackMessageElement.classList.add('display-block');
        }

        setTimeout(
          () => (window.location.href = 'https://healthic.herokuapp.com/pages/login'),
          3000
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
};

formElement.addEventListener('submit', validateFormInputs);
