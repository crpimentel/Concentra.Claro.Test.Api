import axios from 'axios';

const API_URL = 'https://localhost:7146/api/Books'; 

// Función para obtener todos los libros
export const getBooks = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Función para obtener un libro por ID
export const getBookById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

// Función para crear un nuevo libro
export const createBook = async (book) => {
    const response = await axios.post(API_URL, book);
    return response.data;
};

// Función para actualizar un libro existente
export const updateBook = async (id, book) => {
    const response = await axios.put(`${API_URL}/${id}`, book);
    return response.data;
};

// Función para eliminar un libro
export const deleteBook = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};