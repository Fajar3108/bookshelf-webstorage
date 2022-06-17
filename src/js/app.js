import { RENDER_EVENT, SAVED_EVENT } from "./env.js";
import { generateAlertElement } from "./helpers/helper.js";
import { addBook, filterBook, getBooks, loadBooksFromStorage, renderBooks } from "./services/book.js";

const bookForm = document.querySelector('#bookForm');

const searchInput = document.querySelector('#searchInput');

// tabs
const finishedTabBtn = document.querySelector('#finishedTabBtn');
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
    generateAlertElement('success', 'Data di storage telah di perbaharui');
});

document.addEventListener(RENDER_EVENT, () => {
    const status = finishedTabBtn.classList.contains('active');
    let booksToRender = getBooks(status);
    
    if (searchInput.value) booksToRender = filterBook(searchInput.value, status);

    renderBooks(booksToRender, booksWrapper);
});

unfinishedTabBtn.addEventListener('click', () => {
    searchInput.value = '';
    finishedTabBtn.classList.remove('active');
    unfinishedTabBtn.classList.add('active');
    document.dispatchEvent(new Event(RENDER_EVENT));
});

finishedTabBtn.addEventListener('click', () => {
    searchInput.value = '';
    unfinishedTabBtn.classList.remove('active');
    finishedTabBtn.classList.add('active');
    document.dispatchEvent(new Event(RENDER_EVENT));
});

searchInput.addEventListener('keyup', () => {
    document.dispatchEvent(new Event(RENDER_EVENT));
})

document.addEventListener('DOMContentLoaded', () => {
    loadBooksFromStorage();
});
