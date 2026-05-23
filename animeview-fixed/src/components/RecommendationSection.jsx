import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const FALLBACK_IMG = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="158" height="224" viewBox="0 0 158 224"%3E%3Crect width="158" height="224" fill="%231c1c1c"/%3E%3Crect x="40" y="65" width="78" height="95" rx="6" fill="%23252525"/%3E%3Ccircle cx="79" cy="98" r="20" fill="%23333"/%3E%3Crect x="50" y="130" width="58" height="6" rx="3" fill="%23333"/%3E%3Ctext x="50%25" y="84%25" dominant-baseline="middle" text-anchor="middle" fill="%23e63946" font-size="10" font-family="sans-serif"%3ENo Image%3C/text%3E%3C/svg%3E';

function getImage(item) {
  if (!item) return FALLBACK_IMG;
  const jpg = item?.images?.jpg;
  const webp = item?.images?.webp;
  return jpg?.large_image_url || jpg?.image_url || webp?.large_image_url || webp?.image_url || FALLBACK_IMG;
}

const FeaturedCard = ({ item, isFeatured, to }) => {
  const image = getImage(item);
  const title = item?.title || 'Unknown';
  const score = item?.score;
  const height = isFeatured ? '224px' : '172px';
  const width  = isFeatured ? '158px' : '122px';

  return (
    <Link
      to={to || '/watch'}
      state={{ anime: item }}
      className="group flex flex-col card-hover flex-shrink-0"
      style={{ width }}
    >
      <div className="relative overflow-hidden rounded-sm bg-[#1c1c1c]" style={{ width, height }}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={e => {
            if (e.currentTarget.src !== FALLBACK_IMG) e.currentTarget.src = FALLBACK_IMG;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {score && (
          <div className="absolute top-2 left-2 bg-[#e63946] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm">
            ★ {score.toFixed(1)}
          </div>
        )}
        {isFeatured && (
          <div className="absolute top-2 right-2 bg-[#e63946]/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase">
            #1
          </div>
        )}
      </div>
      <p className="text-white font-semibold text-xs mt-2 leading-tight line-clamp-2 group-hover:text-[#e63946] transition-colors" style={{ maxWidth: width }}>
        {title}
      </p>
    </Link>
  );
};

const SkeletonFeatured = ({ isFeatured }) => {
  const height = isFeatured ? '224px' : '172px';
  const width  = isFeatured ? '158px' : '122px';
  return (
    <div className="flex flex-col flex-shrink-0" style={{ width }}>
      <div className="skeleton rounded-sm" style={{ width, height }} />
      <div className="skeleton h-3 rounded mt-2 w-4/5" />
    </div>
  );
};

const RecommendationSection = ({ title, fetcher, fetchKey, cardTo }) => {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [review, setReview]   = useState('');
  const fetchId = useRef(0);

  useEffect(() => {
    if (!fetcher) return;
    const id = ++fetchId.current;
    setLoading(true);
    fetcher()
      .then(data => {
        if (fetchId.current !== id) return;
        setItems(Array.isArray(data) ? data.slice(0, 5) : []);
        setLoading(false);
      })
      .catch(() => {
        if (fetchId.current !== id) return;
        setItems([]);
        setLoading(false);
      });
  }, [fetchKey]);

  // Ensure we always show cards even if empty
  const displayItems = items.length > 0 ? items : [];

  return (
    <section className="py-10 border-b border-[#181818]">
      <div className="max-w-[1440px] mx-auto px-10">
        <div className="border border-[#1e1e1e] bg-[#0f0f0f] rounded-sm overflow-hidden">
          {/* Header */}
          <div className="border-b border-[#1e1e1e] px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1 h-4 bg-[#e63946] rounded-full" />
              <p className="text-white font-bold text-sm uppercase tracking-widest">{title}</p>
            </div>
            <span className="text-[#333] text-xs uppercase tracking-widest">Weekly Picks</span>
          </div>

          {/* Cards */}
          <div className="px-8 py-8">
            <div className="flex items-end justify-center gap-6">
              {loading ? (
                <>
                  <SkeletonFeatured />
                  <SkeletonFeatured />
                  <SkeletonFeatured isFeatured />
                  <SkeletonFeatured />
                  <SkeletonFeatured />
                </>
              ) : displayItems.length > 0 ? (
                displayItems.map((item, i) => (
                  <FeaturedCard key={item.mal_id ?? i} item={item} isFeatured={i === 2} to={cardTo} />
                ))
              ) : (
                <>
                  <SkeletonFeatured />
                  <SkeletonFeatured />
                  <SkeletonFeatured isFeatured />
                  <SkeletonFeatured />
                  <SkeletonFeatured />
                </>
              )}
            </div>

            {!loading && displayItems.length > 0 && (
              <p className="text-[#2e2e2e] text-xs text-center mt-4 tracking-wider">
                {displayItems.slice(0, 3).map(i => i.title).join('   ·   ')}
              </p>
            )}

            <div className="mt-6 max-w-xl mx-auto">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={review}
                  onChange={e => setReview(e.target.value)}
                  placeholder="Add your review or recommendation..."
                  className="flex-1 bg-[#141414] border border-[#222] text-white text-sm px-4 py-2.5 outline-none placeholder-[#333] focus:border-[#333] transition-colors rounded-sm"
                />
                <button
                  onClick={() => setReview('')}
                  className="bg-[#e63946]/10 border border-[#e63946]/30 text-[#e63946] text-xs font-semibold px-4 py-2.5 hover:bg-[#e63946]/20 transition-colors rounded-sm whitespace-nowrap"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendationSection;
