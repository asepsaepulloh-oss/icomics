import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BookOpen, Bookmark, User, Palette, Layers, Calendar, ArrowLeft } from 'lucide-react';
import { getMangaDetail, getMangaChapters, getProxiedImageUrl } from '@/lib/api';
import { MangaChapter } from '@/types/manga';
import { ChapterList } from './ChapterList';

interface MangaDetailPageProps {
  params: Promise<{ mangaId: string }>;
}

export default async function MangaDetailPage({ params }: MangaDetailPageProps) {
  const { mangaId } = await params;
  let detail = null;
  let chapters: MangaChapter[] = [];

  try {
    const [dRes, cRes] = await Promise.all([
      getMangaDetail(mangaId),
      getMangaChapters(mangaId).catch(() => []),
    ]);
    detail = dRes;
    chapters = cRes || [];
  } catch (err) {
    console.error('Error fetching manga detail:', err);
  }

  if (!detail) {
    notFound();
  }

  const genres = (detail.genre || '')
    .split(',')
    .map((g) => g.trim())
    .filter(Boolean);

  const firstChapter = chapters.length > 0 ? chapters[chapters.length - 1] : null; // Usually last element in descending order is ch 1
  const latestChapter = chapters.length > 0 ? chapters[0] : null;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-neu-muted hover:text-white"
      >
        <ArrowLeft size={14} />
        <span>Kembali ke Beranda</span>
      </Link>

      {/* Main Detail Header Card */}
      <div className="rounded-3xl bg-neu-surface p-6 sm:p-8 shadow-neu-flat border border-[#1e2230] flex flex-col md:flex-row gap-8 items-center md:items-start">
        <img
          src={getProxiedImageUrl(detail.thumbnail)}
          alt={detail.title}
          className="w-48 sm:w-56 aspect-[3/4] object-cover rounded-2xl shadow-neu-flat border border-[#232736]"
        />

        <div className="flex-1 space-y-4 text-center md:text-left">
          <div>
            <span
              className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                detail.status === 'Completed'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-neu-accent/20 text-neu-accent'
              }`}
            >
              {detail.status || 'Ongoing'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-2 leading-tight">
              {detail.title}
            </h1>
          </div>

          {/* Author & Artist */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-neu-muted font-medium">
            {detail.author && (
              <span className="flex items-center gap-1.5">
                <User size={13} className="text-neu-secondary" />
                <span>Author: {detail.author}</span>
              </span>
            )}
            {detail.artist && (
              <span className="flex items-center gap-1.5">
                <Palette size={13} className="text-neu-secondary" />
                <span>Artist: {detail.artist}</span>
              </span>
            )}
          </div>

          {/* Genre Chips */}
          {genres.length > 0 && (
            <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
              {genres.map((g) => (
                <span
                  key={g}
                  className="px-2.5 py-1 rounded-lg bg-neu-surface shadow-neu-btn text-xs text-neu-muted"
                >
                  {g}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          {detail.description && (
            <p className="text-xs sm:text-sm text-neu-muted leading-relaxed line-clamp-4">
              {detail.description}
            </p>
          )}

          {/* Action Read Buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3.5 pt-2">
            {firstChapter && (
              <Link
                href={`/read/${firstChapter.url}?mangaId=${mangaId}&mangaTitle=${encodeURIComponent(detail.title)}`}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-neu-accent text-white text-xs font-bold shadow-neu-btn hover:brightness-110 active:scale-95 transition-all"
              >
                <BookOpen size={15} />
                <span>Baca Chapter Pertama</span>
              </Link>
            )}
            {latestChapter && (
              <Link
                href={`/read/${latestChapter.url}?mangaId=${mangaId}&mangaTitle=${encodeURIComponent(detail.title)}`}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-neu-surface text-neu-text text-xs font-bold shadow-neu-btn hover:text-white active:scale-95 transition-all"
              >
                <span>Chapter Terbaru</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Chapters Component */}
      <ChapterList chapters={chapters} mangaId={mangaId} mangaTitle={detail.title} />
    </div>
  );
}
