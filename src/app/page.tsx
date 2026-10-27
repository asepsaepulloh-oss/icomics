import Link from 'next/link';
import { Flame, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { getPopularManga, getLatestManga } from '@/lib/api';
import { MangaCard } from '@/components/manga/MangaCard';
import { MangaItem } from '@/types/manga';

export const revalidate = 300; // revalidate 5 minutes

export default async function HomePage() {
  let popularList: MangaItem[] = [];
  let latestList: MangaItem[] = [];

  try {
    const [popRes, latRes] = await Promise.allSettled([
      getPopularManga(1),
      getLatestManga(1),
    ]);
    if (popRes.status === 'fulfilled' && popRes.value.mangas) {
      popularList = popRes.value.mangas;
    }
    if (latRes.status === 'fulfilled' && latRes.value.mangas) {
      latestList = latRes.value.mangas;
    }
  } catch (err) {
    console.error('Error fetching home manga:', err);
  }

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Editorial Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-neu-surface shadow-neu-flat border border-[#1e2230] p-6 sm:p-10 md:p-14 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
        <div className="max-w-xl space-y-3 sm:space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-neu-accent/20 text-neu-accent text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            Platform Baca Komik Generasi Baru
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            Temukan Cerita Favoritmu.
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-neu-muted leading-relaxed">
            Jelajahi ribuan judul manga, manhwa, dan manhua terjemahan dengan tampilan Neumorphism yang lembut di mata dan pengalaman membaca tanpa gangguan.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-3.5 pt-1 sm:pt-2">
            <Link
              href="/popular"
              className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-neu-accent text-white text-xs font-bold shadow-neu-btn hover:brightness-110 active:scale-95 transition-all"
            >
              <BookOpen size={15} />
              <span>Jelajahi Komik</span>
            </Link>
            <Link
              href="/latest"
              className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-neu-surface text-neu-text text-xs font-bold shadow-neu-btn hover:text-white active:scale-95 transition-all"
            >
              <Clock size={15} />
              <span>Rilis Terbaru</span>
            </Link>
          </div>
        </div>

        {/* Visual Badge Icon */}
        <div className="w-28 h-28 sm:w-40 sm:h-40 md:w-56 md:h-56 rounded-3xl bg-neu-surface shadow-neu-flat border border-[#232736] flex items-center justify-center text-4xl sm:text-6xl md:text-8xl select-none flex-shrink-0">
          📚
        </div>
      </section>

      {/* Komik Populer Section */}
      <section className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-neu-surface shadow-neu-btn flex items-center justify-center text-orange-400">
              <Flame size={16} />
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold tracking-wide">Komik Populer</h2>
          </div>
          <Link
            href="/popular"
            className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-neu-accent hover:text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-neu-surface shadow-neu-btn transition-all"
          >
            <span>Semua</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-4">
          {popularList.slice(0, 12).map((manga) => (
            <MangaCard key={manga.url} manga={manga} />
          ))}
        </div>
      </section>

      {/* Komik Terbaru Section */}
      <section className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-neu-surface shadow-neu-btn flex items-center justify-center text-neu-accent">
              <Clock size={16} />
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold tracking-wide">Pembaruan Terbaru</h2>
          </div>
          <Link
            href="/latest"
            className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-neu-accent hover:text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-neu-surface shadow-neu-btn transition-all"
          >
            <span>Semua</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-4">
          {latestList.slice(0, 12).map((manga) => (
            <MangaCard key={manga.url} manga={manga} />
          ))}
        </div>
      </section>
    </div>
  );
}
