import { getPopularManga } from '@/lib/api';
import { MangaCard } from '@/components/manga/MangaCard';
import { Flame } from 'lucide-react';
import { MangaItem } from '@/types/manga';
import Link from 'next/link';

interface PopularPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function PopularPage({ searchParams }: PopularPageProps) {
  const { page = '1' } = await searchParams;
  const currentPage = parseInt(page, 10) || 1;

  let mangas: MangaItem[] = [];
  let hasNextPage = false;

  try {
    const res = await getPopularManga(currentPage);
    if (res && res.mangas) {
      mangas = res.mangas;
      hasNextPage = res.hasNextPage;
    }
  } catch (err) {
    console.error('Error fetching popular page:', err);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-neu-surface shadow-neu-btn flex items-center justify-center text-orange-400">
          <Flame size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-black">Komik Populer</h1>
          <p className="text-xs text-neu-muted mt-0.5">Daftar judul manga, manhwa & manhua paling banyak dibaca.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {mangas.map((manga) => (
          <MangaCard key={manga.url} manga={manga} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-3 pt-6">
        {currentPage > 1 && (
          <Link
            href={`/popular?page=${currentPage - 1}`}
            className="px-4 py-2 rounded-xl bg-neu-surface shadow-neu-btn text-xs font-bold text-neu-text hover:text-white"
          >
            Prev
          </Link>
        )}
        <span className="text-xs text-neu-muted font-bold px-2">
          Halaman {currentPage}
        </span>
        {hasNextPage && (
          <Link
            href={`/popular?page=${currentPage + 1}`}
            className="px-4 py-2 rounded-xl bg-neu-surface shadow-neu-btn text-xs font-bold text-neu-accent hover:text-white"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}
