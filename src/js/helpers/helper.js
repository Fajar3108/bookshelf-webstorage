const generateID = () => +new Date;

const isStorageExist = () => {
    if (typeof (Storage) !== undefined) return true;
    
    alert('Browser tidak mendukung local storage');
    return false;
}

const generateAlertElement = (type, message) => {
    const container = document.querySelector('#bookshelf');
    const alert = document.createElement('div');
    alert.classList.add('alert');
    alert.classList.add(`alert__${type}`);
    alert.innerText = message;

    container.prepend(alert);

    setTimeout(() => {
        container.removeChild(alert);
    }, 3000)
}

export {isStorageExist, generateID, generateAlertElement};