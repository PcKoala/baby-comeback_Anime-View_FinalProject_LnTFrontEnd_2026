import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchSeasonNow } from '../services/api';

const FALLBACK = [
  {
    mal_id: 1,
    title: '天 気 の 子',
    title_english: 'Weathering With You',
    synopsis: 'A high school boy who has run away to Tokyo befriends a girl who has the ability to manipulate the weather. A tale of love, sacrifice, and the supernatural.',
    images: { jpg: { large_image_url: null } },
    score: 8.5,
    genres: [{ name: 'Romance' }, { name: 'Supernatural' }],
  },
];

const HeroSection = () => {
  const [slides, setSlides] = useState(FALLBACK);
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchSeasonNow(6)
      .then(data => {
        if (data && data.length > 0) {
          setSlides(data.slice(0, 6));
          setLoaded(true);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, [slides.length]);

  const slide = slides[current];
  const image = slide?.images?.jpg?.large_image_url || slide?.images?.jpg?.image_url;
  const title = slide?.title || '';
  const titleEn = slide?.title_english || slide?.title || '';
  const synopsis = slide?.synopsis || '';
  const score = slide?.score;
  const genres = slide?.genres?.slice(0, 3) || [];

  return (
    <div className="relative w-full overflow-hidden" style={{ height: '520px' }}>
      {/* Background image */}
      {image ? (
        <img
          key={image}
          src={image}
          alt={titleEn}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ filter: 'brightness(0.45) saturate(1.2)' }}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a0a 50%, #0f0f0f 100%)',
          }}
        />
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />

      {/* Navigation arrows */}
      <button
        onClick={() => setCurrent(c => (c - 1 + slides.length) % slides.length)}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-black/70 text-white/70 hover:text-white transition-all text-2xl rounded-sm border border-white/10 hover:border-white/30"
      >
        ‹
      </button>
      <button
        onClick={() => setCurrent(c => (c + 1) % slides.length)}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-black/70 text-white/70 hover:text-white transition-all text-2xl rounded-sm border border-white/10 hover:border-white/30"
      >
        ›
      </button>

      {/* Content */}
      <div className="absolute bottom-0 left-0 px-12 pb-14 max-w-2xl z-10">
        {/* Genre tags */}
        {genres.length > 0 && (
          <div className="flex gap-2 mb-3">
            {genres.map(g => (
              <span key={g.name} className="text-[10px] font-semibold uppercase tracking-widest text-[#e63946] bg-[#e63946]/10 border border-[#e63946]/30 px-2 py-0.5 rounded-sm">
                {g.name}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        {title && title !== titleEn && (
          <h1
            className="text-white font-black leading-none mb-1.5"
            style={{
              fontSize: '58px',
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: '0.06em',
              textShadow: '0 4px 30px rgba(0,0,0,0.8)',
            }}
          >
            {title}
          </h1>
        )}
        <p className="text-white/80 font-semibold mb-4 tracking-widest" style={{ fontSize: '13px', letterSpacing: '0.2em' }}>
          {titleEn}
        </p>

        {/* Synopsis */}
        <p className="text-white/60 mb-6 leading-relaxed" style={{ fontSize: '13px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {synopsis}
        </p>

        {/* Score */}
        {score && (
          <div className="flex items-center gap-2 mb-5">
            <span className="text-[#e63946] font-bold text-sm">★ {score.toFixed(1)}</span>
            <span className="text-white/30 text-xs">MAL Score</span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/watch"
            className="bg-[#e63946] text-white font-bold px-8 py-3 text-sm hover:bg-[#c1121f] transition-colors flex items-center gap-2 rounded-sm"
          >
            <span>▶</span> Watch Now
          </Link>
          <button className="bg-white/10 text-white font-semibold px-8 py-3 text-sm border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all flex items-center gap-2 rounded-sm backdrop-blur-sm">
            <span className="text-base leading-none">ⓘ</span> Details
          </button>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? 'w-5 h-1.5 bg-[#e63946]' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-6 right-12 text-white/40 text-xs font-mono z-10">
        {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>
    </div>
  );
};

export default HeroSection;
