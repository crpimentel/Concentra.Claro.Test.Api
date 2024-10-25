// src/BookList.js
import React, { useEffect, useState } from 'react';
import { getBooks } from './services/bookService'; 

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await getBooks();
                setBooks(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchBooks();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Lista de Libros</h1>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        {book.title} - {book.description}- {book.pageCount}- {book.publishDate}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
