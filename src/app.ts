import { ReferenceItem, UL, RefBook, Library, Shelf } from "./classes";
import { Category } from "./enums";
import { BookRequiredFields, CreateCustomerFunctionType, UpdatedBook } from "./types";
import { purge, getAllBooks, printRefBook, getObjectProperty, createCustomer } from "./functions";
import { Logger, TOptions, Librarian, Book, Magazine } from "./interfaces";


showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

//===================================
//Task 02.01 + 02.02

// const myBook: Book = {
//     id: 5,
//     title: 'Colors, Backgrounds, and Gradients',
//     author: 'Eric A. Meyer',
//     available: true,
//     category: Category.CSS,
//     pages: 200,
//     markDamaged: (reason: string): void => console.log(`Damaged: ${reason}`)
// };

const logDamage: Logger = (reason: string): void => console.log(`Damaged: ${reason}`);
// logDamage('missing back cover');

// const favoriteAuthor: Author = {
//     name: 'Dima',
//     email: 'example@example.com',
//     numBooksPublished: 5
// }

//Task 05.02 - 05.03
// const refBook: RefBook = new RefBook(2, 'Javascript', 2022, 3);
// refBook.printItem();
// console.log(refBook.printCitation());
// printRefBook(refBook);
// const favoriteLibrarian: Librarian = new UL.UniversityLibrarian();
// favoriteLibrarian.name = 'Allan';
// favoriteLibrarian.assistCustomer('Borya', 'Learn Typescript');

// const personBook: PersonBook = {
//     name: 'Anna',
//     author: 'Anna',
//     available: false,
//     category: Category.Angular,
//     email: 'anna@mail.com',
//     id: 1,
//     title: 'unknown'
// }

function setDefaultOptions(option: TOptions) {
    option.duration ??= 100;
    option.speed ??= 60;
    return option
}
// const option1: TOptions = {};
// const option2 = setDefaultOptions(option1);
// console.log(option2);

//Task 06.03-06.04
// const refBook: RefBook = new RefBook(1, 'Javascript', 2022, 2);
// printRefBook(refBook);
// const favoriteLibrarian: Librarian = new UL.UniversityLibrarian();
// printRefBook(favoriteLibrarian);

//Task 06.05

// const flag = true;

// if (flag) {
//     const obj = await import('./classes')
//     const reader = new obj.Reader();
//     reader.name = 'Anna';
//     reader.take(getAllBooks()[0]);
//     console.log(reader);
// }

// // Task 06.06

// let library: Library = {
//     name: 'Dima',
//     id: 1,
//     adress: 'Odessa'
// }

//Task 07.01
// const numberArr: Number[] = [1, 2, 3, 4, 5];

const inventory: Book[] = [
    { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software },
    { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },
    { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },
    { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software }
];

// console.log(purge(inventory));
// console.log(purge(numberArr));

//Task 07.02
// const bookShelf: Shelf<Book> = new Shelf<Book>();
// inventory.forEach(book => bookShelf.add(book));
// console.log(bookShelf.getFirst().title);

// const magazine: Magazine[] = [
//     { title: 'Programming Language Monthly', publisher: 'Code Mags' },
//     { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
//     { title: 'Five Points', publisher: 'GSU' }
// ];

// const magazineShelf: Shelf<Magazine> = new Shelf<Magazine>();
// magazine.forEach(journal => magazineShelf.add(journal));
// // console.log(magazineShelf.getFirst().title);


// //Task 07.03
// magazineShelf.printTitles();
// console.log(magazineShelf.find('Five Points'));

// console.log(getObjectProperty(magazine[0], 'title'));

//Task 07.04

const bookRequiredFields: BookRequiredFields = {
    author: 'Anna',
    available: false,
    category: Category.Angular,
    id: 1,
    markDamaged: null,
    pages: 200,
    title: 'Learn Angular'
}

const updatedBook: UpdatedBook = {

}

let params: Parameters<CreateCustomerFunctionType>;
params = ['Anna', 30, 'Odessa'];
createCustomer(...params);

