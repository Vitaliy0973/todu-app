import {renderRow} from './renderPage.js';
import {setStorage} from './serviceStorage.js';
import {getId} from './secondaryFunction.js';

const sendFormData = (form, btnAdd, user, tbody) => {
  const formData = new FormData(form);

  const task = {
    id: getId(user),
    task: formData.get('task'),
    status: 1,
    importance: formData.get('importance'),
  };

  setStorage('todo', user, task);
  renderRow(task, tbody, tbody.rows.length + 1);

  btnAdd.disabled = true;
  form.reset();
};

export const formControl = (form, btnAdd, user, tbody) => {
  form.task.addEventListener('keydown', e => {
    if (e.key === 'Enter' && form.task.value) {
      form.task.blur();
      sendFormData(form, btnAdd, user, tbody);
    }
  });

  form.addEventListener('submit', e => {
    e.preventDefault(e);

    sendFormData(form, btnAdd, user, tbody);
  });

  form.task.addEventListener('input', e => {
    if (btnAdd.disabled) {
      btnAdd.disabled = false;
    }
    if (!form.task.value) {
      btnAdd.disabled = true;
    }
  });

  form.addEventListener('reset', e => {
    btnAdd.disabled = true;
  });
};
