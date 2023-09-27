export const loginControl = async (modal, loginForm, btnLogin) =>
  new Promise(resolve => {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();

      const formData = new FormData(loginForm);

      modal.style.display = 'none';
      document.body.style.overflow = 'auto';

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
