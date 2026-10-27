export interface MangaItem {
  title: string;
  thumbnail: string;
  url: string; // Used as mangaId
  mangaUrl: string;
}

export interface MangaListResponse {
  mangas: MangaItem[];
  hasNextPage: boolean;
}

export interface MangaDetail {
  title: string;
  author: string;
  artist: string;
  status: 'Ongoing' | 'Completed' | 'Unknown';
  description: string;
  genre: string;
  thumbnail: string;
}

export interface MangaChapter {
  name: string;
  dateUpload: number;
  url: string; // Used as chapterId
  chapterUrl: string;
}

export interface MangaPage {
  index: number;
  imageUrl: string;
}

export interface FavoriteManga {
  url: string;
  title: string;
  thumbnail: string;
  addedAt: number;
}

export interface ReadingHistoryItem {
  mangaId: string;
  title: string;
  thumbnail: string;
  chapterId: string;
  chapterName: string;
  lastPageIndex: number;
  readerMode: 'long-strip' | 'single-page';
  timestamp: number;
}
