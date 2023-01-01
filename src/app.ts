/* eslint-disable no-redeclare */
showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

//===================================
//Task 02.01 + 02.02

enum Category { HTML, CSS, JavaScript, Angular };

// type Book = {
//     id: number,
//     title: string,
//     author: string,
//     available: boolean,
//     category: Category,
// };

type BookProperties = keyof Book;

type PersonBook = Person & Book;
type BookOrUndefined = Book | undefined;

interface Book {
    id: number,
    title: string,
    author: string,
    available: boolean,
    category: Category,
    pages?: number,
    markDamaged?: DamageLogger
};

interface DamageLogger {
    (reason: string): void
}

interface Person {
    name: string,
    email: string
}

interface Author extends Person {
    numBooksPublished: number
}

interface Librarian extends Person {
    department: string,
    assistCustomer: (custName: string, bookTitle: string) => void
}

interface TOptions {
    duration?: number,
    speed?: number
}

const myBook: Book = {
    id: 5,
    title: 'Colors, Backgrounds, and Gradients',
    author: 'Eric A. Meyer',
    available: true,
    category: Category.CSS,
    pages: 200,
    markDamaged: (reason: string): void => console.log(`Damaged: ${reason}`)
};

function getAllBooks(): readonly Book[] {
    const books = <const>[
        { id: 1, title: 'Refactoring JavaScript', category: Category.JavaScript, author: 'Evan Burchard', available: true },
        { id: 2, title: 'JavaScript Testing', category: Category.JavaScript, author: 'Liang Yuxian Eugene', available: false },
        { id: 3, title: 'CSS Secrets', category: Category.CSS, author: 'Lea Verou', available: true },
        { id: 4, title: 'Mastering JavaScript Object-Oriented Programming', category: Category.JavaScript, author: 'Andrea Chiarelli', available: true }
    ];
    return books;

}

function logFirstAvailable(books: readonly Book[] = getAllBooks()): void {
    console.log(`Number of books in the library ${books.length}`);
    const title = books.find(({ available }) => available)?.title;
    console.log(`First available book: ${title}`);
}

function getBookTitlesByCategory(inputCategory: Category = Category.JavaScript): string[] {
    const books = getAllBooks();
    return books
        .filter(book => book.category === inputCategory)
        .map(book => book.title);
}

function logBookTitles(titles: Array<string>): void {
    titles.forEach(title => console.log(title));
}

function getBookAuthorByIndex(index: number): [title: string, author: string] {
    const books = getAllBooks();
    const { title, author } = books[index];
    return [title, author];
}

