import { useState } from 'react';

const GenreFilter = ({ genres }) => {
  const [active, setActive] = useState(0);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {genres.map((genre, i) => (
        <button
          key={genre}
          onClick={() => setActive(i)}
          className={`text-[10px] px-2 py-0.5 border transition-colors ${
            active === i
              ? 'border-white text-white bg-transparent'
              : 'border-[#555] text-[#888] hover:border-white hover:text-white'
          }`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;
