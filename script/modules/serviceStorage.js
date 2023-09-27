export const getStorage = (key) => JSON.parse(localStorage.getItem(key));

export const setStorage = (key, user, data) => {
  const storageData = getStorage(key);
  storageData[user].push(data);
  localStorage.setItem(key, JSON.stringify(storageData));
};

export const getUserStorage = (key, user) => {
  const storageData = getStorage(key);
  if (!storageData.hasOwnProperty(user)) {
    storageData[user] = [];
    localStorage.setItem(key, JSON.stringify(storageData));
  }
  return storageData[user];
};

export const getTaskDataStorage = (key, user, id) => {
  const storageData = getStorage(key);
  return storageData[user].find(item => item.id === id);
};

export const changeTaskDataStorage = (key, user, data) => {
  const storageData = getStorage(key);
  const taskStorage = storageData[user].find(item => item.id === data.id);
  Object.assign(taskStorage, data);
  localStorage.setItem(key, JSON.stringify(storageData));
};

export const delTaskStorage = (key, user, id) => {
  const storageData = getStorage(key);
  const newUserData = storageData[user].filter(item => item.id !== id);
  storageData[user] = newUserData;
  localStorage.setItem(key, JSON.stringify(storageData));
};

export const removeStorage = (key, user = 0) => {
  if (user) {
    const storageData = getStorage(key);
    delete storageData[user];
    localStorage.setItem(key, JSON.stringify(storageData));
    return;
  }
  localStorage.removeItem(key);
};
