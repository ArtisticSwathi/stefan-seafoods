import { useState } from 'react';

// 🔐 Change these to whatever you want
const ADMIN_USERNAME = 'swathi';
const ADMIN_PASSWORD = '1234';

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleLogin = () => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setError('');
      onLoginSuccess();
    } else {
      setError('❌ Wrong username or password!');
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'linear-gradient(135deg, #0A2540 0%, #1ca3de 100%)',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      zIndex: 999,
    }}>
      <div style={{
        background: 'white', borderRadius: '20px',
        padding: '40px', width: '100%', maxWidth: '380px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        display: 'flex', flexDirection: 'column', gap: '20px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🔐</div>
          <h2 style={{ margin: 0, color: '#0A2540', fontSize: '1.5rem', fontWeight: '900' }}>
            Admin Login
          </h2>
          <p style={{ margin: '6px 0 0', color: '#888', fontSize: '0.9rem' }}>
            Stefan Sea Foods Dashboard
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={inputStyle}
          />

          <div style={{ position: 'relative' }}>
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              style={{ ...inputStyle, paddingRight: '45px' }}
            />
            <span
              onClick={() => setShowPass(s => !s)}
              style={{
                position: 'absolute', right: '12px', top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer', fontSize: '1.1rem', userSelect: 'none',
              }}
            >
              {showPass ? '🙈' : '👁️'}
            </span>
          </div>
        </div>

        {error && (
          <p style={{
            margin: 0, color: '#e53935', fontSize: '0.9rem',
            textAlign: 'center', fontWeight: '600',
          }}>{error}</p>
        )}

        <button
          onClick={handleLogin}
          style={{
            padding: '14px', background: '#0A2540', color: 'white',
            border: 'none', borderRadius: '10px', fontWeight: 'bold',
            fontSize: '1rem', cursor: 'pointer', fontFamily: 'inherit',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#1ca3de'}
          onMouseLeave={e => e.currentTarget.style.background = '#0A2540'}
        >
          Login →
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '12px 14px',
  border: '1.5px solid #ddd', borderRadius: '10px',
  fontSize: '0.95rem', fontFamily: 'inherit',
  boxSizing: 'border-box', outline: 'none',
};
