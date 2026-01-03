export interface Anime {
  id: string;
  title: string;
  description: string;
  poster: string;
  seasons: Season[];
  genres: string[];
  status: 'ongoing' | 'completed';
  year: number;
}

export interface Season {
  id: string;
  number: number;
  episodes: Episode[];
}

export interface Episode {
  id: string;
  number: number;
  title: string;
  duration: number; // in minutes
  videoUrl: string;
}

export interface WatchedEpisode {
  animeId: string;
  seasonId: string;
  episodeId: string;
  watchedAt: Date;
  progress: number; // 0-100
}
