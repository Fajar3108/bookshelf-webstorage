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

const findBookIndex = (id) => {
    let index;
    books.forEach((item, i) => {
        if (item.id == id) {
            index = i;
        }
    });

    return index;
}

const updateStatusBook = (id, status) => {
    const targetIndex = findBookIndex(id);
    books[targetIndex].isFinished = status;

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveBook();
}

const removeBook = (id) => {
    const targetIndex = findBookIndex(id);
    books.splice(targetIndex, 1);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveBook();
}

const loadBooksFromStorage = () => {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    const data = JSON.parse(serializedData);
    if (!data) return;

    data.forEach((book) => books.push(book));

    document.dispatchEvent(new Event(RENDER_EVENT));
}

const createBookCard = ({id, title, author, year, isFinished}) => {
    const card = document.createElement('div');
    card.classList.add('book__card');

    const textTitle = document.createElement('h4');
    textTitle.innerText = title;
    textTitle.classList.add('book__title');

    card.append(textTitle);

    card.innerHTML += `
        <table class="book__info">
            <tr>
                <td width="100px">Author</td>
                <td>${author}</td>
            </tr>
            <tr>
                <td width="100px">Year</td>
                <td>${year}</td>
            </tr>
        </table>
    `;

    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.classList.add('book__buttons');

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
        removeBook(id);
    });

    if (!isFinished) {
        const finishButton = document.createElement('button');
        finishButton.textContent = 'Finish';
        finishButton.addEventListener('click', () => {
            updateStatusBook(id, true);
        });

        buttonsWrapper.append(finishButton, removeButton);
    } else {
        const unFinishButton = document.createElement('button');
        unFinishButton.textContent = 'Unfinish';
        unFinishButton.addEventListener('click', () => {
            updateStatusBook(id, false);
        });
        buttonsWrapper.append(unFinishButton, removeButton);
    }

    card.append(buttonsWrapper);

    return card;
}

const renderBooks = (books, wrapper) => {
    wrapper.innerHTML = "";
    books.forEach((book) => {
        const bookCard = createBookCard(book); 
        wrapper.append(bookCard);
    });
}

export {
    addBook, getBooks, renderBooks, loadBooksFromStorage
}