import express from 'express';
import { allBooks, create, deleteBook, find, update } from './controller/BookController';
const app = express();

const PORT = 3000;

app.use(express.json());


app.post("/api/books", create)
app.get("/api/books/:isbn", find)
app.delete("/api/books/:isbn", deleteBook)
app.put("/api/books/:isbn", update)
app.get("/api/books", allBooks)

app.listen(PORT, ()=> console.log("API online na porta: " + PORT));