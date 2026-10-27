import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'iComic — Baca Manga, Manhwa, dan Manhua Modern',
  description: 'Jelajahi komik favorit dan baca chapter dengan pengalaman membaca yang nyaman dan desain Neumorphism.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
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
          <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-8 pb-20 md:pb-8 w-full flex-1">
              {children}
            </main>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
