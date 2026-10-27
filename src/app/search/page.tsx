import { searchManga } from '@/lib/api';
import { MangaCard } from '@/components/manga/MangaCard';
import { Search } from 'lucide-react';
import { MangaItem } from '@/types/manga';
import Link from 'next/link';

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = '', page = '1' } = await searchParams;
  const currentPage = parseInt(page, 10) || 1;

  let mangas: MangaItem[] = [];
  let hasNextPage = false;

  if (q.trim()) {
    try {
      const res = await searchManga(q.trim(), currentPage);
      if (res && res.mangas) {
        mangas = res.mangas;
        hasNextPage = res.hasNextPage;
      }
    } catch (err) {
      console.error('Search error:', err);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-neu-surface shadow-neu-btn flex items-center justify-center text-neu-accent">
          <Search size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-black">
            Hasil Pencarian: <span className="text-neu-accent">"{q}"</span>
          </h1>
          <p className="text-xs text-neu-muted mt-0.5">{mangas.length} judul ditemukan pada halaman ini.</p>
        </div>
      </div>

      {mangas.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {mangas.map((manga) => (
              <MangaCard key={manga.url} manga={manga} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-3 pt-6">
            {currentPage > 1 && (
              <Link
                href={`/search?q=${encodeURIComponent(q)}&page=${currentPage - 1}`}
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
                href={`/search?q=${encodeURIComponent(q)}&page=${currentPage + 1}`}
                className="px-4 py-2 rounded-xl bg-neu-surface shadow-neu-btn text-xs font-bold text-neu-accent hover:text-white"
              >
                Next
              </Link>
            )}
          </div>
        </>
      ) : (
        <div className="py-20 text-center text-neu-muted space-y-2">
          <p className="text-base font-semibold">Tidak ada komik yang ditemukan.</p>
          <p className="text-xs">Coba cari dengan kata kunci lain atau periksa ejaan judul.</p>
        </div>
      )}
    </div>
  );
}
