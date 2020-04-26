export function addItemToLocalStorage (item) {
    
}

export function removeItemFromLocalStorage (item) {

}

export function fetchItemFromLocalStorage (itemName) {
    let item = localStorage.getItem(itemName);

    if(item) {
        return JSON.parse(item);
    } else {
        localStorage.setItem(itemName, '[]');
        return JSON.parse(localStorage.getItem(itemName));
    }
}

export function updateItemInLocalStorage (itemName, value) {
    let storedItem = fetchItemFromLocalStorage(itemName),
        updatedItems = [];

    if(storedItem && storedItem.includes(value)) {
        return;
    }

    updatedItems = storedItem ? [...storedItem, value] : [value];

    localStorage.setItem(itemName, JSON.stringify(updatedItems));
}