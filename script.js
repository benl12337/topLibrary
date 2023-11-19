// Keep track of the library of books
const myLibrary = [];

// define buttons
const addBook = document.getElementById('addBook');
const submit = document.getElementById('submitForm');
const cancel = document.getElementById('cancelForm');
// define other selected variables
const grid = document.querySelector('.grid-container');
const dialog = document.querySelector('dialog');
const form = document.querySelector('form');

function Book(title, author, pages, read) {
    // the constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {

    // first push it to the array
    myLibrary.push(book);

    // loop through the array and add divs
    updateGrid();
}

function updateGrid() {
    // loop through the array
    grid.innerHTML = "";
    for (const currentBook of myLibrary) {
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
            updateReadStatus(currentBook);
        });
        bookCard.querySelector('#readStatus').innerText = currentBook.read ? 'Read' : 'Not Read';
        bookCard.querySelector('#readStatus').className = currentBook.read ? 'read' : 'notRead';
        bookCard.querySelector('#delete').addEventListener('click', () => {
            removeBook(currentBook);
        });

        bookCard.classList.add('card');

        grid.appendChild(bookCard);
    }
}

function updateReadStatus(book) {
    book.read = book.read ? false : true;
    updateGrid();
}

function removeBook(book) {
    // search through for the book title and pop it from myLibrary
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title == book.title && myLibrary[i].author == book.author) {
            myLibrary.splice(i, 1);
            break;
        }
    }
    updateGrid();
}

addBook.addEventListener('click', () => {
    dialog.showModal();
});

cancel.addEventListener('click', () => {
    dialog.close();
});

submit.addEventListener('click', (event) => {
    event.preventDefault();

    // defining all the form inputs
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const pages = document.getElementById('bookPages').value;
    const read = document.querySelector('#radio-read').checked ? true : false;
    console.log("read:" + read);

    // create book
    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);
    dialog.close();
    form.reset();
});


// Test case to add book
const testBook = new Book("Harry Potter", "J.K. Rowling", 345, true);
addBookToLibrary(testBook);
console.log(myLibrary);





