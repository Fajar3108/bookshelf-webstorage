import { RENDER_EVENT, SAVED_EVENT } from "./env.js";
import { addBook, getBooks, loadBooksFromStorage, renderBooks } from "./services/book.js";

const bookForm = document.querySelector('#bookForm');

// tabs
const finishedTabsBtn = document.querySelector('#finishedTabBtn');
const unfinishedTabBtn = document.querySelector('#unfinishedTabBtn');

// Wrapper
const booksWrapper = document.querySelector('#books');

const getBookInput = () => {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const year = document.querySelector('#year').value;
    const isFinished = document.querySelector('#isFinished').checked;

    return { title, author, isFinished, year };
}

bookForm.addEventListener('submit', (e) => {
    const {title, author, isFinished, year} = getBookInput();

    addBook(title, author, year, isFinished);

    e.preventDefault();
});

document.addEventListener(SAVED_EVENT, () => {
    alert('Berhasil menambahkan buku');
});

document.addEventListener(RENDER_EVENT, () => {
    const booksToRender = getBooks(finishedTabsBtn.classList.contains('active'));
    renderBooks(booksToRender, booksWrapper);
});

document.addEventListener('DOMContentLoaded', () => {
    loadBooksFromStorage();
});