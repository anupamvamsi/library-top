const container = document.querySelector(".container");

const newBookBtn = document.querySelector(".btn-new-book");
const newBookContainer = document.querySelector(".new-book-container");
const closeBtn = document.querySelector(".btn-close");

// Form and form elements
const newBookForm = document.querySelector(".new-book-form");
const newBookTitle = document.querySelector("#new_book_title");
const newBookAuthor = document.querySelector("#new_book_author");
const newBookHasRead = document.querySelector("#new_book_read");
const submitNewBookBtn = document.querySelector(".btn-submit-book");

const library = document.querySelector(".library");

// Open pop up
newBookBtn.addEventListener("click", () => {
  newBookForm.reset();
  newBookContainer.style.display = "flex";
});

// Close pop up
closeBtn.addEventListener("click", () => {
  newBookContainer.style.display = "none";
});
window.addEventListener("click", closePopUp);
window.addEventListener("keydown", closePopUp);

function closePopUp(e) {
  if (e.target == newBookContainer || e.key === "Escape") {
    newBookContainer.style.display = "none";
  }
}

// Add new book
newBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let newTitle = newBookTitle.value;
  let newAuthor = newBookAuthor.value;
  let newHasRead = newBookHasRead.checked;
  console.log(newHasRead);

  let newBook = new Book(newTitle, newAuthor, newHasRead);

  myLibrary.push(newBook);
  displayLibraryBooks(myLibrary);

  // hide pop up after submission
  newBookContainer.style.display = "none";
});

let myLibrary = [];

function Book(title, author, haveRead) {
  this.title = title;
  this.author = author;
  this.haveRead = haveRead;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function createBookCardToDisplay(book, libraryBooks) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");

  const divider1 = document.createElement("div");
  divider1.classList.add("book-divider1");
  const divider2 = document.createElement("div");
  divider2.classList.add("book-divider2");

  // divider1: bookTItle, bookAuthor
  const bookTitle = document.createElement("h3");
  bookTitle.classList.add("book-title");

  const bookAuthor = document.createElement("h4");
  bookAuthor.classList.add("book-author");

  divider1.appendChild(bookTitle);
  divider1.appendChild(bookAuthor);

  // divider2: readLabel, readCheckbox
  const bookReadLabel = document.createElement("label");
  bookReadLabel.setAttribute("for", book.title);
  bookReadLabel.classList.add("read-status-label");

  const bookRead = document.createElement("input");
  bookRead.setAttribute("type", "checkbox");
  bookRead.setAttribute("id", book.title);
  bookRead.setAttribute("name", book.title);
  bookRead.classList.add("read-status");

  divider2.appendChild(bookReadLabel);
  divider2.appendChild(bookRead);

  // Set GUI values
  bookTitle.textContent = book.title;
  bookAuthor.textContent = book.author;
  bookReadLabel.textContent = "Read";
  bookRead.checked = book.haveRead;

  // Final set up of the Book Card
  bookCard.appendChild(divider1);
  bookCard.appendChild(divider2);

  // Set custom ID for tracking
  bookCard.setAttribute("data-bookID", libraryBooks.indexOf(book));

  // Show book in the GUI
  library.appendChild(bookCard);
}

function displayLibraryBooks(libraryBooks) {
  library.textContent = "";

  for (const book of libraryBooks) {
    createBookCardToDisplay(book, libraryBooks);
  }
}

function addCustomBooks() {
  addBookToLibrary(new Book("The Lowland", "Jhumpa Lahiri", true));
  addBookToLibrary(
    new Book("The Hitchhiker's Guide To The Galaxy", "Douglas Adams", true)
  );
  addBookToLibrary(new Book("The Alchemist", "Paulo Coelho", false));
}

function initLibrary() {
  addCustomBooks();

  displayLibraryBooks(myLibrary);
}

initLibrary();

// TODO: Change Read Status of the Book Object after GUI toggle
// const readStatusOfBooks = document.querySelectorAll(".read-status");

// for (readStatus of readStatusOfBooks) {
//   console.log(readStatus.checked);
// }
