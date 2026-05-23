import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchAnimeById } from '../services/api';

const WatchPage = () => {
  const location = useLocation();
  const passedAnime = location.state?.anime || null;
  const [anime, setAnime] = useState(passedAnime);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  // If we got an ID but want fresh full data, refetch
  useEffect(() => {
    if (!passedAnime && !anime) return;
    if (passedAnime?.mal_id && !passedAnime?.synopsis) {
      fetchAnimeById(passedAnime.mal_id)
        .then(data => setAnime(data))
        .catch(() => {});
    }
  }, [passedAnime]);

  const title = anime?.title_english || anime?.title || 'Unknown Title';
  const synopsis = anime?.synopsis || 'No synopsis available.';
  const banner = anime?.images?.jpg?.large_image_url || anime?.images?.jpg?.image_url;
  const score = anime?.score;
  const episodes = anime?.episodes;
  const status = anime?.status;
  const genres = anime?.genres?.slice(0, 4) || [];
  const year = anime?.year || anime?.aired?.prop?.from?.year;

  const submitComment = () => {
    if (!comment.trim()) return;
    setComments(prev => [{ text: comment, time: new Date().toLocaleTimeString() }, ...prev]);
    setComment('');
  };

  return (
    <div className="min-h-screen w-full bg-[#0d0d0d] flex flex-col">
      <Navbar />

      {/* Banner strip if available */}
      {banner && (
        <div className="relative w-full overflow-hidden" style={{ height: '260px' }}>
          <img
            src={banner}
            alt={title}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.35) blur(2px)', transform: 'scale(1.05)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        </div>
      )}

      <main className="flex-1 max-w-[960px] mx-auto w-full px-8 pb-10" style={{ marginTop: banner ? '-100px' : '2rem', position: 'relative', zIndex: 1 }}>
        
        {/* Top info row */}
        {anime && (
          <div className="flex gap-5 mb-6 items-end">
            {banner && (
              <img
                src={banner}
                alt={title}
                className="w-28 rounded-sm shadow-2xl flex-shrink-0 border border-white/10"
                style={{ aspectRatio: '2/3', objectFit: 'cover' }}
              />
            )}
            <div className="pb-1">
              {genres.length > 0 && (
                <div className="flex gap-1.5 mb-2">
                  {genres.map(g => (
                    <span key={g.name} className="text-[10px] font-semibold uppercase tracking-wider text-[#e63946] bg-[#e63946]/10 border border-[#e63946]/20 px-2 py-0.5 rounded-sm">
                      {g.name}
                    </span>
                  ))}
                </div>
              )}
              <h1 className="text-white font-black text-2xl leading-tight mb-1" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}>
                {title}
              </h1>
              <div className="flex items-center gap-4 text-xs text-[#555]">
                {score && <span className="text-[#e63946] font-bold">★ {score.toFixed(1)}</span>}
                {episodes && <span>{episodes} eps</span>}
                {year && <span>{year}</span>}
                {status && <span>{status}</span>}
              </div>
            </div>
          </div>
        )}

        {/* Video player */}
        <div className="w-full bg-[#080808] border border-[#1a1a1a] flex items-center justify-center mb-6 rounded-sm relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
          {banner && (
            <img src={banner} alt="" className="absolute inset-0 w-full h-full object-cover opacity-10" />
          )}
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full border-2 border-white/50 flex items-center justify-center cursor-pointer hover:border-white hover:scale-110 transition-all bg-black/30">
              <span className="text-white text-2xl ml-1">▶</span>
            </div>
            {!anime && (
              <p className="text-[#444] text-xs">Select an anime from the homepage to watch</p>
            )}
          </div>
        </div>

        {/* Title + actions */}
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-white font-bold text-lg">{title}</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLiked(l => !l)}
              className={`transition-colors text-sm ${liked ? 'text-[#e63946]' : 'text-[#666] hover:text-white'}`}
            >
              {liked ? '♥' : '♡'} Like
            </button>
            <button className="text-[#666] hover:text-white transition-colors text-sm">↗ Share</button>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8 max-w-3xl">
          <p className="text-[#888] text-sm leading-relaxed">{synopsis}</p>
        </div>

        {/* Comment section */}
        <div className="border-t border-[#1e1e1e] pt-6">
          <h3 className="text-white font-bold text-sm mb-3">Leave a Comment</h3>
          <div className="flex gap-2">
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              className="flex-1 bg-[#111] border border-[#222] text-white text-sm p-3 h-20 resize-none outline-none placeholder-[#444] focus:border-[#333] transition-colors rounded-sm"
              placeholder="Write a comment..."
            />
          </div>
          <button
            onClick={submitComment}
            className="mt-2 bg-[#1e1e1e] text-[#888] text-xs px-4 py-2 hover:bg-[#252525] hover:text-white transition-colors rounded-sm"
          >
            Submit
          </button>

          {comments.length > 0 && (
            <div className="mt-5 space-y-3">
              {comments.map((c, i) => (
                <div key={i} className="bg-[#111] border border-[#1a1a1a] px-4 py-3 rounded-sm">
                  <p className="text-white/80 text-sm">{c.text}</p>
                  <p className="text-[#444] text-[10px] mt-1">{c.time}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WatchPage;
