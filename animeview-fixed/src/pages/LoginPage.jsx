import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setError('');
    if (!username.trim()) { setError('Please enter your username.'); return; }
    if (!password.trim()) { setError('Please enter your password.'); return; }
    setLoading(true);
    // Simulate auth — in a real app this would be an API call
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 600);
  };

  return (
    <div className="min-h-screen w-full bg-[#0d0d0d] flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-16">
        <div className="flex shadow-2xl rounded-sm overflow-hidden" style={{ width: '620px' }}>
          {/* Left black panel */}
          <div className="bg-[#080808] flex flex-col justify-between p-10 border-r border-[#1a1a1a]" style={{ width: '220px' }}>
            <div>
              <div
                className="text-white font-black text-3xl leading-tight mb-4"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.06em' }}
              >
                ANIME<br /><span className="text-[#e63946]">VIEW</span>
              </div>
              <p className="text-[#333] text-xs leading-relaxed">Your gateway to the world of anime & manga.</p>
            </div>
            <div className="flex items-center gap-2">
              {['f', 't', 'i'].map((s, i) => (
                <div key={i} className="w-7 h-7 rounded-full bg-[#1e1e1e] border border-[#2a2a2a] flex items-center justify-center hover:border-[#444] transition-colors cursor-pointer">
                  <span className="text-[#555] text-[10px] font-bold">{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right white panel */}
          <div className="flex-1 bg-white px-10 py-10 flex flex-col justify-center">
            <h2 className="text-black font-bold text-2xl leading-tight mb-0.5">Hi ! 👋</h2>
            <h3 className="text-black font-bold text-2xl leading-tight mb-6">Welcome Back</h3>

            <div className="mb-4">
              <label className="text-[#999] text-xs block mb-1.5">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                className="w-full border-b border-[#ccc] focus:border-black outline-none text-black text-sm py-2 bg-transparent transition-colors"
              />
            </div>

            <div className="mb-4">
              <label className="text-[#999] text-xs block mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                className="w-full border-b border-[#ccc] focus:border-black outline-none text-black text-sm py-2 bg-transparent transition-colors"
              />
            </div>

            {error && (
              <p className="text-[#e63946] text-xs mb-3">{error}</p>
            )}

            <div className="flex items-center justify-between mb-6">
              <p className="text-[#bbb] text-xs">
                No account?{' '}
                <Link to="/register" className="text-black font-semibold hover:underline">Sign Up</Link>
              </p>
              <Link to="/register" className="text-[#aaa] text-xs hover:text-black transition-colors">Forgot Password?</Link>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-black text-white text-xs font-bold py-3 tracking-widest hover:bg-[#1a1a1a] transition-colors disabled:opacity-60"
            >
              {loading ? 'LOGGING IN...' : 'LOGIN'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
