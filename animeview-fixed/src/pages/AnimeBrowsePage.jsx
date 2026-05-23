import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimeCard from '../components/AnimeCard';
import {
  fetchTopAnime,
  fetchSeasonalAnime,
  fetchPopularAnime,
  fetchAiringAnime,
  fetchFinishedAnime,
} from '../services/api';


const CATEGORIES = [
  {
    label: 'Popular',
    key: 'popular',
    fetcher: () => fetchTopAnime(21),
  },
  {
    label: 'New',
    key: 'new',
    fetcher: () => fetchSeasonalAnime(21),
  },
  {
    label: 'Most Watched',
    key: 'most-watched',
    fetcher: () => fetchPopularAnime(21),
  },
  {
    label: 'On-Going',
    key: 'airing',
    fetcher: () => fetchAiringAnime(21),
  },
  {
    label: 'Finished',
    key: 'finished',
    fetcher: () => fetchFinishedAnime(21),
  },
];

const SkeletonCard = () => (
  <div className="flex flex-col">
    <div className="skeleton rounded-sm" style={{ paddingTop: '148%', width: '100%' }} />
    <div className="skeleton h-3 rounded mt-2.5 w-4/5" />
    <div className="skeleton h-2.5 rounded mt-1.5 w-2/5" />
  </div>
);

const AnimeBrowsePage = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [items, setItems]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const fetchId = useRef(0);

  useEffect(() => {
    const cat = CATEGORIES[activeIdx];
    const id  = ++fetchId.current;
    setLoading(true);
    cat.fetcher()
      .then(data => {
        if (fetchId.current !== id) return;
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        if (fetchId.current !== id) return;
        setItems([]);
        setLoading(false);
      });
  }, [activeIdx]); 

  return (
    <div className="min-h-screen w-full bg-[#0d0d0d] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-10 py-10">
        <div className="mb-7">
          <h1
            className="text-white font-black text-3xl mb-1"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em' }}
          >
            Browse Anime
          </h1>
          <p className="text-[#444] text-sm font-medium">Anime View · Top Picks</p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.key}
              onClick={() => setActiveIdx(i)}
              className={`text-sm px-5 py-2 border transition-all font-semibold rounded-sm ${
                activeIdx === i
                  ? 'border-[#e63946] text-white bg-[#e63946]/10'
                  : 'border-[#2a2a2a] text-[#555] hover:border-[#444] hover:text-[#aaa]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-7 gap-5">
            {Array.from({ length: 21 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : items.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-[#444] text-sm">No results found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-5">
            {items.map((item, i) => (
              <AnimeCard key={item.mal_id} item={item} to="/watch" index={i} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AnimeBrowsePage;
