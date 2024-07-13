export class BookModel {

    private title:string;
    private author:string;
    private publishedDate:string;
    private isbn:string;
    private pages:number;
    private language:string;
    private publisher:string;

    constructor(title:string, author:string, publishedDate:string, isbn:string, pages:number, language:string, publisher:string){
        this.title = title;
        this.author = author;
        this.publishedDate = publishedDate;
        this.isbn = isbn;
        this.pages = pages;
        this.language = language;
        this.publisher = publisher;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getAuthor(): string {
        return this.author;
    }

    public setAuthor(author: string): void {
        this.author = author;
    }

    public getPublishedDate(): string {
        return this.publishedDate;
    }

    public setPublishedDate(publishedDate: string): void {
        this.publishedDate = publishedDate;
    }

    public getIsbn(): string {
        return this.isbn;
    }

    public setIsbn(isbn: string): void {
        this.isbn = isbn;
    }

    public getPages(): number {
        return this.pages;
    }

    public setPages(pages: number): void {
        this.pages = pages;
    }

    public getLanguage(): string {
        return this.language;
    }

    public setLanguage(language: string): void {
        this.language = language;
    }

    public getPublisher(): string {
        return this.publisher;
    }

    public setPublisher(publisher: string): void {
        this.publisher = publisher;
    }




}