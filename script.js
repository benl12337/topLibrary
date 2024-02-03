// define buttons
const addBook = document.getElementById('addBook');
const submit = document.getElementById('submitForm');
const cancel = document.getElementById('cancelForm');
// define other selected variables
const grid = document.querySelector('.grid-container');
const dialog = document.querySelector('dialog');
const form = document.querySelector('form');


class Library {
    constructor() {
        this._myLibrary = [];
    }

    addBookToLibrary(book) {
        this._myLibrary.push(book);
        this.updateGrid();
    }

    updateReadStatus(book) {
        book.read = book.read ? false : true;
        this.updateGrid();
    }

    removeBook(book) {
        for (let i = 0; i < this._myLibrary.length; i++) {
            if (this._myLibrary[i].title == book.title && this._myLibrary[i].author == book.author) {
                this._myLibrary.splice(i, 1);
                break;
            }
        }
        this.updateGrid();
    }

    get myLibrary() {
        return this._myLibrary;
    }

    updateGrid() {
        grid.innerHTML = "";
        for (const currentBook of this._myLibrary) {
            const bookCard = document.createElement('div');
            bookCard.innerHTML = `
        <h4 id='author'></h4>
        <div id='title-div'><h2 id='title'></h2></div>
        <h4 id='pages'></h4>
        <div><h4 id='readStatus'></h4><img src="trashcan.svg" width="15px" id='delete'></div>
        `;

            bookCard.querySelector('#author').innerText = currentBook.author;
            bookCard.querySelector('#title').innerText = currentBook.title;
            bookCard.querySelector('#pages').innerText = currentBook.pages + ' pages';
            bookCard.querySelector('#readStatus').addEventListener('click', () => {
                this.updateReadStatus(currentBook);
            });
            bookCard.querySelector('#readStatus').innerText = currentBook.read ? 'Read' : 'Not Read';
            bookCard.querySelector('#readStatus').className = currentBook.read ? 'read' : 'notRead';
            bookCard.querySelector('#delete').addEventListener('click', () => {
                this.removeBook(currentBook);
            });

            bookCard.classList.add('card');
            grid.appendChild(bookCard);
        }
    }
}

class Book {
    constructor(title = "Harry Potter", author = "J.K Rowling", pages = 345, read = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

submit.addEventListener('click', (event) => {

    // logic for handling validation
    const title = document.getElementById('bookTitle');
    const author = document.getElementById('bookAuthor');
    const pages = document.getElementById('bookPages');

    if (title.validity.valueMissing || author.validity.valueMissing || pages.validity.valueMissing) {
        return;
    }
    event.preventDefault();

    

    // defining all the form inputs
    const read = document.querySelector('#radio-read').checked ? true : false;

    // create book
    const newBook = new Book(title.value, author.value, pages.value, read);
    testLibrary.addBookToLibrary(newBook);
    dialog.close();
    form.reset();
});


addBook.addEventListener('click', () => {
    dialog.showModal();
});

cancel.addEventListener('click', () => {
    dialog.close();
});


// Test case to add book
const testLibrary = new Library();
const testBook = new Book();
testLibrary.addBookToLibrary(testBook);




