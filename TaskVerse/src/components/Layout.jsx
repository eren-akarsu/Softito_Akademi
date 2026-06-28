
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../features/auth/authSlice';

const Layout = ({ 
  activeTab,
  setActiveTab,
  children 
}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleSignOut = () => {
    dispatch(setCurrentUser(null));
  };

  return (
    <div className="app-container">
      <header className="navbar">
        <div className="navbar-brand">
          <span style={{ fontSize: '2rem' }}>🚀</span>
          <div>
            <h1 className="serif-font">TaskVerse</h1>
            <p className="navbar-tagline">Görevleri yönet, ekibini ilerlet.</p>
          </div>
        </div>
        
        {currentUser && (
          <div className="navbar-user-section">
            <div className="navbar-stats-bar">
              <span className="navbar-stat-pill status-rank" style={{ cursor: 'default' }}>
                <span className="pill-icon">{currentUser.icon}</span>
                <span className="serif-font">{currentUser.fullName}</span>
              </span>
            </div>
            
            <div className="navbar-user">
              <button className="btn-signout" onClick={handleSignOut}>
                🚪 Çıkış Yap
              </button>
            </div>
          </div>
        )}
      </header>

      {currentUser && (
        <div className="sub-navbar">
          <div className="sub-navbar-content">
            <button 
              className={`sub-nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              📊 Görev Panosu
            </button>
            <button 
              className={`sub-nav-btn ${activeTab === 'archive' ? 'active' : ''}`}
              onClick={() => setActiveTab('archive')}
            >
              📂 Görev Arşivi
            </button>
          </div>
        </div>
      )}
      
      <main className="main-content">
        {children}
      </main>

      <footer className="footer-bar">
        <p className="serif-font">TaskVerse © 2026 | Görevleri yönet, ekibini ilerlet.</p>
      </footer>
    </div>
  );
};

export default Layout;
