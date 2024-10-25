import React, { useEffect, useState } from 'react';
import api from './services/bookService';
import { Link } from 'react-router-dom';
import loadingGif from './assets/loading.gif';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Asegúrate de que tu aplicación tenga un ID root

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showCreateTooltip, setShowCreateTooltip] = useState(false);
  const [tooltipDetails, setTooltipDetails] = useState(null);
  const [tooltipDelete, setTooltipDelete] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null); // ID del libro a eliminar

  useEffect(() => {
    setIsLoading(true);
    api.get('')
      .then((response) => setBooks(response.data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  const handleDelete = async () => {
    if (bookToDelete) {
      try {
        setIsLoading(true);
        await api.delete(`/${bookToDelete}`);
        setBooks(books.filter((book) => book.id !== bookToDelete));
        setErrorMessage('');
      } catch (error) {
        console.error(error);
        setErrorMessage('Error al eliminar el libro.');
      } finally {
        setIsLoading(false);
        setModalIsOpen(false); // Cierra el modal después de eliminar
        setBookToDelete(null); // Restablece el ID del libro
      }
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '8px' }}>
      <h2 style={{
          color: '#fff',
          backgroundColor: '#007bff',
          padding: '10px 15px',
          borderRadius: '5px',
          textAlign: 'center',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
        Books List
      </h2>
      
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <Link to="/create"
              onMouseEnter={() => setShowCreateTooltip(true)}
              onMouseLeave={() => setShowCreateTooltip(false)}
              style={{
                  display: 'inline-block',
                  padding: '10px 15px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  borderRadius: '5px',
                  textDecoration: 'none',
                  transition: 'background-color 0.3s',
                  position: 'relative'
                }}>
          Crear Nuevo Libro
          {showCreateTooltip && (
            <span style={{
                width: '120px',
                backgroundColor: '#555',
                color: '#fff',
                textAlign: 'center',
                borderRadius: '6px',
                padding: '5px 0',
                position: 'absolute',
                zIndex: '1',
                bottom: '125%',
                left: '50%',
                marginLeft: '-60px',
                opacity: 1,
                transition: 'opacity 0.3s',
                fontSize: '12px',
              }}>
              Puedes crear un nuevo libro
            </span>
          )}
        </Link>
      </div>
      
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {isLoading ? (
        <img src={loadingGif} alt="Loading..." style={{ width: '50px', display: 'block', margin: '20px auto' }} />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
          {books.map((book) => (
            <div
              key={book.id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                textAlign: 'center',
                transition: 'background-color 0.3s',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ffd700'; // Cambia a amarillo
                setTooltipDetails(book.id);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff'; // Restaura el color original
                setTooltipDetails(null);
              }}
            >
              <Link to={`/books/${book.id}`} style={{ textDecoration: 'none', color: '#333' }}>{book.title}</Link>
              {tooltipDetails === book.id && (
                <span style={{
                    width: '120px',
                    backgroundColor: '#555',
                    color: '#fff',
                    textAlign: 'center',
                    borderRadius: '6px',
                    padding: '5px 0',
                    position: 'absolute',
                    zIndex: '1',
                    bottom: '125%',
                    left: '50%',
                    marginLeft: '-60px',
                    opacity: 1,
                    transition: 'opacity 0.3s',
                    fontSize: '12px',
                  }}>
                  Ver más detalles
                </span>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Evita que el evento se propague al div del libro
                  setBookToDelete(book.id); // Establece el libro a eliminar
                  setModalIsOpen(true); // Abre el modal de confirmación
                }}
                onMouseEnter={() => setTooltipDelete(book.id)}
                onMouseLeave={() => setTooltipDelete(null)}
                style={{
                  marginTop: '10px',
                  backgroundColor: '#ff4d4d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '10px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
              >
                Eliminar
                {tooltipDelete === book.id && (
                  <span style={{
                      width: '120px',
                      backgroundColor: '#555',
                      color: '#fff',
                      textAlign: 'center',
                      borderRadius: '6px',
                      padding: '5px 0',
                      position: 'absolute',
                      zIndex: '1',
                      bottom: '125%',
                      left: '50%',
                      marginLeft: '-60px',
                      opacity: 1,
                      transition: 'opacity 0.3s',
                      fontSize: '12px',
                    }}>
                    Puedes eliminar un libro
                  </span>
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal de confirmación */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <h2>Confirmar Eliminación</h2>
        <p>¿Estás seguro de que deseas eliminar este libro?</p>
        <button onClick={handleDelete} style={{ marginRight: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', padding: '10px' }}>
          Sí, eliminar
        </button>
        <button onClick={() => setModalIsOpen(false)} style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '5px', padding: '10px' }}>
          Cancelar
        </button>
      </Modal>
    </div>
  );
};

export default BookList;