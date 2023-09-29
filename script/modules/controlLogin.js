export const loginControl = async (modal, loginForm, btnLogin, title) =>
  new Promise(resolve => {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();

      const formData = new FormData(loginForm);

      modal.style.display = 'none';
      document.body.style.overflow = 'auto';

      title.textContent += ` пользователя ${formData.get('name')[0]
          .toUpperCase() + formData.get('name').slice(1)}`;

      resolve(formData.get('name'));
    });

    loginForm.name.addEventListener('input', e => {
      if (btnLogin.disabled) {
        btnLogin.disabled = false;
      }
      if (!loginForm.name.value) {
        btnLogin.disabled = true;
      }
    });
  });
