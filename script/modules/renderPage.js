import {createElement, createRow} from './createElements.js';
import {getStorage} from './serviceStorage.js';

export const renderModal = container => {
  const btnLogin = createElement(
      'button',
      {
        className: 'btn btn-primary',
        type: 'submit',
        textContent: 'Войти',
        disabled: '',
      },
  );
  const loginForm = createElement(
      'form',
      {
        className: 'd-flex gap-3',
      },
      {
        appends: [
          createElement(
              'label',
              {
                className: 'form-group',
              },
              {
                appends: [
                  createElement(
                      'input',
                      {
                        type: 'text',
                        className: 'form-control',
                        name: 'name',
                        placeholder: 'Введите ваше имя',
                      },
                  ),
                ],
              },
          ),
          btnLogin,
        ],
      },
  );
  const modal = createElement(
      'div',
      {
        className: 'p-5',
      },
      {
        appends: [
          createElement(
              'h3',
              {
                className: 'mb-5 text-center',
                textContent: 'Здравствуйте!',
              },
          ),
          loginForm,
        ],
      },
  );
  const modalWrapper = createElement(
      'div',
      {},
      {
        parrent: container,
        appends: [
          modal,
        ],
      },
  );

  modalWrapper.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 5;
  `;

  modal.style.cssText = `
    background-color: #fff;
  `;

  return {modalWrapper, loginForm, btnLogin};
};

export const renderPage = container => {
  const title = createElement(
      'h3',
      {
        className: 'text-center mb-4',
        textContent: 'Todo App',
      },
      {
        parrent: container,
      },
  );
  const btnAdd = createElement(
      'button',
      {
        type: 'submit',
        className: 'btn btn-primary w-100 me-2',
        disabled: ' ',
        textContent: 'Сохранить',
      },
  );
  const form = createElement(
      'form',
      {
        className: 'row mb-3',
      },
      {
        parrent: container,
        appends: [
          createElement(
              'label',
              {
                className: 'form-group col mb-3 mb-md-0',
              },
              {
                appends: [
                  createElement(
                      'input',
                      {
                        type: 'text',
                        className: 'form-control',
                        name: 'task',
                        placeholder: 'Введите задачу',
                      },
                  ),
                ],
              },
          ),
          createElement(
              'div',
              {
                className: 'col-12 col-sm-6 col-md-3 mb-3 mb-md-0',
              },
              {
                appends: [
                  createElement(
                      'select',
                      {
                        className: 'form-select',
                        name: 'importance',
                        ariaLabel: 'Выберете важность задачи',
                      },
                      {
                        appends: [
                          createElement(
                              'option',
                              {
                                textContent: 'Обычная',
                                value: 'table-light',
                                selected: '',
                              },
                          ),
                          createElement(
                              'option',
                              {
                                textContent: 'Важная',
                                value: 'table-warning',
                              },
                          ),
                          createElement(
                              'option',
                              {
                                textContent: 'Срочная',
                                value: 'table-danger',
                              },
                          ),
                        ],
                      },
                  ),
                ],
              },
          ),
          createElement(
              'div',
              {
                className: 'col-12 col-md-auto d-flex',
              },
              {
                appends: [
                  btnAdd,
                  createElement(
                      'button',
                      {
                        type: 'reset',
                        className: 'btn btn-warning w-100 ms-3',
                        textContent: 'Очистить',
                      },
                  ),
                ],
              },
          ),
        ],
      },
  );

  const tableWrapper = createElement(
      'div',
      {
        className: 'table-wrapper',
      },
      {
        parrent: container,
      },
  );

  const table = createElement(
      'table',
      {
        className: 'table table-hover table-bordered',
      },
      {
        parrent: tableWrapper,
      },
  );

  const thead = createElement(
      'thead',
      {},
      {
        parrent: table,
        appends: [
          createElement(
              'tr',
              {},
              {
                appends: [
                  createElement('th', {textContent: '№'}),
                  createElement('th', {textContent: 'Задача'}),
                  createElement('th', {textContent: 'Статус'}),
                  createElement('th', {textContent: 'Действия'}),
                ],
              },
          ),
        ],
      },
  );

  const tbody = createElement(
      'tbody',
      {},
      {
        parrent: table,
      },
  );

  container.classList.add(
      'container-lg',
      'pt-5',
  );

  return {title, form, btnAdd, tbody};
};

export const renderRow = (data, tbody, count = 0) => {
  tbody.append(createRow(data, count));
};

export const renderTable = (user, tbody) => {
  const data = getStorage('todo');

  if (data) {
    const userData = data.hasOwnProperty(user) ? data[user] : null;
    if (userData) {
      const elems = Object.entries(userData);

      for (const [key, value] of elems) {
        tbody.append(createRow(value, +key + 1));
      }
    }
  }
};
