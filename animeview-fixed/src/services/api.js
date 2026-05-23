import { FALLBACK_ANIME, FALLBACK_SEASONAL, FALLBACK_MANGA } from '../data/fallbackData';

const BASE = 'https://api.jikan.moe/v4';

// Simple in-memory cache to avoid re-fetching same data
const cache = new Map();

async function jikan(path, fallback = null) {
  if (cache.has(path)) return cache.get(path);
  
  try {
    const res = await fetch(`${BASE}${path}`);
    
    // Handle rate limiting (429) — return fallback immediately
    if (res.status === 429) {
      console.warn(`Jikan rate limited on ${path}, using fallback data.`);
      return fallback || [];
    }
    
    if (!res.ok) throw new Error(`Jikan ${path} → ${res.status}`);
    
    const json = await res.json();
    const data = json.data;
    
    if (!Array.isArray(data) || data.length === 0) {
      return fallback || [];
    }
    
    cache.set(path, data);
    return data;
  } catch (err) {
    console.warn(`Jikan fetch failed for ${path}:`, err.message);
    return fallback || [];
  }
}

// ── Carousel / home sections ─────────────────────────────────────────────────

export const fetchTopAnime      = (limit = 12, page = 1) =>
  jikan(`/top/anime?limit=${limit}&page=${page}`, FALLBACK_ANIME.slice(0, limit));

export const fetchTopManga      = (limit = 12, page = 1) =>
  jikan(`/top/manga?limit=${limit}&page=${page}`, FALLBACK_MANGA.slice(0, limit));

export const fetchSeasonalAnime = (limit = 12) =>
  jikan(`/seasons/now?limit=${limit}`, FALLBACK_SEASONAL.slice(0, limit));

export const fetchSeasonNow     = (limit = 6) =>
  jikan(`/seasons/now?limit=${limit}`, FALLBACK_SEASONAL.slice(0, limit));

// Recommendations use page 2 so they differ from "Popular" section
export const fetchRecommendedAnime = (limit = 5) =>
  jikan(`/top/anime?limit=${limit}&page=2`, FALLBACK_ANIME.slice(0, limit));

export const fetchRecommendedManga = (limit = 5) =>
  jikan(`/top/manga?limit=${limit}&page=2`, FALLBACK_MANGA.slice(0, limit));

// ── Browse page category fetchers ────────────────────────────────────────────

export const fetchAiringAnime   = (limit = 21) =>
  jikan(`/anime?status=airing&order_by=score&sort=desc&limit=${limit}&sfw=true`, FALLBACK_ANIME.slice(0, limit));

export const fetchFinishedAnime = (limit = 21) =>
  jikan(`/anime?status=complete&order_by=score&sort=desc&limit=${limit}&sfw=true`, FALLBACK_ANIME.slice(0, limit));

export const fetchPopularAnime  = (limit = 21) =>
  jikan(`/top/anime?limit=${limit}&filter=bypopularity`, FALLBACK_ANIME.slice(0, limit));

export const fetchNewAnime      = (limit = 21) =>
  jikan(`/seasons/now?limit=${limit}`, FALLBACK_SEASONAL.slice(0, limit));

export const fetchAiringManga   = (limit = 21) =>
  jikan(`/manga?status=publishing&order_by=score&sort=desc&limit=${limit}&sfw=true`, FALLBACK_MANGA.slice(0, limit));

export const fetchFinishedManga = (limit = 21) =>
  jikan(`/manga?status=complete&order_by=score&sort=desc&limit=${limit}&sfw=true`, FALLBACK_MANGA.slice(0, limit));

export const fetchPopularManga  = (limit = 21) =>
  jikan(`/top/manga?limit=${limit}&filter=bypopularity`, FALLBACK_MANGA.slice(0, limit));

// ── Watch page ───────────────────────────────────────────────────────────────

export const fetchAnimeById = (id) =>
  jikan(`/anime/${id}`, null);

// ── Search ───────────────────────────────────────────────────────────────────

export async function searchAnime(query) {
  if (!query || query.trim().length < 2) return [];
  try {
    const res = await fetch(`${BASE}/anime?q=${encodeURIComponent(query.trim())}&limit=8&sfw=true`);
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch {
    return [];
  }
}
