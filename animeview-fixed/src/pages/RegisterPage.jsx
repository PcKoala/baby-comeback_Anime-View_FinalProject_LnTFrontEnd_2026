import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '', confirm: '' });
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleRegister = () => {
    setError('');
    if (!form.username.trim()) { setError('Please enter a username.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (!agreed) { setError('Please agree to the Terms & Conditions.'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 700);
  };

  return (
    <div className="min-h-screen w-full bg-[#0d0d0d] flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-16">
        <div className="flex shadow-2xl rounded-sm overflow-hidden" style={{ width: '640px' }}>
          {/* Left panel */}
          <div className="bg-[#080808] flex flex-col justify-between p-10 border-r border-[#1a1a1a]" style={{ width: '220px' }}>
            <div>
              <div
                className="text-white font-black text-3xl leading-tight mb-4"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.06em' }}
              >
                ANIME<br /><span className="text-[#e63946]">VIEW</span>
              </div>
              <p className="text-[#333] text-xs leading-relaxed">Join the community. Track your anime journey.</p>
            </div>
            <div className="flex items-center gap-2">
              {['f', 't', 'i'].map((s, i) => (
                <div key={i} className="w-7 h-7 rounded-full bg-[#1e1e1e] border border-[#2a2a2a] flex items-center justify-center hover:border-[#444] transition-colors cursor-pointer">
                  <span className="text-[#555] text-[10px] font-bold">{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div className="flex-1 bg-white px-10 py-10 flex flex-col justify-center">
            <h2 className="text-black font-bold text-2xl leading-tight mb-0.5">Hi ! 👋</h2>
            <h3 className="text-black font-bold text-2xl leading-tight mb-6">There Wibu.</h3>

            <div className="mb-4">
              <label className="text-[#999] text-xs block mb-1.5">Username</label>
              <input
                type="text"
                value={form.username}
                onChange={set('username')}
                className="w-full border-b border-[#ccc] focus:border-black outline-none text-black text-sm py-2 bg-transparent transition-colors"
              />
            </div>

            <div className="mb-4">
              <label className="text-[#999] text-xs block mb-1.5">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={set('password')}
                className="w-full border-b border-[#ccc] focus:border-black outline-none text-black text-sm py-2 bg-transparent transition-colors"
              />
            </div>

            <div className="mb-4">
              <label className="text-[#999] text-xs block mb-1.5">Confirm Password</label>
              <input
                type="password"
                value={form.confirm}
                onChange={set('confirm')}
                onKeyDown={e => e.key === 'Enter' && handleRegister()}
                className="w-full border-b border-[#ccc] focus:border-black outline-none text-black text-sm py-2 bg-transparent transition-colors"
              />
            </div>

            {error && (
              <p className="text-[#e63946] text-xs mb-3">{error}</p>
            )}

            <div className="flex items-center gap-2 mb-5">
              <input
                type="checkbox"
                id="agree"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                className="accent-black w-3.5 h-3.5 cursor-pointer"
              />
              <label htmlFor="agree" className="text-black text-xs cursor-pointer">
                Agree to <span className="underline">Terms & Conditions</span>
              </label>
            </div>

            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-black text-white text-xs font-bold py-3 tracking-widest hover:bg-[#1a1a1a] transition-colors disabled:opacity-60"
            >
              {loading ? 'REGISTERING...' : 'REGISTER'}
            </button>

            <p className="text-[#aaa] text-xs text-center mt-4">
              Already have an account?{' '}
              <Link to="/login" className="text-black font-semibold hover:underline">Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