function calcTotalPages(): void {
    const data = <const>[
        { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
        { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
        { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 }
    ];
    const r = data.reduce((acc: bigint, obj) => {
        return acc + BigInt(obj.books) * BigInt(obj.avgPagesPerBook);
    }, 0n);
    console.log(r);
}

//Task 03.01
//========================================

function createCustomerID(name: string, id: number): string {
    return `${id}/${name}`;
}

const myID: string = createCustomerID('Ann', 10);

let idGenerator: typeof createCustomerID;
idGenerator = (name: string, id: number) => `${id}/${name}`;

//Task 03.02 + 03.03 + 03.04
//=======================================

function createCustomer(name: string, age?: number, city?: string): void {
    console.log(`Customer name: ${name}`);

    if (age) {
        console.log(`Customer age: ${age}`);
    }

    if (city) {
        console.log(`Customer city: ${city}`);
    }
}

function getBookById(id: Book['id']): BookOrUndefined {
    const books = getAllBooks();
    return books.find(book => book.id === id);
}

function checkoutBooks(customer: string, ...bookIDs: number[]): string[] {
    console.log(`Customer name ${customer}`);

    return bookIDs
        .map(id => getBookById(id))
        .filter(el => el.available === true)
        .map(el => el.title);
}

function getTitles(author: string): string[];
function getTitles(available: boolean): string[];
function getTitles(id: number, available: boolean): string[];
function getTitles(...args: [string | boolean] | [number, boolean]): string[] {
    const books = getAllBooks();

    if (args.length === 1) {
        const [arg] = args;
        if (typeof arg === 'string') {
            return books.filter(book => book.author === arg)
                .map(book => book.title);
        } else if (typeof arg === 'boolean') {
            return books.filter(book => book.available === arg)
                .map(book => book.title);
        }

    } else if (args.length === 2) {
        const [id, available] = args;
        if (typeof id === 'number' && typeof available === 'boolean') {
            return books.filter(book => book.available === available && book.id === id)
                .map(book => book.title);
        }
    }
}

function assertStringValue(data: any): asserts data is string {
    if (typeof data !== 'string') {
        throw new Error('Error maza, you are crazy');
    }
}

function bookTitleTransform(title: any): string {
    assertStringValue(title);
    return [...title].reverse().join('');
}

// Task 04.01 - 04.05

function printBook(book: Book): void {
    console.log(`${book.title} by ${book.author}`);
}
const logDamage: DamageLogger = (reason: string): void => console.log(`Damaged: ${reason}`);

// const favoriteAuthor: Author = {
//     name: 'Dima',
//     email: 'example@example.com',
//     numBooksPublished: 5
// }

// const favoriteLibrarian: Librarian = {
//     name: 'Vitaliy',
//     email: 'ulala@example.com',
//     department: 'CatCo Department',
//     assistCustomer: null
// }

function getProperty(book: Book, prop: BookProperties): any {
    const value = book[prop];
    return typeof value === 'function' ? value.name : value;
}

// console.log(getProperty(myBook, 'title'));
// console.log(getProperty(myBook, 'markDamaged'));

// const offer: any = {
//     book: {
//         title: 'Essential TypeScript',
//     },
// };

// console.log(offer.magazine);
// console.log(offer?.magazine?.getTitle());
// console.log(offer.book?.getTitle());
// console.log(offer.book?.authors?.[0]);

//Task 05.01 - 05.05
abstract class ReferenceItem {
    // title: string;
    // year: number;

    // constructor(newTitle: string, newYear: number) {
    //     console.log('Creating a new ReferenceItem');
    //     this.title = newTitle;
    //     this.year = newYear;
    // }
    private _publisher: string;
    #id: number;

    static department: string = 'Odessa style depart.'

    get publisher(): string {
        return this._publisher?.toUpperCase();
    }

    set publisher(newPublisher: string) {
        this._publisher = newPublisher;
    }

    constructor(
        id: number,
        public title: string,
        protected year: number
    ) {
        console.log('Creating a new ReferenceItem');
        this.#id = id;
    }

    printItem(): void {
        console.log(`${this.title} was published in ${this.year}`);
        console.log(ReferenceItem.department);
    }
    getId(): number {
        return this.#id;
    }

    abstract printCitation(): void;
}

class Encyclopedia extends ReferenceItem {
    constructor(
        id: number,
        title: string,
        year: number,
        public edition: number
    ) {
        super(id, title, year)
    }

    override printItem(): void {
        super.printItem();
        console.log(`Edition: ${this.edition} ${this.year}`)
    }

    printCitation(): void {
        console.log(`${this.title} - ${this.year}`);
    }
}

class UniversityLibrarian implements Librarian {
    name: string;
    email: string;
    department: string;

    assistCustomer(custName: string, bookTitle: string): void {
        console.log(`${this.name} is assisting ${custName} with book ${bookTitle}`);
    }
}

const refBook: Encyclopedia = new Encyclopedia(2, 'Javascript', 2022, 3);
const favoriteLibrarian: Librarian = new UniversityLibrarian();
favoriteLibrarian.name = 'Allan';
favoriteLibrarian.assistCustomer('Borya', 'Learn Typescript');

const personBook: PersonBook = {
    name: 'Anna',
    author: 'Anna',
    available: false,
    category: Category.Angular,
    email: 'anna@mail.com',
    id: 1,
    title: 'unknown'
}

function setDefaultOptions(option: TOptions) {
    option.duration ??= 100;
    option.speed ??= 60;
    return option
}
// const option1: TOptions = {};
// const option2 = setDefaultOptions(option1);
// console.log(option2);
