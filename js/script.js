const container = document.querySelector(".container");

// New book button and div elements : nB = newBook
const nBBtn = document.querySelector(".btn-new-book");
const nBContainer = document.querySelector(".new-book-container");

// Form and form elements
const nBForm = document.querySelector(".new-book-form");
const nBCloseFormBtn = document.querySelector(".btn-close-form");
const nBTitle = document.querySelector("#new_book_title");
const nBAuthor = document.querySelector("#new_book_author");
const nBHasRead = document.querySelector("#new_book_read");
const nBSubmitBtn = document.querySelector(".btn-submit-book");

const libraryContainer = document.querySelector(".library-container");

// Open form
nBBtn.addEventListener("click", nBBtnClickOpenModal);

// Close form
nBCloseFormBtn.addEventListener("click", closeModal);
window.addEventListener("click", closeModalWindow);
window.addEventListener("keydown", closeModalWindow);

// Add new book
nBForm.addEventListener("submit", submitNewBookForm);

/* ///////////////////////////////// */
// BOOK
/* ///////////////////////////////// */

function Book(title, author, haveRead) {
  this.title = title;
  this.author = author;
  this.haveRead = haveRead;
}

Book.prototype.addBookCardToDisplay = function (libraryBooks) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");

  const divider1 = document.createElement("div");
  divider1.classList.add("book-divider1");
  const divider2 = document.createElement("div");
  divider2.classList.add("book-divider2");

  // divider1: bookTitle, bookAuthor
  const bookTitle = document.createElement("h3");
  bookTitle.classList.add("book-title");

  const bookAuthor = document.createElement("h4");
  bookAuthor.classList.add("book-author");

  divider1.appendChild(bookTitle);
  divider1.appendChild(bookAuthor);

  // divider2: readLabel, readCheckbox
  const bookReadLabel = document.createElement("label");
  bookReadLabel.setAttribute("for", this.title);
  bookReadLabel.classList.add("read-status-label");

  const bookRead = document.createElement("input");
  bookRead.setAttribute("type", "checkbox");
  bookRead.setAttribute("id", this.title);
  bookRead.setAttribute("name", this.title);
  bookRead.classList.add("read-status");

  divider2.appendChild(bookReadLabel);
  divider2.appendChild(bookRead);

  // Set GUI values
  bookTitle.textContent = this.title;
  bookAuthor.textContent = this.author;
  bookReadLabel.textContent = "Read";
  bookRead.checked = this.haveRead;

  // Final set up of the Book Card
  bookCard.appendChild(divider1);
  bookCard.appendChild(divider2);

  // Set custom ID for tracking
  bookCard.setAttribute("data-bookID", libraryBooks.indexOf(this));

  // Show book in the GUI
  libraryContainer.appendChild(bookCard);
};

/* ///////////////////////////////// */
// LIBRARY
/* ///////////////////////////////// */

let myLibrary = [];

function initLibrary() {
  addCustomBooksToLibrary();

  displayLibraryBooks(myLibrary);
}

function addNewBookToLibrary() {
  let newTitle = nBTitle.value;
  let newAuthor = nBAuthor.value;
  let newHasRead = nBHasRead.checked;

  let newBook = new Book(newTitle, newAuthor, newHasRead);

  myLibrary.push(newBook);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayLibraryBooks() {
  libraryContainer.textContent = "";

  for (const book of myLibrary) {
    book.addBookCardToDisplay(myLibrary);
  }
}

function addCustomBooksToLibrary() {
  addBookToLibrary(new Book("The Lowland", "Jhumpa Lahiri", true));
  addBookToLibrary(
    new Book("The Hitchhiker's Guide To The Galaxy", "Douglas Adams", true)
  );
  addBookToLibrary(new Book("The Alchemist", "Paulo Coelho", false));

  // libraryObj created through function Library() ---
  // libraryObj.addBookToLibrary(new Book("The Lowland", "Jhumpa Lahiri", true));
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
  nBContainer.style.display = "flex";
}

function closeModal() {
  nBContainer.style.display = "none";
}

function nBBtnClickOpenModal() {
  nBForm.reset();
  openModal();
}

function closeModalWindow(e) {
  if (e.target == nBContainer || e.key === "Escape") {
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

/* ///////////////////////////////// */
// DRIVER CODE
/* ///////////////////////////////// */
initLibrary();

// TODO: Change Read Status of the Book Object after GUI toggle
// const readStatusOfBooks = document.querySelectorAll(".read-status");

// for (readStatus of readStatusOfBooks) {
//   console.log(readStatus.checked);
// }
