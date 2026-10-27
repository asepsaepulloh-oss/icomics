'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowUpDown, Calendar, BookOpen } from 'lucide-react';
import { MangaChapter } from '@/types/manga';

interface ChapterListProps {
  chapters: MangaChapter[];
  mangaId: string;
  mangaTitle: string;
}

export function ChapterList({ chapters, mangaId, mangaTitle }: ChapterListProps) {
  const [filter, setFilter] = useState('');
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = chapters.filter((c) =>
    (c.name || '').toLowerCase().includes(filter.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    return sortAsc ? a.dateUpload - b.dateUpload : b.dateUpload - a.dateUpload;
  });

  return (
    <div className="rounded-3xl bg-neu-surface p-6 sm:p-8 shadow-neu-flat border border-[#1e2230] space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span>Daftar Chapter</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-neu-accent/20 text-neu-accent font-bold">
            {chapters.length} Total
          </span>
        </h2>

        {/* Filter & Sort Controls */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Cari chapter..."
              className="h-9 pl-8 pr-3 rounded-xl bg-neu-surface shadow-neu-inset text-xs text-neu-text placeholder-neu-muted/60 focus:outline-none w-36 sm:w-44"
            />
            <Search size={13} className="absolute left-2.5 top-2.5 text-neu-muted" />
          </div>

          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neu-surface shadow-neu-btn text-xs font-bold text-neu-muted hover:text-white"
          >
            <ArrowUpDown size={13} />
            <span>{sortAsc ? 'Terlama' : 'Terbaru'}</span>
          </button>
        </div>
      </div>

      {sorted.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[500px] overflow-y-auto p-1">
          {sorted.map((ch) => {
            const dateStr = ch.dateUpload
              ? new Date(ch.dateUpload).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
              : null;

            return (
              <Link
                key={ch.url}
                href={`/read/${ch.url}?mangaId=${mangaId}&mangaTitle=${encodeURIComponent(mangaTitle)}`}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-neu-surface shadow-neu-btn hover:shadow-neu-inset hover:text-neu-accent transition-all group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <BookOpen size={15} className="text-neu-muted group-hover:text-neu-accent flex-shrink-0" />
                  <span className="text-xs font-bold text-neu-text group-hover:text-neu-accent truncate">
                    {ch.name}
                  </span>
                </div>
                {dateStr && (
                  <span className="text-[10px] text-neu-muted flex-shrink-0 ml-2">
                    {dateStr}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="py-12 text-center text-neu-muted text-xs">
          Tidak ada chapter yang ditemukan.
        </div>
      )}
    </div>
  );
}
