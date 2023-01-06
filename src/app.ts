import { ReferenceItem, UL, RefBook, Library } from "./classes";
import { Category } from "./enums";
import { getAllBooks, printRefBook } from "./functions";
import { Logger, TOptions, Librarian } from "./interfaces";


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
