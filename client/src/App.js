import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BlogProvider } from './context/BlogContext';
import HomePage from './pages/HomePage';
import EditorPage from './pages/EditorPage';
import ViewPage from './pages/ViewPage';
import './styles/App.css';

function App() {
  return (
    <BlogProvider>
      <Router>
        <div className="App">
          <header className="app-header">
            <div className="container">
              <Link to="/" className="app-title">Blog Editor</Link>
              <nav className="app-nav">
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/create">New Blog</Link></li>
                </ul>
              </nav>
            </div>
          </header>

          <main className="main-content">
            <div className="container">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create" element={<EditorPage />} />
                <Route path="/edit/:id" element={<EditorPage />} />
                <Route path="/view/:id" element={<ViewPage />} />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </BlogProvider>
  );
}

export default App;
