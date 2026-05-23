import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AnimeCard from './AnimeCard';

const SkeletonCard = () => (
  <div className="flex flex-col" style={{ minWidth: 0 }}>
    <div className="skeleton rounded-sm" style={{ paddingTop: '148%', width: '100%' }} />
    <div className="skeleton h-3 rounded mt-2.5 w-4/5" />
    <div className="skeleton h-2.5 rounded mt-1.5 w-1/3" />
  </div>
);

/**
 * AnimeCarousel
 * 
 * Accepts `fetcher` — a plain async function (not a prop-level closure),
 * identified by the stable `fetchKey` string so useEffect only re-runs
 * when the key actually changes, never on re-renders.
 */
const AnimeCarousel = ({ title, fetcher, fetchKey, buttonTo, cardType = 'anime' }) => {
  const [items, setItems]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage]     = useState(0);
  const perPage = 6;

  const fetchId = useRef(0);

  useEffect(() => {
    if (!fetcher) return;
    const id = ++fetchId.current;
    setLoading(true);
    setPage(0);
    fetcher()
      .then(data => {
        if (fetchId.current !== id) return;
        // Ensure we always have items — api.js returns fallback on failure
        const result = Array.isArray(data) ? data : [];
        setItems(result);
        setLoading(false);
      })
      .catch(() => {
        if (fetchId.current !== id) return;
        // Should not reach here since api.js catches errors,
        // but just in case, set empty (fallback already applied in api layer)
        setItems([]);
        setLoading(false);
      });
  }, [fetchKey]);

  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const visible    = items.slice(page * perPage, page * perPage + perPage);

  return (
    <section className="py-10 border-b border-[#181818] dark:border-[#181818] light:border-gray-200">
      <div className="max-w-[1440px] mx-auto px-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-3">
            <div className="w-1 h-5 bg-[#e63946] rounded-full" />
            <h2 className="text-white dark:text-white font-bold text-base uppercase tracking-widest">{title}</h2>
          </div>
          <Link
            to={buttonTo || '/anime'}
            className="text-[#555] hover:text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-1.5"
          >
            See All <span className="text-base leading-none">›</span>
          </Link>
        </div>

        {/* Cards row */}
        <div className="flex items-stretch gap-4">
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className="flex-shrink-0 self-center w-9 h-9 flex items-center justify-center text-white/40 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors text-2xl bg-[#181818] hover:bg-[#222] rounded-sm"
          >
            ‹
          </button>

          <div className="grid grid-cols-6 gap-4 flex-1 min-w-0">
            {loading
              ? Array.from({ length: perPage }).map((_, i) => <SkeletonCard key={i} />)
              : visible.length > 0
                ? visible.map((item, i) => (
                    <AnimeCard
                      key={item.mal_id ?? i}
                      item={item}
                      to={cardType === 'manga' ? '/read' : '/watch'}
                      index={i}
                    />
                  ))
                : Array.from({ length: perPage }).map((_, i) => <SkeletonCard key={i} />)
            }
          </div>

          <button
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="flex-shrink-0 self-center w-9 h-9 flex items-center justify-center text-white/40 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors text-2xl bg-[#181818] hover:bg-[#222] rounded-sm"
          >
            ›
          </button>
        </div>

        {/* Page dots */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-1.5 mt-6">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`rounded-full transition-all ${i === page ? 'w-4 h-1.5 bg-[#e63946]' : 'w-1.5 h-1.5 bg-[#333] hover:bg-[#555]'}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AnimeCarousel;
