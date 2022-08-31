// const container = document.querySelector('.container');

// New book button and div elements : nB = newBook
const nBBtn = document.querySelector('.btn-new-book');
const nBContainer = document.querySelector('.new-book-container');

// Form and form elements
const nBForm = document.querySelector('.new-book-form');
const nBCloseFormBtn = document.querySelector('.btn-close-form');
const nBTitle = document.querySelector('#new_book_title');
const nBAuthor = document.querySelector('#new_book_author');
const nBHasRead = document.querySelector('#new_book_read');
// const nBSubmitBtn = document.querySelector('.btn-submit-book');

const libraryContainer = document.querySelector('.library-container');

// Open form
nBBtn.addEventListener('click', nBBtnClickOpenModal);

// Close form
nBCloseFormBtn.addEventListener('click', closeModal);
window.addEventListener('click', closeModalWindow);
window.addEventListener('keydown', closeModalWindow);

// Add new book
nBForm.addEventListener('submit', submitNewBookForm);

/* ///////////////////////////////// */
// BOOK
/* ///////////////////////////////// */

class Book {
  constructor(title, author, haveRead) {
    this.title = title;
    this.author = author;
    this.haveRead = haveRead;
  }

  createAndAddBookToDisplay(libraryBooks) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    const divider1 = document.createElement('div');
    divider1.classList.add('book-divider1');
    const divider2 = document.createElement('div');
    divider2.classList.add('book-divider2');

    // divider1: bookTitle, bookAuthor, removeBookBtn
    const bookTitle = document.createElement('h3');
    bookTitle.classList.add('book-title');

    const bookAuthor = document.createElement('h4');
    bookAuthor.classList.add('book-author');

    const bookRemove = document.createElement('button');
    bookRemove.classList.add('btn-remove-book');
    bookRemove.setAttribute('type', 'button');
    bookRemove.setAttribute('title', 'Remove Book');
    bookRemove.addEventListener('click', removeBookFromLibraryAndDisplay);

    divider1.appendChild(bookTitle);
    divider1.appendChild(bookAuthor);

    // divider2: readLabel, readCheckbox
    const bookReadLabel = document.createElement('label');
    bookReadLabel.setAttribute('for', this.title);
    bookReadLabel.classList.add('read-status-label');

    const bookRead = document.createElement('input');
    bookRead.setAttribute('type', 'checkbox');
    bookRead.setAttribute('id', this.title);
    bookRead.setAttribute('name', this.title);
    bookRead.setAttribute('title', 'Book Read Status');
    bookRead.classList.add('read-status');
    bookRead.addEventListener('change', readStatusChange);

    divider2.appendChild(bookRemove);
    divider2.appendChild(bookReadLabel);
    divider2.appendChild(bookRead);

    // Set GUI values
    bookTitle.textContent = this.title;
    bookAuthor.textContent = this.author;
    bookReadLabel.textContent = 'Read';
    bookRead.checked = this.haveRead;
    bookRemove.textContent = '×';

    // Final set up of the Book Card
    bookCard.appendChild(divider1);
    bookCard.appendChild(divider2);

    // Set custom ID for tracking
    const bookID = libraryBooks.indexOf(this);
    bookCard.setAttribute('data-book-id', bookID);
    bookRead.setAttribute('data-book-id', bookID);
    bookRemove.setAttribute('data-book-id', bookID);

    // Show book in the GUI
    libraryContainer.appendChild(bookCard);
  }
}

/* ///////////////////////////////// */
// LIBRARY
/* ///////////////////////////////// */

const myLibrary = [];

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function addCustomBooksToLibrary() {
  addBookToLibrary(new Book('The Lowland', 'Jhumpa Lahiri', true));
  addBookToLibrary(
    new Book("The Hitchhiker's Guide To The Galaxy", 'Douglas Adams', true)
  );
  addBookToLibrary(new Book('The Alchemist', 'Paulo Coelho', false));

  // libraryObj created through function Library() ---
  // libraryObj.addBookToLibrary(new Book("The Lowland", "Jhumpa Lahiri", true));
}

function displayLibraryBooks() {
  libraryContainer.textContent = '';

  myLibrary.forEach((book) => {
    if (!(book === undefined)) {
      book.createAndAddBookToDisplay(myLibrary);
    }
  });

  // for (const book of myLibrary) {
  //   if (!(book === undefined)) {
  //     book.createAndAddBookToDisplay(myLibrary);
  //   }
  // }
}

function initLibrary() {
  addCustomBooksToLibrary();

  displayLibraryBooks(myLibrary);
}

function addNewBookToLibrary() {
  const newTitle = nBTitle.value;
  const newAuthor = nBAuthor.value;
  const newHasRead = nBHasRead.checked;

  const newBook = new Book(newTitle, newAuthor, newHasRead);

  myLibrary.push(newBook);
}

/* Library "class"
// libraryObj created through function Library() ---
// let libraryObj = new Library();

// function Library() {
//   this.bookList = new Array();
// }

// Library.prototype.addBookToLibrary = function (book) {
//   this.bookList.push(book);
// };
*/

/* ///////////////////////////////// */
// FORM - ADD NEW BOOK
/* ///////////////////////////////// */

function openModal() {
  nBContainer.style.display = 'flex';
}

function closeModal() {
  nBContainer.style.display = 'none';
}

function nBBtnClickOpenModal() {
  nBForm.reset();
  openModal();
}

function closeModalWindow(e) {
  if (e.target === nBContainer || e.key === 'Escape') {
    closeModal();
  }
}

function submitNewBookForm(e) {
  e.preventDefault();

  addNewBookToLibrary();
  displayLibraryBooks(myLibrary);

  // close pop up after submission
  closeModal();
}

function readStatusChange(e) {
  const bookIndex = Number(e.target.dataset.bookId);
  myLibrary[bookIndex].haveRead = e.target.checked;
  console.log(myLibrary[bookIndex]);
}

function removeBookFromLibraryAndDisplay(e) {
  const bookIndex = Number(e.target.dataset.bookId);
  const bookCard = document.querySelector(
    `.book-card[data-book-id="${bookIndex}"`
  );
  console.log(bookIndex);
  console.log(bookCard);
  libraryContainer.removeChild(bookCard);

  // myLibrary.splice(bookIndex, 1);
  delete myLibrary[bookIndex];
  console.log(myLibrary);
}

/* ///////////////////////////////// */
// DRIVER CODE
/* ///////////////////////////////// */
initLibrary();
