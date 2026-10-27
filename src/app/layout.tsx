import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'iComic — Baca Manga, Manhwa, dan Manhua Modern',
  description: 'Jelajahi komik favorit dan baca chapter dengan pengalaman membaca yang nyaman dan desain Neumorphism.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-neu-bg text-neu-text selection:bg-neu-accent selection:text-white flex flex-col justify-between">
        <ThemeProvider>
          <div>
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
              {children}
            </main>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
