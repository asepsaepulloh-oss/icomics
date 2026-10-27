import { MangaItem, MangaListResponse, MangaDetail, MangaChapter, MangaPage } from '@/types/manga';

const RAW_BASE = process.env.NEXT_PUBLIC_MANGA_API_BASE_URL || 'https://apis.louiv.me/api';
export const MANGA_API_BASE_URL = RAW_BASE.replace(/\/+$/, '');

export async function fetchMangaApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${MANGA_API_BASE_URL}${cleanEndpoint}`;

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      'Accept': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }

  const json = await res.json();
  if (json.success === false) {
    throw new Error(json.error || 'API request failed');
  }

  return json.data as T;
}

// 1. Popular Manga
export async function getPopularManga(page = 1) {
  return fetchMangaApi<MangaListResponse>(`/manga/popular?page=${page}`);
}

// 2. Latest Manga
export async function getLatestManga(page = 1) {
  return fetchMangaApi<MangaListResponse>(`/manga/latest?page=${page}`);
}

// 3. Search Manga
export async function searchManga(keyword: string, page = 1) {
  if (!keyword.trim()) return { mangas: [], hasNextPage: false };
  return fetchMangaApi<MangaListResponse>(`/manga/search?q=${encodeURIComponent(keyword.trim())}&page=${page}`);
}

// 4. Manga Detail
export async function getMangaDetail(mangaId: string) {
  return fetchMangaApi<MangaDetail>(`/manga/${encodeURIComponent(mangaId)}`);
}

// 5. Manga Chapters
export async function getMangaChapters(mangaId: string) {
  return fetchMangaApi<MangaChapter[]>(`/manga/${encodeURIComponent(mangaId)}/chapters`);
}

// 6. Chapter Pages
export async function getChapterPages(chapterId: string) {
  return fetchMangaApi<MangaPage[]>(`/manga/chapter/${encodeURIComponent(chapterId)}/pages`);
}

// 7. Helper for Proxied Image URL
export function getProxiedImageUrl(rawUrl: string): string {
  if (!rawUrl) return '';
  if (rawUrl.includes('/manga/image?url=')) {
    return rawUrl;
  }
  return `${MANGA_API_BASE_URL}/manga/image?url=${encodeURIComponent(rawUrl)}`;
}
