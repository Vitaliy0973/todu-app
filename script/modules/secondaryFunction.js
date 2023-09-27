import {getUserStorage} from './serviceStorage.js';

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getId = (user) => {
  const id = getRandomIntInclusive(1, 999999999);

  if (getUserStorage('todo', user).find(item => item.id === id)) {
    return getId(user);
  }
  return id;
};

export const getTaskId = (target) => +target.closest('tr').dataset.id;

export const getTaskRow = (tbody, id) => Array.from(tbody.rows)
    .find(item => +item.dataset.id === id);

export const getRowCell = (row, className) => Array.from(row.cells)
    .find(item => item.classList.contains(className));
