// const h1 = document.querySelector("h1");
// // h1.textContent = "Library App";

// const p = document.createElement("p");
// p.textContent =
// container.appendChild(p);

const container = document.querySelector(".container");
const newBookBtn = document.querySelector(".btn-new-book");
const newBookContainer = document.querySelector(".new-book-container");
const library = document.querySelector(".library");

newBookBtn.addEventListener("click", () => {
  newBookContainer.style.display = "flex";
});

let myLibrary = [];

function Book(title, author, haveRead) {
  this.title = title;
  this.author = author;
  this.haveRead = haveRead === "yes" ? true : false;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

addBookToLibrary(new Book("The Lowland", "Jhumpa Lahiri", "yes"));
addBookToLibrary(
  new Book("The Hitchhiker's Guide To The Galaxy", "Douglas Adams", "yes")
);
addBookToLibrary(new Book("The Alchemist", "Paulo Coelho", "no"));

console.log(myLibrary);

function displayLibraryBooks(libraryBooks) {
  for (const book of libraryBooks) {
    const bookCard = document.createElement("div");
    const divider1 = document.createElement("div");
    const bookTitle = document.createElement("h3");
    const bookAuthor = document.createElement("h4");

    const divider2 = document.createElement("div");
    const bookReadLabel = document.createElement("label");
    bookReadLabel.setAttribute("for", book.title);

    const bookRead = document.createElement("input");
    bookRead.setAttribute("type", "checkbox");
    bookRead.setAttribute("id", book.title);
    bookRead.setAttribute("name", book.title);

    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookReadLabel.textContent = "Read";
    bookRead.checked = book.haveRead;

    divider1.appendChild(bookTitle);
    divider1.appendChild(bookAuthor);
    divider2.appendChild(bookReadLabel);
    divider2.appendChild(bookRead);
    bookCard.appendChild(divider1);
    bookCard.appendChild(divider2);

    bookCard.setAttribute("data-bookID", libraryBooks.indexOf(book));

    // bookCard.textContent += `${book.title} written by ${book.author}, has been ${book.haveRead}.`;

    library.appendChild(bookCard);
  }
}

displayLibraryBooks(myLibrary);
