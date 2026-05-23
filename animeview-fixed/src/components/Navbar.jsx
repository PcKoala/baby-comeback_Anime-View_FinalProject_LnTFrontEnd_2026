import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { searchAnime } from '../services/api';
import { useTheme } from '../context/ThemeContext';

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// Sun icon for light mode
const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

// Moon icon for dark mode
const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggle } = useTheme();
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const debouncedSearch = useDebounce(search, 420);

  useEffect(() => {
    if (debouncedSearch.trim().length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    setLoading(true);
    searchAnime(debouncedSearch)
      .then(data => {
        setResults(data);
        setOpen(true);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [debouncedSearch]);

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (item) => {
    setOpen(false);
    setSearch('');
    navigate('/watch', { state: { anime: item } });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') { setOpen(false); setSearch(''); }
  };

  const navLinks = [
    { label: 'Anime', to: '/anime' },
    { label: 'Manga', to: '/manga' },
    { label: 'Community', to: '/community' },
  ];

  return (
    <nav className="w-full bg-[#0a0a0a]/95 dark:bg-[#0a0a0a]/95 light-nav backdrop-blur-sm border-b border-white/5 dark:border-white/5 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-10 h-14 flex items-center gap-10">
        {/* Logo */}
        <Link
          to="/"
          className="text-white font-black tracking-tight whitespace-nowrap flex-shrink-0 hover:text-gray-200 transition-colors"
          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.08em', fontSize: '26px' }}
        >
          ANIME<span className="text-[#e63946]">VIEW</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1 flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 text-sm font-semibold transition-colors rounded-sm ${
                location.pathname === link.to ? 'text-white' : 'text-[#777] hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 ml-auto flex-shrink-0">
          {/* Search */}
          <div className="relative" ref={containerRef}>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => results.length > 0 && setOpen(true)}
              placeholder="Search anime, manga..."
              className="bg-[#181818] dark:bg-[#181818] border border-[#2a2a2a] text-white text-sm px-4 py-2 outline-none placeholder-[#444] w-56 focus:border-[#444] focus:bg-[#1f1f1f] transition-all rounded-sm"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#444] text-xs pointer-events-none">
              {loading ? '⋯' : '⌕'}
            </span>

            {/* Dropdown results */}
            {open && results.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#111] border border-[#222] shadow-2xl z-50 max-h-80 overflow-y-auto rounded-sm">
                {results.map(item => {
                  const img = item?.images?.jpg?.image_url;
                  const title = item?.title || 'Unknown';
                  const score = item?.score;
                  const type = item?.type;
                  return (
                    <button
                      key={item.mal_id}
                      onClick={() => handleSelect(item)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#1a1a1a] transition-colors text-left border-b border-[#1a1a1a] last:border-0"
                    >
                      {img && (
                        <img src={img} alt={title} className="w-8 h-11 object-cover rounded-sm flex-shrink-0" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-white text-xs font-semibold truncate">{title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          {type && <span className="text-[#555] text-[10px] uppercase">{type}</span>}
                          {score && <span className="text-[#e63946] text-[10px] font-bold">★ {score.toFixed(1)}</span>}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
            {open && results.length === 0 && !loading && debouncedSearch.length >= 2 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#111] border border-[#222] rounded-sm px-4 py-3 text-[#555] text-xs">
                No results for "{debouncedSearch}"
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggle}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="w-9 h-9 flex items-center justify-center rounded-sm border border-[#2a2a2a] text-[#777] hover:text-white hover:border-[#444] transition-all bg-[#181818] hover:bg-[#1f1f1f] flex-shrink-0"
            aria-label="Toggle theme"
          >
            <span className="transition-transform duration-300" style={{ display: 'flex' }}>
              {isDark ? <SunIcon /> : <MoonIcon />}
            </span>
          </button>

          <Link
            to="/register"
            className="text-sm border border-[#333] text-[#bbb] px-5 py-2 hover:border-white hover:text-white transition-all whitespace-nowrap font-semibold rounded-sm"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="text-sm bg-[#e63946] text-white px-5 py-2 hover:bg-[#c1121f] transition-all whitespace-nowrap font-bold rounded-sm"
          >
            Log In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
