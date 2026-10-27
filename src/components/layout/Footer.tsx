import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-[#1c202c] bg-neu-surface py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neu-muted">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-sm text-neu-accent">📖 iComic</span>
          <span>— Platform Baca Komik Digital Modern</span>
        </div>
        <p className="text-center sm:text-right">
          Dibangun dengan Next.js & Neumorphism Design. Hak Cipta Komik milik kreator dan penerbit masing-masing.
        </p>
      </div>
    </footer>
  );
}
