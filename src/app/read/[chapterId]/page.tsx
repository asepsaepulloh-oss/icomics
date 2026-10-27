'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Settings,
  Layers,
  Sliders,
  RotateCcw,
  AlertTriangle,
  Loader2,
} from 'lucide-react';
import { getChapterPages, getProxiedImageUrl, getMangaChapters } from '@/lib/api';
import { MangaPage, MangaChapter } from '@/types/manga';
import { useReadingHistory } from '@/lib/storage';

export default function ReaderPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const chapterId = (params.chapterId as string) || '';
  const mangaId = searchParams.get('mangaId') || '';
  const mangaTitle = searchParams.get('mangaTitle') || 'Komik';

  const [pages, setPages] = useState<MangaPage[]>([]);
  const [chapters, setChapters] = useState<MangaChapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Settings
  const [mode, setMode] = useState<'long-strip' | 'single-page'>('long-strip');
  const [singleIndex, setSingleIndex] = useState(0);
  const [maxWidth, setMaxWidth] = useState<number>(850); // in px
  const [showSettings, setShowSettings] = useState(false);

  const { saveHistory } = useReadingHistory();

  // 1. Fetch Pages
  useEffect(() => {
    async function loadPages() {
      setLoading(true);
      setError(null);
      try {
        const pagesRes = await getChapterPages(chapterId);
        // Sort pages by index ascending
        const sorted = (pagesRes || []).sort((a, b) => a.index - b.index);
        setPages(sorted);

        // Save history if manga context exists
        if (mangaId) {
          saveHistory({
            mangaId,
            title: decodeURIComponent(mangaTitle),
            thumbnail: '',
            chapterId,
            chapterName: `Chapter`,
            lastPageIndex: 0,
            readerMode: mode,
            timestamp: Date.now(),
          });
        }
      } catch (err: any) {
        console.error('Error fetching chapter pages:', err);
        setError('Gagal memuat halaman chapter komik.');
      } finally {
        setLoading(false);
      }
    }

    if (chapterId) {
      loadPages();
    }
  }, [chapterId, mangaId, mangaTitle]);

  // 2. Fetch Chapters for Next / Prev navigation
  useEffect(() => {
    if (!mangaId) return;
    async function loadChList() {
      try {
        const list = await getMangaChapters(mangaId);
        setChapters(list || []);
      } catch (err) {
        console.error('Error loading chapters context:', err);
      }
    }
    loadChList();
  }, [mangaId]);

  // Current chapter index in chapter list
  const currentChIndex = chapters.findIndex((c) => c.url === chapterId);
  // Chapters are usually in descending order (newest first)
  const prevChapter = currentChIndex !== -1 && currentChIndex < chapters.length - 1 ? chapters[currentChIndex + 1] : null;
  const nextChapter = currentChIndex !== -1 && currentChIndex > 0 ? chapters[currentChIndex - 1] : null;

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Top Floating Control Bar */}
      <div className="sticky top-2 z-30 w-full max-w-4xl px-4 mb-4">
        <div className="flex items-center justify-between p-3 rounded-2xl bg-neu-surface/90 backdrop-blur-md shadow-neu-flat border border-[#1e2230]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => (mangaId ? router.push(`/manga/${mangaId}`) : router.push('/'))}
              className="w-9 h-9 rounded-xl bg-neu-surface shadow-neu-btn flex items-center justify-center text-neu-muted hover:text-white"
              title="Kembali"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="truncate max-w-[200px] sm:max-w-md">
              <h4 className="text-xs font-bold text-white truncate">{decodeURIComponent(mangaTitle)}</h4>
              <span className="text-[10px] text-neu-muted">
                {mode === 'long-strip' ? `${pages.length} Halaman` : `Halaman ${singleIndex + 1} / ${pages.length}`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mode Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-neu-surface shadow-neu-inset">
              <button
                onClick={() => setMode('long-strip')}
                className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  mode === 'long-strip' ? 'bg-neu-surface text-neu-accent shadow-neu-btn' : 'text-neu-muted hover:text-white'
                }`}
              >
                Long Strip
              </button>
              <button
                onClick={() => setMode('single-page')}
                className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  mode === 'single-page' ? 'bg-neu-surface text-neu-accent shadow-neu-btn' : 'text-neu-muted hover:text-white'
                }`}
              >
                Single Page
              </button>
            </div>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className="w-9 h-9 rounded-xl bg-neu-surface shadow-neu-btn flex items-center justify-center text-neu-muted hover:text-white"
              title="Pengaturan Reader"
            >
              <Settings size={16} />
            </button>
          </div>
        </div>

        {/* Settings Drawer Panel */}
        {showSettings && (
          <div className="mt-2 p-4 rounded-2xl bg-neu-surface shadow-neu-flat border border-[#1e2230] flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <span className="text-neu-muted font-bold">Lebar Maksimal:</span>
              <div className="flex items-center gap-1.5">
                {[650, 850, 1050, 1200].map((w) => (
                  <button
                    key={w}
                    onClick={() => setMaxWidth(w)}
                    className={`px-3 py-1.5 rounded-xl font-bold ${
                      maxWidth === w ? 'bg-neu-surface text-neu-accent shadow-neu-inset' : 'bg-neu-surface shadow-neu-btn text-neu-muted hover:text-white'
                    }`}
                  >
                    {w}px
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reader Content Area */}
      {loading ? (
        <div className="py-28 flex flex-col items-center justify-center">
          <Loader2 size={36} className="text-neu-accent animate-spin mb-3" />
          <p className="text-xs text-neu-muted">Memuat halaman komik...</p>
        </div>
      ) : error ? (
        <div className="py-28 flex flex-col items-center justify-center text-center">
          <AlertTriangle size={36} className="text-red-400 mb-2" />
          <p className="text-sm text-neu-muted">{error}</p>
        </div>
      ) : mode === 'long-strip' ? (
        /* LONG STRIP MODE */
        <div className="w-full flex flex-col items-center space-y-2 pb-16" style={{ maxWidth: `${maxWidth}px` }}>
          {pages.map((p) => (
            <div key={p.index} className="w-full relative bg-[#13151f] rounded-lg overflow-hidden shadow-sm">
              <img
                src={getProxiedImageUrl(p.imageUrl)}
                alt={`Halaman ${p.index + 1}`}
                loading="lazy"
                className="w-full h-auto object-contain block mx-auto"
              />
            </div>
          ))}
        </div>
      ) : (
        /* SINGLE PAGE MODE */
        <div className="w-full flex flex-col items-center pb-16" style={{ maxWidth: `${maxWidth}px` }}>
          {pages[singleIndex] && (
            <div className="w-full relative bg-[#13151f] rounded-2xl overflow-hidden shadow-neu-flat border border-[#1e2230]">
              <img
                src={getProxiedImageUrl(pages[singleIndex].imageUrl)}
                alt={`Halaman ${singleIndex + 1}`}
                className="w-full h-auto object-contain block mx-auto cursor-pointer"
                onClick={() => {
                  if (singleIndex < pages.length - 1) setSingleIndex(singleIndex + 1);
                }}
              />
            </div>
          )}

          {/* Single Page Pagination */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={() => setSingleIndex((prev) => Math.max(0, prev - 1))}
              disabled={singleIndex === 0}
              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-neu-surface shadow-neu-btn text-xs font-bold text-neu-text disabled:opacity-30 disabled:cursor-not-allowed hover:text-white"
            >
              <ChevronLeft size={16} />
              <span>Sebelumnya</span>
            </button>
            <span className="text-xs font-mono font-bold text-neu-accent">
              {singleIndex + 1} / {pages.length}
            </span>
            <button
              onClick={() => setSingleIndex((prev) => Math.min(pages.length - 1, prev + 1))}
              disabled={singleIndex === pages.length - 1}
              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-neu-surface shadow-neu-btn text-xs font-bold text-neu-text disabled:opacity-30 disabled:cursor-not-allowed hover:text-white"
            >
              <span>Selanjutnya</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Chapter Switcher Navigation */}
      <div className="w-full max-w-4xl px-4 pb-12 flex items-center justify-between gap-4 border-t border-[#1e2230] pt-6">
        {prevChapter ? (
          <Link
            href={`/read/${prevChapter.url}?mangaId=${mangaId}&mangaTitle=${encodeURIComponent(mangaTitle)}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neu-surface shadow-neu-btn text-xs font-bold text-neu-text hover:text-white transition-all"
          >
            <ChevronLeft size={16} />
            <span>{prevChapter.name || 'Chapter Sebelumnya'}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextChapter ? (
          <Link
            href={`/read/${nextChapter.url}?mangaId=${mangaId}&mangaTitle=${encodeURIComponent(mangaTitle)}`}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-neu-accent text-white shadow-neu-btn text-xs font-bold hover:brightness-110 transition-all"
          >
            <span>{nextChapter.name || 'Chapter Berikutnya'}</span>
            <ChevronRight size={16} />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
