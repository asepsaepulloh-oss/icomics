'use client';

import React from 'react';
import Link from 'next/link';
import { History, BookOpen, Trash2 } from 'lucide-react';
import { useReadingHistory } from '@/lib/storage';
import { getProxiedImageUrl } from '@/lib/api';

export default function HistoryPage() {
  const { history, clearHistory, isLoaded } = useReadingHistory();

  if (!isLoaded) {
    return <div className="py-20 text-center text-neu-muted text-sm">Memuat riwayat bacaan...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neu-surface shadow-neu-btn flex items-center justify-center text-neu-secondary">
            <History size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-black">Riwayat Membaca</h1>
            <p className="text-xs text-neu-muted mt-0.5">Lanjutkan membaca chapter terakhir yang Anda buka.</p>
          </div>
        </div>

        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neu-surface shadow-neu-btn text-xs font-bold text-red-400 hover:brightness-110 transition-all"
          >
            <Trash2 size={14} />
            <span>Hapus Semua</span>
          </button>
        )}
      </div>

      {history.length > 0 ? (
        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item.mangaId}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-neu-surface shadow-neu-flat border border-[#1e2230] hover:bg-[#252a38] transition-all"
            >
              <div className="flex items-center gap-4">
                <img
                  src={getProxiedImageUrl(item.thumbnail)}
                  alt={item.title}
                  className="w-12 h-16 object-cover rounded-xl shadow-md"
                />
                <div>
                  <Link
                    href={`/manga/${item.mangaId}`}
                    className="text-sm font-bold text-white hover:text-neu-accent transition-colors line-clamp-1"
                  >
                    {item.title}
                  </Link>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded-md bg-neu-accent/20 text-neu-accent text-[11px] font-bold">
                      {item.chapterName || 'Chapter'}
                    </span>
                    <span className="text-[11px] text-neu-muted">
                      {new Date(item.timestamp).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href={`/read/${item.chapterId}?mangaId=${item.mangaId}&mangaTitle=${encodeURIComponent(item.title)}`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neu-accent text-white text-xs font-bold shadow-neu-btn hover:brightness-110 transition-all"
              >
                <BookOpen size={13} />
                <span>Lanjut Baca</span>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-neu-muted space-y-3">
          <p className="text-base font-semibold">Belum ada riwayat membaca.</p>
          <p className="text-xs">Chapter yang Anda baca akan otomatis tercatat di sini.</p>
        </div>
      )}
    </div>
  );
}
