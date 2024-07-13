import { BookModel } from '../model/BookModel';
import { BookRepository } from './../repository/BookRepository';

export class BookService {

    bookRepository: BookRepository = new BookRepository();

    async create(dataBook: any): Promise<BookModel> {
        const { title, author, publishedDate, isbn, pages, language, publisher } = dataBook;
        await this.bookVerifications(title, author, publishedDate, isbn, pages, language, publisher);

        const book: BookModel = new BookModel(title, author, publishedDate, isbn, pages, language, publisher);
        return this.bookRepository.insertBook(book);
    }

    public async findByISBN(isbn: string): Promise<BookModel> {
        const book = await this.bookRepository.filterBook(isbn);
        if (!book) throw new Error("Livro não encontrado");
        return book;
    }

    public async update(dataBook: any): Promise<BookModel> {
        const { title, author, publishedDate, isbn, pages, language, publisher } = dataBook;
        await this.bookUpVerifications(title, author, publishedDate, isbn, pages, language, publisher);

        const bookUp: BookModel = new BookModel(title, author, publishedDate, isbn, pages, language, publisher);
        return this.bookRepository.updateBook(bookUp);
    }

    public async delete(isbn: string, title: string, author: string): Promise<BookModel | null> {
        const book = await this.bookRepository.filterByTitle(title, author);

        if (book?.getIsbn() != isbn)
            throw new Error("Informações não batem");
        return this.bookRepository.deleteBook(isbn);
    }

    public async getAll(){
        return this.bookRepository.filterAllBook();
    }






    // VERIFICATIONS
    private async bookVerifications(title: string, author: string, publishedDate: string, isbn: string, pages: number, language: string, publisher: string) {
        this.dataVerification(title, author, publishedDate, isbn, pages, language, publisher);
        await this.isbnUtilizated(isbn);
        this.minimumPages(pages);
        await this.repeatedTitle(title, author);
    }

    private async bookUpVerifications(title: string, author: string, publishedDate: string, isbn: string, pages: number, language: string, publisher: string){
        this.dataVerification(title, author, publishedDate, isbn, pages, language, publisher);
        this.minimumPages(pages);
        if (!await this.bookRepository.filterBook(isbn))
            throw new Error("Esse isbn não está no banco")
    }

    private dataVerification(title: string, author: string, publishedDate: string, isbn: string, pages: number, language: string, publisher: string) {
        if (!title || !author || !publishedDate || !isbn || !pages || !language || !publisher)
            throw new Error("Falta de dados");
    }

    private async isbnUtilizated(isbn: string) {
        if (await this.bookRepository.filterBook(isbn))
            throw new Error("Este livro já está no banco");
    }

    private minimumPages(pages: number) {
        if (pages < 50)
            throw new Error("Não existem livros com menos de 50 páginas");
    }

    private async repeatedTitle(title: string, author: string) {
        if (await this.bookRepository.filterByTitle(title, author))
            throw new Error("Este título já possuí registro com outro isbn");
    }
}
