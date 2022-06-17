const generateID = () => +new Date;

const isStorageExist = () => {
    if (typeof (Storage) !== undefined) return true;
    
    alert('Browser tidak mendukung local storage');
    return false;
}

export {isStorageExist, generateID};