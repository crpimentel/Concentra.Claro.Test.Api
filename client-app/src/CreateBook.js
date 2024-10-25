import React, { useState } from 'react';
import api from './services/bookService'; // Importar el servicio Axios
import loadingGif from './assets/loading.gif'; // Asegúrate de tener el GIF de carga en la carpeta assets

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pageCount, setPageCount] = useState(0);
  const [excerpt, setExcerpt] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Validar campos obligatorios
    if (!title || !description || !pageCount || !excerpt || !publishDate) {
      setFormError('Todos los campos son obligatorios.');
      return;
    }

    setIsLoading(true); // Activar estado de carga

    const newBookData = {
      id: 0,
      title,
      description,
      pageCount: parseInt(pageCount, 10),
      excerpt,
      publishDate
    };

    try {
      await api.post('/', newBookData);
      setSuccessMessage('¡Libro creado exitosamente!');
      setTitle('');
      setDescription('');
      setPageCount(0);
      setExcerpt('');
      setPublishDate('');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error al crear el libro: ' + (error.response?.data.message || error.message));
    } finally {
      setIsLoading(false); // Desactivar estado de carga cuando se reciba respuesta
    }
  };

  const handleCloseModal = () => {
    setSuccessMessage('');
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '8px', position: 'relative' }}>
      <h1 style={{
          color: '#007bff',
          textAlign: 'center',
          marginBottom: '20px',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 'bold'
        }}>
        Crear Nuevo Libro
      </h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {formError && <p style={{ color: 'red' }}>{formError}</p>}
      
      {/* Mostrar GIF de carga si isLoading está activo */}
      {isLoading && (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}>
          <img src={loadingGif} alt="Loading..." style={{ width: '50px' }} />
        </div>
      )}

      {/* Formulario de creación de libro */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Conteo de Páginas:</label>
          <input
            type="number"
            value={pageCount}
            onChange={(e) => setPageCount(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Extracto:</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Fecha de Publicación:</label>
          <input
            type="datetime-local"
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              backgroundColor: '#f9f9f9',
              fontSize: '16px',
              transition: 'border 0.3s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#007bff')}
            onBlur={(e) => (e.target.style.borderColor = '#ddd')}
          />
        </div>
        <button type="submit" disabled={isLoading} style={{
            padding: '10px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            marginTop: '10px',
            fontSize: '16px'
          }}>
          Crear Libro
        </button>
      </form>

      {/* Modal de éxito */}
      {successMessage && (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
            zIndex: 1001,
            borderRadius: '8px',
            textAlign: 'center'
          }}>
          <h2>{successMessage}</h2>
          <button onClick={handleCloseModal} style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}>
            OK
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateBook;