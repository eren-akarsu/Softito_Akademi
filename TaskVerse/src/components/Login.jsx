import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, setCurrentUser } from '../features/auth/authSlice';
import { selectAllUsers } from '../features/users/userSlice';
import { addNotification } from '../features/notifications/notificationSlice';

const Login = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const authError = useSelector((state) => state.auth.error);

  const [selectedRole, setSelectedRole] = useState('manager'); // manager, teamLeader, developer
  const [username, setUsername] = useState('manager'); 
  const [password, setPassword] = useState('1234');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Keep username in sync with selected role card for easier testing
  useEffect(() => {
    if (selectedRole === 'manager') {
      setUsername('manager');
      setPassword('1234');
    } else if (selectedRole === 'teamLeader') {
      setUsername('teamlead');
      setPassword('1234');
    } else if (selectedRole === 'developer') {
      setUsername('developer');
      setPassword('1234');
    }
  }, [selectedRole]);

  // Sync auth error
  useEffect(() => {
    if (authError) {
      setError(authError);
      dispatch(addNotification({ 
        id: Date.now().toString(),
        message: authError, 
        type: 'error' 
      }));
      dispatch(clearError());
    }
  }, [authError, dispatch]);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setError('');
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(addNotification({
      id: Date.now().toString(),
      message: "Varsayılan giriş şifreniz '1234' olarak tanımlanmıştır.",
      type: "info"
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const normUsername = username.toLowerCase().trim();

    // Check if user is defined in our offline user catalog
    const matchedUser = users.find(
      (u) => 
        u.role === selectedRole && 
        u.username.toLowerCase() === normUsername && 
        u.password === password
    );

    if (!matchedUser) {
      setError("Giriş bilgileri hatalı. Lütfen seçilen rol, kullanıcı adı ve şifreyi kontrol ediniz.");
      dispatch(addNotification({ 
        id: Date.now().toString(),
        message: "Rol veya kimlik doğrulaması başarısız.", 
        type: "error" 
      }));
      setLoading(false);
      return;
    }

    dispatch(setCurrentUser(matchedUser));
    dispatch(addNotification({ 
      id: Date.now().toString(),
      message: `Hoş geldiniz, ${matchedUser.fullName}!`, 
      type: 'success' 
    }));
    setLoading(false);
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-header">
          <span style={{ fontSize: '3rem' }}>🚀</span>
          <h1 className="serif-font">TaskVerse</h1>
          <p>“Görevleri yönet, ekibini ilerlet.”</p>
        </div>

        {error && (
          <div className="login-error">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label className="role-selection-label">
            Rolünüzü Seçiniz
          </label>
          
          <div className="role-cards">
            <div
              className={`role-card ${selectedRole === 'manager' ? 'active' : ''}`}
              onClick={() => handleRoleSelect('manager')}
            >
              <span className="role-card-icon">👔</span>
              <span className="role-card-title serif-font">Yönetici</span>
            </div>
            <div
              className={`role-card ${selectedRole === 'teamLeader' ? 'active' : ''}`}
              onClick={() => handleRoleSelect('teamLeader')}
            >
              <span className="role-card-icon">🧭</span>
              <span className="role-card-title serif-font">Takım Lideri</span>
            </div>
            <div
              className={`role-card ${selectedRole === 'developer' ? 'active' : ''}`}
              onClick={() => handleRoleSelect('developer')}
            >
              <span className="role-card-icon">💻</span>
              <span className="role-card-title serif-font">Geliştirici</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="username">Kullanıcı Adı</label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Kullanıcı adınızı giriniz"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group" style={{ position: 'relative' }}>
            <label htmlFor="password">Şifre</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="form-control"
                placeholder="Şifrenizi giriniz"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ paddingRight: '40px' }}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'var(--text-muted)',
                  userSelect: 'none'
                }}
                title={showPassword ? "Şifreyi Gizle" : "Şifreyi Göster"}
                disabled={loading}
              >
                {showPassword ? '👁️' : '🔒'}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
              />
              <span>Beni Hatırla</span>
            </label>
            <a href="#" className="forgot-password" onClick={handleForgotPassword}>
              Şifremi Unuttum?
            </a>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? '⏳ Giriş Yapılıyor...' : '🚀 Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
