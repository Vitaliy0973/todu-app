const setAttributes = (elem, obj) => {
  const possibleAttr = ['textContent', 'id', 'href', 'target', 'name', 'for',
    'value', 'type', 'min', 'max', 'placeholder', 'ariaLabel', 'style'];
  const attrKeys = Object.keys(obj);

  for (const key of attrKeys) {
    if (key === 'className' && obj[key] !== '') {
      elem[key] = obj[key];
    }

    if (possibleAttr.includes(key)) {
      elem[key] = obj[key];
    }

    if (key === 'dataset') {
      elem[key][obj[key][0]] = obj[key][1];
    }

    if (key === 'innerHTML') {
      elem.innerHTML = obj[key];
    }

    if (key === 'disabled') {
      elem.setAttribute(key, '');
    }

    if (key === 'selected') {
      elem.setAttribute(key, '');
    }
  }
};

const setRelatives = (elem, obj) => {
  const relativesKeys = Object.keys(obj);

  for (const key of relativesKeys) {
    if (typeof obj[key] === 'function') {
      obj[key](elem);
    }

    if (key === 'parrent') {
      obj[key].append(elem);
    }

    if (key === 'appends') {
      obj[key].forEach(item => elem.append(item));
    }
  }
};

export const createElement = (selector, attributes, relatives) => {
  const elem = document.createElement(selector);

  if (attributes) {
    setAttributes(elem, attributes);
  }

  if (relatives) {
    setRelatives(elem, relatives);
  }

  return elem;
};

export const createRow = (data, count) => {
  const tr = createElement(
      'tr',
      {
        dataset: ['id', data.id],
        className: data.status ? data.importance : 'table-success',
      },
      {
        appends: [
          createElement(
              'td',
              {
                textContent: count,
              },
          ),
          createElement(
              'td',
              {
                className: data.status ? 'task-name' :
              'task-name text-decoration-line-through',
                textContent: data.task,
              },
          ),
          createElement(
              'td',
              {
                className: 'task-status',
                textContent: data.status ? 'В процессе' : 'Выполнена',
              },
          ),
          createElement(
              'td',
              {
                className: 'd-flex flex-wrap gap-2',
              },
              {
                appends: [
                  createElement(
                      'button',
                      {
                        className: 'btn btn-primary btn--edit',
                        textContent: 'Редактировать',
                      },
                  ),
                  createElement(
                      'button',
                      {
                        className: 'btn btn-danger btn--del',
                        textContent: 'Удалить',
                      },
                  ),
                  createElement(
                      'button',
                      {
                        className: 'btn btn-success btn--completed',
                        textContent: 'Завершить',
                      },
                  ),
                ],
              },
          ),
        ],
      },
  );

  return tr;
};
