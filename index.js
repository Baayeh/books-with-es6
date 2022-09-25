/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */

const form = document.querySelector('#form');
const ul = document.querySelector('#book-list');
const bookSection = document.querySelector('#bookSection');
const heading = document.querySelector('.page-title');
const dateTime = document.querySelector('#time');
const msg = document.querySelector('.no-books');

// Getting sections of The HTML
const contactSection = document.querySelector('#contact');
const contactLink = document.querySelector('#contact-link');
const list = document.querySelector('#list');
const addNew = document.querySelector('#add');

// remove the other sections when list link is clicked
list.addEventListener('click', () => {
  // remove form section
  if (!form.classList.contains('remove-section')) {
    form.classList.add('remove-section');
  }

  // remove contact section
  if (!contactSection.classList.contains('remove-section')) {
    contactSection.classList.add('remove-section');
  }

  // add list section
  if (bookSection.classList.contains('remove-section')) {
    bookSection.classList.remove('remove-section');
  }

  heading.textContent = 'All awesome books';
});

// remove other sections when add new is clicked
addNew.addEventListener('click', () => {
  // remove list section
  if (!bookSection.classList.contains('remove-section')) {
    bookSection.classList.add('remove-section');
  }

  // remove contact section
  if (!contactSection.classList.contains('remove-section')) {
    contactSection.classList.add('remove-section');
  }

  // add form section
  if (form.classList.contains('remove-section')) {
    form.classList.remove('remove-section');
  }

  heading.textContent = 'Add a new book';
});

// remove other sections when contact is clicked
contactLink.addEventListener('click', () => {
  // remove list section
  if (!bookSection.classList.contains('remove-section')) {
    bookSection.classList.add('remove-section');
  }

  // remove form section
  if (!form.classList.contains('remove-section')) {
    form.classList.add('remove-section');
  }

  // add contact section
  if (contactSection.classList.contains('remove-section')) {
    contactSection.classList.remove('remove-section');
  }

  heading.textContent = 'Contact information';
});

// Define Book Class
class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

// Define Methods Class
class Methods {
 // create books array to hold all books created
 static books = [];

 // get all books from the localStorage
 static getAllBooks() {
   // check if localStorage is not empty
   if (localStorage.getItem('books')) {
     this.books = JSON.parse(localStorage.getItem('books'));
     msg.textContent = '';
     this.displayBooks();
   } else {
     ul.style.display = 'none';
     msg.textContent = 'Ooops!! There are no books available';
     msg.style.textAlign = 'center';
   }
 }

 // display books to the browser
 static displayBooks() {
   this.books.forEach((book) => {
     this.addToBookUl(book);
   });
 }

 // create li with book properties and insert it to the ul tag
 static addToBookUl(book) {
   const li = `<li class="list-item" key="${book.id}">
  <p class="title">"${book.title}" by ${book.author}</p>
  <button class="removeBtn">Remove</button>
  </li>`;
   ul.innerHTML += li;
   ul.style.display = 'block';
   msg.textContent = '';
 }

 // add book to array and store it in localStorage
 static addBook(book) {
   // add book to the books array
   this.books.push(book);

   // convert the books array to a string
   const strData = JSON.stringify(this.books);

   // store the converted data in the localStorage
   localStorage.setItem('books', strData);
 }

 // remove book from localStorage
 static removeBook(bookID) {
   // filter out the deleted book and return the ones left
   const result = this.books.filter((book) => String(bookID) !== String(book.id));

   // convert the result to a string
   const strData = JSON.stringify(result);

   // store the converted result in the localStorage
   localStorage.setItem('books', strData);

   // assign the new results to the books array
   this.books = JSON.parse(localStorage.getItem('books'));

   // check if the books array is not empty
   if (this.books.length === 0) {
     ul.style.display = 'none';
     localStorage.clear();
     msg.textContent = 'Ooops!! There are no books available';
     msg.style.textAlign = 'center';
   } else {
     ul.style.display = 'block';
     msg.textContent = '';
   }
 }

 static displayListOnly() {
   // remove form section
   if (!form.classList.contains('remove-section')) {
     form.classList.add('remove-section');
   }

   // remove contact section
   if (!contactSection.classList.contains('remove-section')) {
     contactSection.classList.add('remove-section');
   }

   // add list section
   if (bookSection.classList.contains('remove-section')) {
     bookSection.classList.remove('remove-section');
   }

   heading.textContent = 'All awesome books';
 }

 static getDateFormat() {
   const date = new Date();
   const time = date.toLocaleTimeString();
   const month = date.toLocaleString('en-US', {
     month: 'long',
   });
   const year = date.getFullYear();
   const day = this.getSuffix(date.getDate());

   return `${month} ${day} ${year}, ${time}`;
 }

 static getSuffix(date) {
   if (date > 3 && date < 21) {
     return `${date}th`;
   }
   switch (date % 10) {
     case 1:

       return `${date}st`;
     case 2:

       return `${date}nd`;
     case 3:

       return `${date}rd`;

     default:
       return `${date}th`;
   }
 }
}

// Get all books from the localStorage anytime the page loads fully
document.addEventListener('DOMContentLoaded', Methods.getAllBooks());

// Add book to array when form is submitted
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // getting elements in the form that has name value of title and author
  const [title, author] = form.elements;

  // getting the values of the title and author input fields
  const titleValue = title.value;
  const authorValue = author.value;

  // create book object from Book class and pass the form values to it
  const book = new Book(titleValue, authorValue, Methods.books.length);

  // add the new book object to the array and store it to the localStorage
  Methods.addBook(book);

  // insert the book in the ul tag
  Methods.addToBookUl(book);

  // clear the form values
  form.reset();

  Methods.displayListOnly();
});

// remove book when remove button is clicked
ul.addEventListener('click', (e) => {
  // check if button clicked has a class of removeBtn
  if (e.target.classList.contains('removeBtn')) {
    // get the value of the key attribute of the parent element of the remove button
    const bookID = e.target.parentElement.getAttribute('key');

    // remove book from localStorage
    Methods.removeBook(bookID);

    // remove book from browser
    e.target.parentElement.remove();
  }
});

dateTime.textContent = Methods.getDateFormat();
