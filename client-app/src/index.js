import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListBooks from './BookList'; // Componente para listar libros
import BookDetail from './BookDetail'; // Componente para ver detalle del libro
import CreateBook from './CreateBook'; // Componente para crear libro
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<ListBooks />} />
       <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/create" element={<CreateBook />} />
    </Routes>
  </Router>
);

