// Imports
import Book from './modules/BookClass.js';
import Methods from './modules/MethodsClass.js';
import {
  form,
  ul,
  bookSection,
  heading,
  dateTime,
  contactSection,
  contactLink,
  list,
  addNew,
} from './modules/DOMElements.js';

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
