import {getRowCell, getTaskId, getTaskRow} from './secondaryFunction.js';
import {
  changeTaskDataStorage,
  delTaskStorage,
  getTaskDataStorage,
} from './serviceStorage.js';

const taskEditControl = (taskName, user, taskId) => {
  taskName.addEventListener('blur', () => {
    const taskData = getTaskDataStorage('todo', user, taskId);

    taskData.task = taskName.textContent;
    changeTaskDataStorage('todo', user, taskData);
    taskName.setAttribute('contenteditable', false);
  });
};

const taskEdit = (e, user, tbody) => {
  if (e.target.closest('.btn--edit')) {
    const taskId = getTaskId(e.target);
    const tr = getTaskRow(tbody, taskId);
    const taskName = getRowCell(tr, 'task-name');

    taskName.setAttribute('contenteditable', true);
    taskName.focus();

    taskEditControl(taskName, user, taskId);
  }
};

const taskDel = (e, user, tbody) => {
  if (!e.target.closest('.btn--del')) {
    return;
  }

  if (confirm('Вы уверены, что хотите удалить задачу?')) {
    const taskId = getTaskId(e.target);
    e.target.closest('tr').remove();
    delTaskStorage('todo', user, taskId);

    Array.from(tbody.rows).forEach((item, index) => {
      item.firstChild.textContent = index + 1;
    });
  }
};

const taskComleted = (e, user, tbody) => {
  if (e.target.closest('.btn--completed')) {
    const taskId = getTaskId(e.target);
    const tr = getTaskRow(tbody, taskId);
    const taskName = getRowCell(tr, 'task-name');
    const taskStatus = getRowCell(tr, 'task-status');
    const taskDataStorage = getTaskDataStorage('todo', user, taskId);

    tr.className = 'table-success';
    taskName.classList.add('text-decoration-line-through');
    taskStatus.textContent = 'Выполнена';
    taskDataStorage.status = 0;
    changeTaskDataStorage('todo', user, taskDataStorage);
  }
};

export const tableControl = (tbody, user) => {
  tbody.addEventListener('click', e => {
    taskEdit(e, user, tbody);
    taskDel(e, user, tbody);
    taskComleted(e, user, tbody);
  });
};
