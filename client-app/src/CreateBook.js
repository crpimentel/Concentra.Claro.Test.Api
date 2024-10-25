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

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  return (
    <div>
      <h1>Crear Nuevo Libro</h1>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      
      {/* Mostrar GIF de carga si isLoading está activo */}
      {isLoading && <img src={loadingGif} alt="Loading..." style={{ width: '50px', display: 'block', margin: '20px auto' }} />}
      
      {/* Formulario de creación de libro */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Conteo de Páginas:</label>
          <input
            type="number"
            value={pageCount}
            onChange={(e) => setPageCount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Extracto:</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Fecha de Publicación:</label>
          <input
            type="datetime-local"
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>Crear Libro</button>
      </form>
    </div>
  );
};

export default CreateBook;
