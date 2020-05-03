export function fetchItemObjFromLocalStorage (itemName) {
    let item = localStorage.getItem(itemName);

    if(item) {
        return JSON.parse(item);
    } else {
        localStorage.setItem(itemName, '{}');
        return JSON.parse(localStorage.getItem(itemName));
    }
}

export function setItemObjInLocalStorage (itemName) {
    let item = localStorage.getItem(itemName);

    if(item) {
        return JSON.parse(item);
    } else {
        localStorage.setItem(itemName, '{}');
        return JSON.parse(localStorage.getItem(itemName));
    }
}

export function updateHiddenStoriesInLocalStorage (itemName, value) {
    let storedItems = fetchItemObjFromLocalStorage(itemName);

    if(storedItems && storedItems[value]) {
        return;
    }

    storedItems[value] =  1;

    localStorage.setItem(itemName, JSON.stringify(storedItems));
}

export function updateVotedStoriesInLocalStorage (itemName, value) {
    let storedItems = fetchItemObjFromLocalStorage(itemName);

    if(storedItems && storedItems[value]) {
        storedItems[value].count += 1;
    } else {
        storedItems[value] = {};
        storedItems[value].count = 1;
    }

    localStorage.setItem(itemName, JSON.stringify(storedItems));
}