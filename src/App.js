import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Link, useParams, useNavigate, Outlet, Navigate } from 'react-router-dom'
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import BookDetail from './components/BookDetail';
import BookList from './components/BookList';
import BookAdd from './components/BookAdd';

import { ModeContextProvider } from './components/ModeContextProvider';

function App() {
  return (
      <ModeContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />}> {/* nested route */}
              <Route index element={<BookList />} />
              <Route path="/login" element={<HomePage />} />
              {/* <Route path="/books" element={<BookList/>} /> */}
              <Route path="/books/:id" element={<BookDetail />} />
              <Route path="/books/add" element={<BookAdd />} />
            </Route>

            {/* create redirect to page */}
            <Route path="/" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </ModeContextProvider>
  );
}

export default App;
