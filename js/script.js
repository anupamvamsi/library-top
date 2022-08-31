class DOMElements {
  //  container = document.querySelector('.container');

  // New book button and div elements : nB = newBook
  static nBBtn = document.querySelector('.btn-new-book');
  static nBContainer = document.querySelector('.new-book-container');

  // Form and form elements
  static nBForm = document.querySelector('.new-book-form');
  static nBCloseFormBtn = document.querySelector('.btn-close-form');
  static nBTitle = document.querySelector('#new_book_title');
  static nBAuthor = document.querySelector('#new_book_author');
  static nBHasRead = document.querySelector('#new_book_read');
  //  nBSubmitBtn = document.querySelector('.btn-submit-book');

  static libraryContainer = document.querySelector('.library-container');
}

class DOM {
  constructor() {}

  static createEleAndAddClasses(elementTag, ...classes) {
    let element = document.createElement(elementTag);
    classes.forEach((c) => {
      element.classList.add(c);
    });

    return element;
  }

  static appendChildren(element, ...children) {
    children.forEach((child) => {
      element.appendChild(child);
    });
  }

  static setMultipleAttributes(element, attributes) {
    Object.keys(attributes).forEach((attr) => {
      element.setAttribute(attr, attributes[attr]);
    });
  }
}

/* ///////////////////////////////// */
// BOOK
/* ///////////////////////////////// */

class Book {
  constructor(title, author, haveRead) {
    this.title = title;
    this.author = author;
    this.haveRead = haveRead;
  }

  static createRemoveButton() {
    const bookRemove = DOM.createEleAndAddClasses('button', 'btn-remove-book');
    DOM.setMultipleAttributes(bookRemove, {
      type: 'button',
      title: 'Remove Book',
    });
    bookRemove.addEventListener('click', removeBookFromLibraryAndDisplay);

    return bookRemove;
  }

  static createBookReadLabel() {
    const bookReadLabel = DOM.createEleAndAddClasses(
      'label',
      'read-status-label'
    );
    bookReadLabel.setAttribute('for', this.title);

    return bookReadLabel;
  }

  static createBookReadCheckBox() {
    const bookReadChkBox = DOM.createEleAndAddClasses('input', 'read-status');
    DOM.setMultipleAttributes(bookReadChkBox, {
      type: 'checkbox',
      id: this.title,
      name: this.title,
      title: 'Book Read Status',
    });
    bookReadChkBox.addEventListener('change', readStatusChange);

    return bookReadChkBox;
  }

  createAndAddBookToDisplay(libraryBooks) {
    const bookCard = DOM.createEleAndAddClasses('div', 'book-card');

    const divider1 = DOM.createEleAndAddClasses('div', 'book-divider1');
    const divider2 = DOM.createEleAndAddClasses('div', 'book-divider2');

    // divider1: bookTitle, bookAuthor, removeBookBtn
    const bookTitle = DOM.createEleAndAddClasses('h3', 'book-title');
    const bookAuthor = DOM.createEleAndAddClasses('h4', 'book-author');
    const bookRemoveBtn = Book.createRemoveButton();
    DOM.appendChildren(divider1, bookTitle, bookAuthor);

    // divider2: readLabel, readCheckbox
    const bookReadLabel = Book.createBookReadLabel();
    const bookReadChkBox = Book.createBookReadCheckBox();
    DOM.appendChildren(divider2, bookRemoveBtn, bookReadLabel, bookReadChkBox);

    // Set GUI values
    bookTitle.textContent = this.title;
    bookAuthor.textContent = this.author;
    bookReadLabel.textContent = 'Read';
    bookReadChkBox.checked = this.haveRead;
    bookRemoveBtn.textContent = '×';

    // Final set up of the Book Card
    DOM.appendChildren(bookCard, divider1, divider2);

    // Set custom ID for tracking
    const bookID = libraryBooks.indexOf(this);
    bookCard.setAttribute('data-book-id', bookID);
    bookReadChkBox.setAttribute('data-book-id', bookID);
    bookRemoveBtn.setAttribute('data-book-id', bookID);

    // Show book in the GUI
    DOMElements.libraryContainer.appendChild(bookCard);
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
  DOMElements.libraryContainer.textContent = '';

  myLibrary.forEach((book) => {
    if (!(book === undefined)) {
      book.createAndAddBookToDisplay(myLibrary);
    }
  });
}

function initLibrary() {
  addCustomBooksToLibrary();

  displayLibraryBooks(myLibrary);
}

function addNewBookToLibrary() {
  const newTitle = DOMElements.nBTitle.value;
  const newAuthor = DOMElements.nBAuthor.value;
  const newHasRead = DOMElements.nBHasRead.checked;

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
  DOMElements.nBContainer.style.display = 'flex';
}

function closeModal() {
  DOMElements.nBContainer.style.display = 'none';
}

function nBBtnClickOpenModal() {
  DOMElements.nBForm.reset();
  openModal();
}

function closeModalWindow(e) {
  if (e.target === DOMElements.nBContainer || e.key === 'Escape') {
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
  DOMElements.libraryContainer.removeChild(bookCard);

  // myLibrary.splice(bookIndex, 1);
  delete myLibrary[bookIndex];
  console.log(myLibrary);
}

// Open form
DOMElements.nBBtn.addEventListener('click', nBBtnClickOpenModal);

// Close form
DOMElements.nBCloseFormBtn.addEventListener('click', closeModal);
window.addEventListener('click', closeModalWindow);
window.addEventListener('keydown', closeModalWindow);

// Add new book
DOMElements.nBForm.addEventListener('submit', submitNewBookForm);

/* ///////////////////////////////// */
// DRIVER CODE
/* ///////////////////////////////// */
initLibrary();
