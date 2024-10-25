import React, { useEffect, useState } from 'react';
import api from './services/bookService';
import { Link } from 'react-router-dom';
import loadingGif from './assets/loading.gif';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error

  useEffect(() => {
    setIsLoading(true);
    api.get('')
      .then((response) => setBooks(response.data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este libro?')) {
      try {
        setIsLoading(true); // Muestra el GIF de carga durante la eliminación
        await api.delete(`/${id}`);
        setBooks(books.filter((book) => book.id !== id)); // Actualiza la lista excluyendo el libro eliminado
        setErrorMessage(''); // Limpia cualquier error previo
      } catch (error) {
        console.error(error);
        setErrorMessage('Error al eliminar el libro.'); // Maneja el error de eliminación
      } finally {
        setIsLoading(false); // Oculta el GIF de carga
      }
    }
  };

  return (
    <div>
      <h2>Books List</h2>
         {/* Link para crear un nuevo libro */}
      <Link to="/create">Crear Nuevo Libro</Link>
      {/* Mensaje de error si existe */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* Mostrar GIF de carga si isLoading está activo */}
      {isLoading ? (
        <img src={loadingGif} alt="Loading..." style={{ width: '50px', display: 'block', margin: '20px auto' }} />
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <Link to={`/books/${book.id}`}>{book.title}</Link>
              <button onClick={() => handleDelete(book.id)} style={{ marginLeft: '10px', color: 'red' }}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
      
   
    </div>
  );
};

export default BookList;
