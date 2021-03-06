const saveToLocalStorage = (itemName, item) => {
  console.log("Saving to local", itemName, item);
  if (item) {
    localStorage.setItem(itemName, JSON.stringify(item));
  }
};

const getFromLocalStorage = (itemName) => {
  console.log("Fetching from local: ", itemName);
  const item = localStorage.getItem(itemName);

  if (item) {
    return JSON.parse(item);
  }
};

export { saveToLocalStorage, getFromLocalStorage };
