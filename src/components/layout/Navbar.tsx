'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { BookOpen, Flame, Clock, Bookmark, History, Search, Sun, Moon, X } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [keyword, setKeyword] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    setSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(keyword.trim())}`);
  };

  const navLinks = [
    { label: 'Beranda', href: '/', icon: BookOpen },
    { label: 'Populer', href: '/popular', icon: Flame },
    { label: 'Terbaru', href: '/latest', icon: Clock },
    { label: 'Favorit', href: '/favorites', icon: Bookmark },
    { label: 'Riwayat', href: '/history', icon: History },
  ];

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-neu-bg/90 backdrop-blur-md border-b border-[#1c202c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-neu-surface shadow-neu-btn flex items-center justify-center text-neu-accent font-black text-lg sm:text-xl">
              📖
            </div>
            <span className="font-extrabold text-lg sm:text-xl tracking-wider bg-gradient-to-r from-neu-accent to-purple-400 bg-clip-text text-transparent">
              iComic
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? 'bg-neu-surface text-neu-accent shadow-neu-inset'
                      : 'text-neu-muted hover:text-white hover:bg-[#202533]'
                  }`}
                >
                  <Icon size={15} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Search Bar & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Search */}
            <form onSubmit={handleSearch} className="relative hidden sm:block w-48 lg:w-64">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Cari manga, manhwa..."
                className="w-full h-9 sm:h-10 pl-9 pr-3 rounded-xl bg-neu-surface shadow-neu-inset text-xs text-neu-text placeholder-neu-muted/60 focus:outline-none focus:ring-1 focus:ring-neu-accent"
              />
              <Search size={14} className="absolute left-3 top-2.5 sm:top-3 text-neu-muted pointer-events-none" />
            </form>

            {/* Mobile Search Button Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="sm:hidden w-8 h-8 rounded-xl bg-neu-surface shadow-neu-btn flex items-center justify-center text-neu-muted hover:text-white transition-all"
              aria-label="Cari"
            >
              {searchOpen ? <X size={16} /> : <Search size={16} />}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-neu-surface shadow-neu-btn flex items-center justify-center text-neu-muted hover:text-white transition-all"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
        </div>

        {/* Mobile Fullscreen Search Bar Drawer */}
        {searchOpen && (
          <div className="sm:hidden px-4 py-2.5 bg-neu-surface border-t border-[#1c202c]">
            <form onSubmit={handleSearch} className="relative flex items-center">
              <input
                type="text"
                autoFocus
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Ketik judul komik..."
                className="w-full h-10 pl-9 pr-12 rounded-xl bg-neu-surface shadow-neu-inset text-xs text-neu-text placeholder-neu-muted/60 focus:outline-none"
              />
              <Search size={15} className="absolute left-3 text-neu-muted" />
              <button
                type="submit"
                className="absolute right-2 px-2.5 py-1 rounded-lg bg-neu-accent text-white text-[11px] font-bold"
              >
                Cari
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-neu-surface/95 backdrop-blur-md border-t border-[#1c202c] shadow-[0_-4px_16px_rgba(0,0,0,0.3)] pb-safe">
        <div className="flex items-center justify-around h-14 px-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
                  active ? 'text-neu-accent font-bold scale-105' : 'text-neu-muted hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
