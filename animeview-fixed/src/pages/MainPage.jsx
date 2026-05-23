import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AnimeCarousel from '../components/AnimeCarousel';
import RecommendationSection from '../components/RecommendationSection';
import Footer from '../components/Footer';
import {
  fetchTopAnime,
  fetchTopManga,
  fetchSeasonalAnime,
  fetchRecommendedAnime,
  fetchRecommendedManga,
} from '../services/api';

const MainPage = () => (
  <div className="min-h-screen w-full bg-[#0d0d0d] flex flex-col">
    <Navbar />
    <HeroSection />

    {/* Popular Anime — top/anime page 1 */}
    <AnimeCarousel
      title="Popular Anime This Week"
      fetcher={() => fetchTopAnime(12)}
      fetchKey="top-anime-p1"
      buttonTo="/anime"
      cardType="anime"
    />

    {/* New This Season — seasons/now (different results) */}
    <AnimeCarousel
      title="New This Season"
      fetcher={() => fetchSeasonalAnime(12)}
      fetchKey="seasonal-anime"
      buttonTo="/anime"
      cardType="anime"
    />

    {/* Popular Manga — top/manga page 1 */}
    <AnimeCarousel
      title="Popular Manga This Week"
      fetcher={() => fetchTopManga(12)}
      fetchKey="top-manga-p1"
      buttonTo="/manga"
      cardType="manga"
    />

    {/* Recommendations — page 2 of top (different entries) */}
    <RecommendationSection
      title="Anime Recommendation"
      fetcher={() => fetchRecommendedAnime(5)}
      fetchKey="rec-anime"
      cardTo="/watch"
    />

    <RecommendationSection
      title="Manga Recommendation"
      fetcher={() => fetchRecommendedManga(5)}
      fetchKey="rec-manga"
      cardTo="/read"
    />

    <Footer />
  </div>
);

export default MainPage;
