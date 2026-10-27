'use client';

import React from 'react';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';
import { MangaItem } from '@/types/manga';
import { getProxiedImageUrl } from '@/lib/api';
import { useFavorites } from '@/lib/storage';

interface MangaCardProps {
  manga: MangaItem;
}

export function MangaCard({ manga }: MangaCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const saved = isFavorite(manga.url);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (saved) {
      removeFavorite(manga.url);
    } else {
      addFavorite({
        url: manga.url,
        title: manga.title,
        thumbnail: manga.thumbnail,
      });
    }
  };

  const proxiedCover = getProxiedImageUrl(manga.thumbnail);

  return (
    <div className="group relative flex flex-col rounded-2xl bg-neu-surface p-2.5 shadow-neu-flat hover:shadow-neu-inset transition-all duration-300">
      <Link href={`/manga/${manga.url}`} className="block relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#14161f]">
        <img
          src={proxiedCover}
          alt={manga.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <button
          onClick={handleToggleFavorite}
          className={`absolute top-2 right-2 w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-md transition-all ${
            saved
              ? 'bg-neu-accent text-white shadow-md'
              : 'bg-black/50 text-neu-muted hover:text-white'
          }`}
          aria-label="Simpan ke Favorit"
        >
          <Bookmark size={15} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </Link>

      <div className="mt-2.5 px-1 flex-1 flex flex-col justify-between">
        <Link href={`/manga/${manga.url}`}>
          <h3
            className="text-xs sm:text-sm font-bold text-neu-text line-clamp-2 leading-snug group-hover:text-neu-accent transition-colors"
            title={manga.title}
          >
            {manga.title}
          </h3>
        </Link>
      </div>
    </div>
  );
}
