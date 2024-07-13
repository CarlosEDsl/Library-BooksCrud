import { BookModel } from '../model/BookModel';
import { executarComandoSQL } from "../database/mysql";

export class BookRepository {

    constructor() {
        this.createTable();
    }

    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS library.books (
            isbn VARCHAR(13) PRIMARY KEY,
            title VARCHAR(100) NOT NULL,
            author VARCHAR(100) NOT NULL,
            publishedDate VARCHAR(10) NOT NULL,
            pages INT NOT NULL,
            language VARCHAR(20),
            publisher VARCHAR(50)
        )`;

        try {
            await executarComandoSQL(query, []);
            console.log('Query executada com sucesso');
        } catch (err) {
            console.error('Error', err);
        }
    }

    public async insertBook(book: BookModel): Promise<BookModel> {
        const query = "INSERT INTO library.books (isbn, title, author, publishedDate, pages, language, publisher) VALUES (?, ?, ?, ?, ?, ?, ?)";

        try {
            const resultado = await executarComandoSQL(query, [book.getIsbn(), book.getTitle(), book.getAuthor(), book.getPublishedDate(), book.getPages(), book.getLanguage(), book.getPublisher()]);
            console.log('Produto inserido com sucesso, ID: ', resultado.insertId);
            return book;
        } catch (err) {
            console.error('Erro ao inserir o produto:', err);
            throw err;
        }
    }

    public async updateBook(book: BookModel): Promise<BookModel> {
        const query = "UPDATE library.books set isbn = ?, title = ?, author = ?, PublishedDate = ?, Pages = ?, Language = ?, Publisher = ? where isbn = ?";

        try {
            await executarComandoSQL(query, [book.getIsbn(), book.getTitle(), book.getAuthor(), book.getPublishedDate(), book.getPages(), book.getLanguage(), book.getPublisher(), book.getIsbn()]);
            console.log('Produto atualizado com sucesso');
            return book;
        } catch (err: any) {
            console.error(`Erro ao atualizar o produto de ID ${book.getIsbn()} gerando o erro: ${err}`);
            throw err;
        }
    }

    public async deleteBook(isbn: string): Promise<BookModel | null> {
        const book:BookModel | null = await this.filterBook(isbn);
        const query = "DELETE FROM library.books where isbn = ?";

        try {
            await executarComandoSQL(query, [isbn]);
            console.log('Produto deletado com sucesso');
            return book;
        } catch (err: any) {
            console.error(`Falha ao deletar o produto de ID ${isbn} gerando o erro: ${err}`);
            throw err;
        }
    }

    public async filterBook(isbn: string): Promise<BookModel | null> {
        const query = "SELECT * FROM library.books where isbn = ?";

        try {
            const resultado = await executarComandoSQL(query, [isbn]);
            if (resultado.length === 0) {
                return null;
            }
            const { title, author, publishedDate, pages, language, publisher } = resultado[0];
            return new BookModel(title, author, publishedDate, isbn, pages, language, publisher);
        } catch (err: any) {
            console.error(`Falha ao procurar o produto de ID ${isbn} gerando o erro: ${err}`);
            throw err;
        }
    }

    public async filterAllBook(): Promise<BookModel[]> {
        const query = "SELECT * FROM library.books";

        try {
            const resultado = await executarComandoSQL(query, []);
            return resultado.map((book: any) => new BookModel(book.title, book.author, book.publishedDate, book.isbn, book.pages, book.language, book.publisher));
        } catch (err: any) {
            console.error(`Falha ao listar os produtos gerando o erro: ${err}`);
            throw err;
        }
    }

    public async filterByTitle(title: string, author: string): Promise<BookModel | null> {
        const query = `SELECT * FROM library.books WHERE title = ? AND author = ?`;

        try {
            const resultado = await executarComandoSQL(query, [title, author]);
            if (resultado.length === 0) {
                return null;
            }
            const { isbn, publishedDate, pages, language, publisher } = resultado[0];
            return new BookModel(title, author, publishedDate, isbn, pages, language, publisher);
        } catch (err) {
            console.log(`Erro em filtrar pelo título gerando erro: ${err}`);
            throw err;
        }
    }
}
