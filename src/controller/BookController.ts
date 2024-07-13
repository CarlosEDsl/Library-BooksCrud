import {Request, Response} from 'express';
import { BookService } from "../service/BookService";

    const bookService:BookService = new BookService;
    
    export async function create(req:Request, res:Response) {
        try{
            const data = req.body;
            return res.status(200).json(await bookService.create(data));
        } catch (e:any) {
            return res.status(400).json(e.message);
        }
    }

    export async function find(req:Request, res:Response) {
        try {
            const isbn = req.params.isbn;
            
            console.log(bookService.findByISBN(isbn));
            return res.status(200).json(await bookService.findByISBN(isbn))
        } catch (e:any) {
            return res.status(404).json(e.message);
        }
    }

    export async function update(req:Request, res:Response) {
        try{
            const isbn = req.params.isbn;
            const data = req.body;
            data.isbn = isbn;

            return res.status(200).json(await bookService.update(data));
        } catch (e:any) {
            return res.status(404).json(e.message);
        }
    }

    export async function deleteBook(req:Request, res:Response) {
        try {
            const isbn = req.params.isbn;
            const { title, author } = req.body;

            return res.status(200).json(await bookService.delete(isbn, title, author));
        } catch (e:any) {
            return res.status(404).json(e.message);
        }
    }

    export async function allBooks(req:Request, res:Response) {
        try {
            return res.status(200).json(await bookService.getAll())
        } catch(e:any) {
            return res.status(400).json(e.message);
        }
    }

    

