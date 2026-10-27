'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { BookOpen, Flame, Clock, Bookmark, History, Search, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [keyword, setKeyword] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;
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
    <header className="sticky top-0 z-40 bg-neu-bg/85 backdrop-blur-md border-b border-[#1c202c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-neu-surface shadow-neu-btn flex items-center justify-center text-neu-accent font-black text-xl">
            📖
          </div>
          <span className="font-extrabold text-xl tracking-wider bg-gradient-to-r from-neu-accent to-purple-400 bg-clip-text text-transparent">
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
        <div className="flex items-center gap-3">
          <form onSubmit={handleSearch} className="relative hidden sm:block w-48 lg:w-64">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Cari manga, manhwa..."
              className="w-full h-10 pl-9 pr-3 rounded-xl bg-neu-surface shadow-neu-inset text-xs text-neu-text placeholder-neu-muted/60 focus:outline-none focus:ring-1 focus:ring-neu-accent"
            />
            <Search size={15} className="absolute left-3 top-2.5 text-neu-muted pointer-events-none" />
          </form>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-xl bg-neu-surface shadow-neu-btn flex items-center justify-center text-neu-muted hover:text-white transition-all"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-xl bg-neu-surface shadow-neu-btn flex items-center justify-center text-neu-muted hover:text-white transition-all"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#1c202c] bg-neu-surface p-4 space-y-3">
          <form onSubmit={handleSearch} className="relative w-full mb-3">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Cari manga, manhwa..."
              className="w-full h-10 pl-9 pr-3 rounded-xl bg-neu-surface shadow-neu-inset text-xs text-neu-text placeholder-neu-muted/60 focus:outline-none"
            />
            <Search size={15} className="absolute left-3 top-2.5 text-neu-muted" />
          </form>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold ${
                    active
                      ? 'bg-neu-surface text-neu-accent shadow-neu-inset'
                      : 'text-neu-muted hover:text-white'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
