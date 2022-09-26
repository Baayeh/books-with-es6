import {
  form, ul, bookSection, heading, msg, contactSection,
} from './DOMElements.js';

// Define Methods Class
export default class Methods {
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