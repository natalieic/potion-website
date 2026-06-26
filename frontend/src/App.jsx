import { useState } from 'react';
import StorePage from './components/StorePage';
import AdminPage from './components/AdminPage';
import './index.css';

function App() {
  const [view, setView] = useState('store');

  return (
    <>
      <nav className="site-nav">
        <span className="nav-brand">Poções e Soluções</span>
        <div className="nav-links">
          <button
            className={`nav-btn ${view === 'store' ? 'active' : ''}`}
            onClick={() => setView('store')}
          >
            Loja
          </button>
          <button
            className={`nav-btn ${view === 'admin' ? 'active' : ''}`}
            onClick={() => setView('admin')}
          >
            Administração
          </button>
        </div>
      </nav>

      {view === 'store' ? <StorePage /> : <AdminPage />}
    </>
  );
}

export default App;
