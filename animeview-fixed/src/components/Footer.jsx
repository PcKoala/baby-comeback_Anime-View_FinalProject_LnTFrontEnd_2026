import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-[#080808] border-t border-[#181818] py-8">
    <div className="max-w-[1440px] mx-auto px-10 flex items-center justify-between flex-wrap gap-6">
      <div className="flex items-center gap-5">
        <Link
          to="/"
          className="text-white font-black text-xl tracking-tight hover:text-gray-200 transition-colors"
          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.08em' }}
        >
          ANIME<span style={{ color: '#e63946' }}>VIEW</span>
        </Link>
        <button className="border border-[#2a2a2a] text-[#555] hover:border-[#e63946]/60 hover:text-[#e63946] transition-all px-4 py-1.5 text-xs font-semibold rounded-sm">
          ♥ Support Us
        </button>
      </div>

      <div className="flex items-center gap-7">
        {['Privacy Policy', 'Terms of Service', 'About', 'Contact'].map(label => (
          <Link
            key={label}
            to="/"
            className="text-[#3a3a3a] hover:text-[#aaa] transition-colors text-xs uppercase tracking-wider font-semibold"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
    <div className="max-w-[1440px] mx-auto px-10 mt-5 pt-5 border-t border-[#111]">
      <p className="text-[#2a2a2a] text-xs text-center">
        © 2025 AnimeView. All rights reserved. Not affiliated with any official streaming service.
      </p>
    </div>
  </footer>
);

export default Footer;
