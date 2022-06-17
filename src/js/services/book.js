import { RENDER_EVENT, SAVED_EVENT, STORAGE_KEY } from "../env.js";
import {isStorageExist, generateID} from "../helpers/helper.js";

const books = [];

const generateBookObject = (id, title, author, year, isFinished) => ({
    id, title, author, year, isFinished
});

const validateBook = ({ title, author, year }) => {
    if (title && author && year) return true;

    alert('Data tidak boleh kosong');
    return false;
}

const saveBook = () => {
    if (!isStorageExist()) return;

    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
}

const addBook = (title, author, year, isFinished = false) => {
    const id = generateID();
    const book = generateBookObject(id, title, author, year, isFinished);

    if (!validateBook(book)) return;

    books.push(book);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveBook();
}

const getBooks = (isFinished) => {
    return books.filter((book) => book.isFinished == isFinished);;
}

const loadBooksFromStorage = () => {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    const data = JSON.parse(serializedData);
    if (!data) return;

    data.forEach((book) => books.push(book));

    document.dispatchEvent(new Event(RENDER_EVENT));
}   

const renderBooks = (books) => {
    // console.log(books);
}

export {
    addBook, getBooks, renderBooks, loadBooksFromStorage
}