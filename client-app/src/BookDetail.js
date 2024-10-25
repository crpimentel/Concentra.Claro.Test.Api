import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from './services/bookService'; // Asegúrate de que la ruta sea correcta

const BookDetail = () => {
  const { id } = useParams(); // Obtener el ID del libro desde la URL
  const navigate = useNavigate(); // Hook para navegación
  const [book, setBook] = useState(null); // Estado para almacenar el libro
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  // Función para obtener los detalles del libro
  const fetchBookDetails = async () => {
    try {
      const response = await api.get(`/${id}`); // Usar el servicio de Axios
      setBook(response.data); // Guardar detalles del libro en el estado
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
  if (loading) return <p style={{ textAlign: 'center' }}>Cargando...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>Error al cargar el libro: {error}</p>;

  // Renderizar los detalles del libro
  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '8px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{
          color: '#007bff',
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 'bold',
          marginBottom: '20px'
        }}>
        Detalle del Libro
      </h1>
      {book ? (
        <div>
          <h2 style={{ color: '#343a40', fontFamily: 'Arial, sans-serif' }}>{book.title}</h2>
          <p><strong>Autor:</strong> {book.author}</p>
          <p><strong>Descripción:</strong> {book.description}</p>
          <p><strong>Páginas:</strong> {book.pageCount}</p>
          <p><strong>Extracto:</strong> {book.excerpt}</p>
        </div>
      ) : (
        <p>No se encontraron detalles para este libro.</p>
      )}
      <button
        onClick={() => navigate('/')} // Redirigir al listado de libros
        style={{
          marginTop: '20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          padding: '10px 15px',
          cursor: 'pointer',
          transition: 'background-color 0.3s'
        }}
      >
        Regresar a la Lista de Libros
      </button>
    </div>
  );
};

export default BookDetail;
