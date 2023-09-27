import {container} from './modules/getElements.js';
import {renderModal, renderPage, renderTable} from './modules/renderPage.js';
import {formControl} from './modules/controlForm.js';
import {tableControl} from './modules/controlTable.js';
import {loginControl} from './modules/controlLogin.js';

const init = async () => {
  const {modalWrapper, loginForm, btnLogin} = renderModal(container);
  const {form, btnAdd, tbody} = renderPage(container);


  document.documentElement.style.height = '100%';
  document.body.style.cssText = 'height: 100%; overflow: hidden;';
  container.style.cssText = 'position: relative;';

  const user = (await loginControl(modalWrapper, loginForm, btnLogin))
      .toLowerCase().trim();
  renderTable(user, tbody);
  formControl(form, btnAdd, user, tbody);
  tableControl(tbody, user);
};

init();
