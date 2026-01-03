'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { Container, Typography, Box } from '@mui/material';
import { mockAnime } from '../../../data/mockAnime';
import AnimePlayer from '../../../components/AnimePlayer';
import { Anime } from '../../../types/anime';

interface AnimePageProps {
  params: Promise<{ id: string }>;
}

export default function AnimePage({ params }: AnimePageProps) {
  // Для клиентского компонента нужно обработать params по-другому
  const [anime, setAnime] = React.useState<Anime | null>(null);

  React.useEffect(() => {
    params.then((resolvedParams) => {
      const foundAnime = mockAnime.find(a => a.id === resolvedParams.id);
      if (!foundAnime) {
        notFound();
      }
      setAnime(foundAnime);
    });
  }, [params]);

  if (!anime) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h6">Загрузка...</Typography>
      </Container>
    );
  }

  // Подсчет общего количества серий
  const totalEpisodes = anime.seasons.reduce((total, season) => total + season.episodes.length, 0);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'white' }}>
          {anime.title}
        </Typography>
      </Box>

      <AnimePlayer anime={anime} />
    </Container>
  );
}
