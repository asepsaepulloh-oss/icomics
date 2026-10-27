'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bookmark, Trash2 } from 'lucide-react';
import { useFavorites } from '@/lib/storage';
import { MangaCard } from '@/components/manga/MangaCard';

export default function FavoritesPage() {
  const { favorites, isLoaded } = useFavorites();

  if (!isLoaded) {
    return <div className="py-20 text-center text-neu-muted text-sm">Memuat komik favorit...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-neu-surface shadow-neu-btn flex items-center justify-center text-neu-accent">
          <Bookmark size={22} fill="currentColor" />
        </div>
        <div>
          <h1 className="text-2xl font-black">Komik Favorit</h1>
          <p className="text-xs text-neu-muted mt-0.5">Daftar komik yang Anda simpan di perangkat ini.</p>
        </div>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {favorites.map((fav) => (
            <MangaCard
              key={fav.url}
              manga={{
                title: fav.title,
                thumbnail: fav.thumbnail,
                url: fav.url,
                mangaUrl: '',
              }}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-neu-muted space-y-3">
          <p className="text-base font-semibold">Belum ada komik favorit.</p>
          <p className="text-xs">Klik ikon bookmark pada komik untuk menyimpannya ke koleksi ini.</p>
          <Link
            href="/popular"
            className="inline-block px-5 py-2.5 rounded-xl bg-neu-accent text-white text-xs font-bold shadow-neu-btn"
          >
            Jelajahi Komik Populer
          </Link>
        </div>
      )}
    </div>
  );
}
