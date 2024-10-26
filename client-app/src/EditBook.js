import React, { useEffect, useState } from 'react';
import bookServices from './services/bookService';

const EditBook = ({ bookId }) => {
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`https://fakerestapi.azurewebsites.net/api/v1/Books/${bookId}`);
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();
  }, [bookId]);

  const handleUpdateBook = async () => {
    try {
      await bookServices.updateBook(book);
      console.log('Book updated successfully!');
      // Realiza alguna acción después de actualizar el libro, como redirigir a otra página
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div>
      {book ? (
        <div>
          <h2>Edit Book: {book.title}</h2>
          {/* Aquí puedes incluir tus campos de edición para el libro */}
          <button onClick={handleUpdateBook}>Update Book</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditBook;