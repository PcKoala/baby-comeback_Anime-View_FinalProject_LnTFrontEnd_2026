import { Link } from 'react-router-dom';

const FALLBACK_IMG = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="225" height="330" viewBox="0 0 225 330"%3E%3Crect width="225" height="330" fill="%231c1c1c"/%3E%3Crect x="60" y="100" width="105" height="130" rx="8" fill="%23252525"/%3E%3Ccircle cx="112" cy="140" r="28" fill="%23333"/%3E%3Crect x="75" y="180" width="75" height="8" rx="4" fill="%23333"/%3E%3Crect x="85" y="198" width="55" height="6" rx="3" fill="%23292929"/%3E%3Ctext x="50%25" y="82%25" dominant-baseline="middle" text-anchor="middle" fill="%23e63946" font-size="11" font-family="sans-serif" font-weight="600"%3ENo Image%3C/text%3E%3C/svg%3E';

// Extract the best available image URL from a Jikan API item
function getImage(item) {
  if (!item) return FALLBACK_IMG;
  const jpg = item?.images?.jpg;
  const webp = item?.images?.webp;
  // Prefer large, fall back to regular
  return jpg?.large_image_url || jpg?.image_url || webp?.large_image_url || webp?.image_url || FALLBACK_IMG;
}

const AnimeCard = ({ item, to = '/watch', index = 0 }) => {
  const image = getImage(item);
  const title = item?.title || item?.title_english || 'Unknown';
  const score = item?.score;
  const episodes = item?.episodes;
  const type = item?.type;

  const linkState = (to === '/watch' || to === '/read') ? { state: { anime: item } } : {};

  return (
    <Link
      to={to}
      {...linkState}
      className="group flex flex-col card-hover cursor-pointer fade-up"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}
    >
      {/* Poster */}
      <div className="relative overflow-hidden rounded-sm bg-[#1c1c1c]" style={{ paddingTop: '148%' }}>
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          onError={e => {
            if (e.currentTarget.src !== FALLBACK_IMG) {
              e.currentTarget.src = FALLBACK_IMG;
            }
          }}
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Score badge */}
        {score && (
          <div className="absolute top-2 left-2 bg-[#e63946] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
            ★ {score.toFixed(1)}
          </div>
        )}

        {/* Type badge */}
        {type && (
          <div className="absolute top-2 right-2 bg-black/70 text-[#aaa] text-[9px] font-semibold px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
            {type}
          </div>
        )}

        {/* Hover info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {episodes && (
            <p className="text-white/70 text-[10px] font-medium">{episodes} eps</p>
          )}
          <p className="text-white text-xs font-bold leading-tight mt-0.5 line-clamp-2">{title}</p>
        </div>
      </div>

      {/* Title below */}
      <p className="text-white font-semibold text-sm mt-2.5 leading-tight line-clamp-2 group-hover:text-[#e63946] transition-colors">
        {title}
      </p>
      {score && (
        <p className="text-[#666] text-xs mt-1 font-medium">★ {score.toFixed(1)}</p>
      )}
    </Link>
  );
};

export default AnimeCard;
