/* eslint-disable no-redeclare */

import { Category } from "./enums";
import { Book, Callback, LibMgrCallback, TOptions } from "./interfaces";
import { BookOrUndefined, BookProperties } from "./types";
import RefBook from './classes/encyclopedia';

export function getAllBooks(): readonly Book[] {
    const books = <const>[
        { id: 1, title: 'Refactoring JavaScript', category: Category.JavaScript, author: 'Evan Burchard', available: true },
        { id: 2, title: 'JavaScript Testing', category: Category.JavaScript, author: 'Liang Yuxian Eugene', available: false },
        { id: 3, title: 'CSS Secrets', category: Category.CSS, author: 'Lea Verou', available: true },
        { id: 4, title: 'Mastering JavaScript Object-Oriented Programming', category: Category.JavaScript, author: 'Andrea Chiarelli', available: true }
    ];
    return books;

}

export function logFirstAvailable(books: readonly Book[] = getAllBooks()): void {
    console.log(`Number of books in the library ${books.length}`);
    const title = books.find(({ available }) => available)?.title;
    console.log(`First available book: ${title}`);
}

export function getBookTitlesByCategory(inputCategory: Category = Category.JavaScript): string[] {
    const books = getAllBooks();
    return books
        .filter(book => book.category === inputCategory)
        .map(book => book.title);
}

export function logBookTitles(titles: Array<string>): void {
    titles.forEach(title => console.log(title));
}

export function getBookAuthorByIndex(index: number): [title: string, author: string] {
    const books = getAllBooks();
    const { title, author } = books[index];
    return [title, author];
}

export function calcTotalPages(): void {
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

export function createCustomerID(name: string, id: number): string {
    return `${id}/${name}`;
}

const myID: string = createCustomerID('Ann', 10);

let idGenerator: typeof createCustomerID;
idGenerator = (name: string, id: number) => `${id}/${name}`;

//Task 03.02 + 03.03 + 03.04
//=======================================

export function createCustomer(name: string, age?: number, city?: string): void {
    console.log(`Customer name: ${name}`);

    if (age) {
        console.log(`Customer age: ${age}`);
    }

    if (city) {
        console.log(`Customer city: ${city}`);
    }
}

export function getBookById(id: Book['id']): BookOrUndefined {
    const books = getAllBooks();
    return books.find(book => book.id === id);
}

export function checkoutBooks(customer: string, ...bookIDs: number[]): string[] {
    console.log(`Customer name ${customer}`);

    return bookIDs
        .map(id => getBookById(id))
        .filter(el => el.available === true)
        .map(el => el.title);
}

export function getTitles(author: string): string[];
export function getTitles(available: boolean): string[];
export function getTitles(id: number, available: boolean): string[];
export function getTitles(...args: [string | boolean] | [number, boolean]): string[] {
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

export function assertStringValue(data: any): asserts data is string {
    if (typeof data !== 'string') {
        throw new Error('Error maza, you are crazy');
    }
}

export function assertRefBookInstance(condition: any): asserts condition {
    if (!condition) {
        throw new Error('It is not an instance of RefBook');
    }
}

export function printRefBook(data: any): void {
    assertRefBookInstance(data instanceof RefBook);
    data.printItem();
}

export function bookTitleTransform(title: any): string {
    assertStringValue(title);
    return [...title].reverse().join('');
}

// Task 04.01 - 04.05

export function printBook(book: Book): void {
    console.log(`${book.title} by ${book.author}`);
}
// const logDamage: DamageLogger = (reason: string): void => console.log(`Damaged: ${reason}`);

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

export function getProperty(book: Book, prop: BookProperties): any {
    const value = book[prop];
    return typeof value === 'function' ? value.name : value;
}

export function getObjectProperty<TObject, TKey extends keyof TObject>(obj: TObject, prop: TKey): TObject[TKey] | string {
    const value = obj[prop];
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

export function purge<T>(inventory: T[]): T[] {
    return inventory.slice(2);
}

export function getBooksByCategory(category: Category, callback: Callback<string[]>): void {
    // export function getBooksByCategory(category: Category, callback: LibMgrCallback): void {
    setTimeout(() => {
        try {
            const titles = getBookTitlesByCategory(category);
            if (titles.length > 0) {
                callback(null, titles);
            } else {
                throw new Error('No books found!');
            }
        } catch (err) {
            callback(err, null);
        }
    }, 2000);
}

export function logCategorySearch(err: Error | null, titles: string[] | null): void {
    if (err) {
        console.log(err.message);
    } else {
        console.log(titles);
    }
}

export function getBooksByCategoryPromise(category: Category): Promise<string[]> {
    const p: Promise<string[]> = new Promise((resolve, reject) => {
        setTimeout(() => {
            const titles = getBookTitlesByCategory(category);
            if (titles.length > 0) {
                resolve(titles);
            } else {
                reject('No books found!');
            }
        }, 2000);
    });
    return p;
}

export async function logSearchResults(category: Category) {
    const titles = await getBooksByCategoryPromise(category);
    return titles;
}
