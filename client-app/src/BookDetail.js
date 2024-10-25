import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from './services/bookService'; // Asegúrate de que la ruta sea correcta

const BookDetail = () => {
  const { id } = useParams(); // Obtener el ID del libro desde la URL
  const [book, setBook] = useState(null); // Estado para almacenar el libro
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  // Función para obtener los detalles del libro
  const fetchBookDetails = async () => {
    try {
      const response = await api.get(`/${id}`); // Usar el servicio de Axios
      setBook(response.data); // Guardar  detalles del libro en el estado
    } catch (err) {
      setError(err.message); // Guardar el mensaje de error en el estado
    } finally {
      setLoading(false); // Cambiar el estado de carga
    }
  };

  // Usar useEffect para llamar a la API cuando el componente se monta
  useEffect(() => {
    fetchBookDetails();
  }, [id]); // Dependencia en id para volver a ejecutar si cambia

  // Manejo de carga y errores
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar el libro: {error}</p>;

  // Renderizar los detalles del libro
  return (
    <div>
      <h1>Detalle del Libro</h1>
      {book ? (
        <div>
          <h2>{book.title}</h2>
          <p><strong>Autor:</strong> {book.author}</p>
          <p><strong>Descripción:</strong> {book.description}</p>
           <p><strong>Paginas:</strong> {book.pageCount}</p>
           <p><strong>Extracto:</strong> {book.excerpt}</p>
        </div>
      ) : (
        <p>No se encontraron detalles para este libro.</p>
      )}
    </div>
  );
};

export default BookDetail;

