import { Book, Person } from './interfaces';

// export type Book = {
//     id: number,
//     title: string,
//     author: string,
//     available: boolean,
//     category: Category,
// };

type BookProperties = keyof Book;
type PersonBook = Person & Book;
type BookOrUndefined = Book | undefined;

export { BookOrUndefined, PersonBook, BookProperties };