// Fallback anime data using Jikan CDN image URLs
// Used when the Jikan API is rate-limited or unavailable

const PLACEHOLDER = 'https://via.placeholder.com/225x330/1c1c1c/e63946?text=Anime';

export const FALLBACK_ANIME = [
  { mal_id: 5114, title: 'Fullmetal Alchemist: Brotherhood', score: 9.11, type: 'TV', episodes: 64, images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/1208/94745.jpg', large_image_url: 'https://cdn.myanimelist.net/images/anime/1208/94745l.jpg' } } },
  { mal_id: 9253, title: 'Steins;Gate', score: 9.07, type: 'TV', episodes: 24, images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/5/73199.jpg', large_image_url: 'https://cdn.myanimelist.net/images/anime/5/73199l.jpg' } } },
  { mal_id: 28977, title: 'Gintama°', score: 9.05, type: 'TV', episodes: 51, images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/3/72078.jpg', large_image_url: 'https://cdn.myanimelist.net/images/anime/3/72078l.jpg' } } },
  { mal_id: 38524, title: 'Shingeki no Kyojin Season 3 Part 2', score: 9.05, type: 'TV', episodes: 10, images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/1517/100616.jpg', large_image_url: 'https://cdn.myanimelist.net/images/anime/1517/100616l.jpg' } } },
  { mal_id: 11061, title: 'Hunter x Hunter (2011)', score: 9.03, type: 'TV', episodes: 148, images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/1337/99013.jpg', large_image_url: 'https://cdn.myanimelist.net/images/anime/1337/99013l.jpg' } } },
  { mal_id: 820, title: 'Ginga Eiyuu Densetsu', score: 9.03, type: 'OVA', episodes: 110, images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/13/13225.jpg', large_image_url: 'https://cdn.myanimelist.net/images/anime/13/13225l.jpg' } } },
  { mal_id: 15335, title: 'Gintama Movie: Kanketsu-hen', score: 9.02, type: 'Movie', episodes: 1, images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/3/65999.jpg', large_image_url: 'https://cdn.myanimelist.net/images/anime/3/65999l.jpg' } } },
  { mal_id: 1535, title: 'Death Note', score: 8.62, type: 'TV', episodes: 37, images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/9/9453.jpg', large_image_url: 'https://cdn.myanimelist.net/images/anime/9/9453l.jpg' } } },
  { mal_id: 199, title: 'Sen to Chihiro no Kamikakushi', score: 8.86, type: 'Movie', episodes: 1, images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/6/79597.jpg', large_image_url: 'https://cdn.myanimelist.net/images/anime/6/79597l.jpg' } } },
  { mal_id: 21, title: 'One Piece', score: 8.71, type: 'TV', episodes: null, images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/6/73245.jpg', large_image_url: 'https://cdn.myanimelist.net/images/anime/6/73245l.jpg' } } },
  { mal_id: 269, title: 'Bleach', score: 7.87, type: 'TV', episodes: 366, images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/3/40451.jpg', large_image_url: 'https://cdn.myanimelist.net/images/anime/3/40451l.jpg' } } },
  { mal_id: 20, title: 'Naruto', score: 7.97, type: 'TV', episodes: 220, images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/13/17405.jpg', large_image_url: 'https://cdn.myanimelist.net/images/anime/13/17405l.jpg' } } },
];

export const FALLBACK_SEASONAL = [
  { mal_id: 40748, title: 'Jujutsu Kaisen', score: 8.57, type: 'TV', episodes: 24, images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg', large_image_url: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg' } } },
  { mal_id: 48583, title: 'Kimetsu no Yaiba: Yuukaku-hen', score: 8.87, type: 'TV', episodes: 11, images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/1908/120036.jpg', large_image_url: 'https://cdn.myanimelist.net/images/anime/1908/120036l.jpg' } } },
  { mal_id: 50265, title: 'Boku no Hero Academia 6th Season', score: 8.01, type: 'TV', episodes: 25, images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/1315/126686.jpg', large_image_url: 'https://cdn.myanimelist.net/images/anime/1315/126686l.jpg' } } },
  { mal_id: 47778, title: 'Chainsaw Man', score: 8.72, type: 'TV', episodes: 12, images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/1806/126216.jpg', large_image_url: 'https://cdn.myanimelist.net/images/anime/1806/126216l.jpg' } } },
  { mal_id: 49596, title: 'Spy x Family', score: 8.62, type: 'TV', episodes: 25, images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/1441/122795.jpg', large_image_url: 'https://cdn.myanimelist.net/images/anime/1441/122795l.jpg' } } },
  { mal_id: 51009, title: 'Bleach: Sennen Kessen-hen', score: 9.03, type: 'TV', episodes: 13, images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/1764/126524.jpg', large_image_url: 'https://cdn.myanimelist.net/images/anime/1764/126524l.jpg' } } },
  { mal_id: 52034, title: 'Oshi no Ko', score: 8.73, type: 'TV', episodes: 11, images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/1812/134736.jpg', large_image_url: 'https://cdn.myanimelist.net/images/anime/1812/134736l.jpg' } } },
  { mal_id: 53887, title: 'Sousou no Frieren', score: 9.06, type: 'TV', episodes: 28, images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/1015/138006.jpg', large_image_url: 'https://cdn.myanimelist.net/images/anime/1015/138006l.jpg' } } },
  { mal_id: 54595, title: 'Mashle: Magic and Muscles 2nd Season', score: 8.33, type: 'TV', episodes: 12, images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/1438/140279.jpg', large_image_url: 'https://cdn.myanimelist.net/images/anime/1438/140279l.jpg' } } },
  { mal_id: 55701, title: 'Dungeon Meshi', score: 8.73, type: 'TV', episodes: 24, images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/1385/140814.jpg', large_image_url: 'https://cdn.myanimelist.net/images/anime/1385/140814l.jpg' } } },
  { mal_id: 57334, title: 'Kimetsu no Yaiba: Hashira Geiko-hen', score: 8.84, type: 'TV', episodes: 8, images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/1898/143408.jpg', large_image_url: 'https://cdn.myanimelist.net/images/anime/1898/143408l.jpg' } } },
  { mal_id: 58426, title: 'Dandadan', score: 8.72, type: 'TV', episodes: 12, images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/1904/145529.jpg', large_image_url: 'https://cdn.myanimelist.net/images/anime/1904/145529l.jpg' } } },
];

export const FALLBACK_MANGA = [
  { mal_id: 2, title: 'Berserk', score: 9.45, type: 'Manga', images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/manga/1/157897.jpg', large_image_url: 'https://cdn.myanimelist.net/images/manga/1/157897l.jpg' } } },
  { mal_id: 1, title: 'Monster', score: 9.13, type: 'Manga', images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/manga/3/258224.jpg', large_image_url: 'https://cdn.myanimelist.net/images/manga/3/258224l.jpg' } } },
  { mal_id: 11977, title: 'Fullmetal Alchemist', score: 9.1, type: 'Manga', images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/manga/3/243675.jpg', large_image_url: 'https://cdn.myanimelist.net/images/manga/3/243675l.jpg' } } },
  { mal_id: 656, title: 'Vinland Saga', score: 8.93, type: 'Manga', images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/manga/2/188925.jpg', large_image_url: 'https://cdn.myanimelist.net/images/manga/2/188925l.jpg' } } },
  { mal_id: 23390, title: 'Shingeki no Kyojin', score: 8.54, type: 'Manga', images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/manga/2/37846.jpg', large_image_url: 'https://cdn.myanimelist.net/images/manga/2/37846l.jpg' } } },
  { mal_id: 13, title: 'One Piece', score: 9.18, type: 'Manga', images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/manga/2/253146.jpg', large_image_url: 'https://cdn.myanimelist.net/images/manga/2/253146l.jpg' } } },
  { mal_id: 107, title: 'Vagabond', score: 9.13, type: 'Manga', images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/manga/1/259070.jpg', large_image_url: 'https://cdn.myanimelist.net/images/manga/1/259070l.jpg' } } },
  { mal_id: 96792, title: 'Dungeon Meshi', score: 8.83, type: 'Manga', images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/manga/3/260340.jpg', large_image_url: 'https://cdn.myanimelist.net/images/manga/3/260340l.jpg' } } },
  { mal_id: 44347, title: 'Jujutsu Kaisen', score: 8.71, type: 'Manga', images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/manga/3/216464.jpg', large_image_url: 'https://cdn.myanimelist.net/images/manga/3/216464l.jpg' } } },
  { mal_id: 119, title: 'Kimetsu no Yaiba', score: 8.31, type: 'Manga', images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/manga/3/179023.jpg', large_image_url: 'https://cdn.myanimelist.net/images/manga/3/179023l.jpg' } } },
  { mal_id: 14124, title: 'Chainsaw Man', score: 8.92, type: 'Manga', images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/manga/3/216464.jpg', large_image_url: 'https://cdn.myanimelist.net/images/manga/3/216464l.jpg' } } },
  { mal_id: 75989, title: 'Spy x Family', score: 8.61, type: 'Manga', images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/manga/3/219741.jpg', large_image_url: 'https://cdn.myanimelist.net/images/manga/3/219741l.jpg' } } },
];
