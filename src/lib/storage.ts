import { useState, useEffect } from 'react';
import { FavoriteManga, ReadingHistoryItem } from '@/types/manga';

const STORAGE_FAVORITES = 'icomic_favorites';
const STORAGE_HISTORY = 'icomic_history';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteManga[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const data = localStorage.getItem(STORAGE_FAVORITES);
      if (data) {
        setFavorites(JSON.parse(data));
      }
    } catch {}
    setIsLoaded(true);
  }, []);

  const addFavorite = (item: { url: string; title: string; thumbnail: string }) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.url === item.url)) return prev;
      const next = [{ ...item, addedAt: Date.now() }, ...prev];
      try {
        localStorage.setItem(STORAGE_FAVORITES, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const removeFavorite = (mangaId: string) => {
    setFavorites((prev) => {
      const next = prev.filter((f) => f.url !== mangaId);
      try {
        localStorage.setItem(STORAGE_FAVORITES, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const isFavorite = (mangaId: string) => favorites.some((f) => f.url === mangaId);

  return { favorites, isLoaded, addFavorite, removeFavorite, isFavorite };
}

export function useReadingHistory() {
  const [history, setHistory] = useState<ReadingHistoryItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const data = localStorage.getItem(STORAGE_HISTORY);
      if (data) {
        setHistory(JSON.parse(data));
      }
    } catch {}
    setIsLoaded(true);
  }, []);

  const saveHistory = (item: ReadingHistoryItem) => {
    setHistory((prev) => {
      const filtered = prev.filter((h) => h.mangaId !== item.mangaId);
      const next = [item, ...filtered].slice(0, 50);
      try {
        localStorage.setItem(STORAGE_HISTORY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_HISTORY);
    } catch {}
  };

  return { history, isLoaded, saveHistory, clearHistory };
}
