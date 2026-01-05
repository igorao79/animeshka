'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { Container, Typography, Box } from '@mui/material';
import AnimePlayer from '../../../components/AnimePlayer';
import { Anime } from '../../../types/anime';

interface AnimePageProps {
  params: Promise<{ id: string }>;
}

export default function AnimePage({ params }: AnimePageProps) {
  // Для клиентского компонента нужно обработать params по-другому
  const [anime, setAnime] = React.useState<Anime | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    params.then(async (resolvedParams) => {
      try {
        setLoading(true);
        // Получаем данные с сервера
        const response = await fetch('/api/anime/' + resolvedParams.id);
        if (!response.ok) {
          throw new Error('Anime not found');
        }
        const animeData = await response.json();
        setAnime(animeData);
      } catch (err) {
        console.error('Error loading anime:', err);
        setError('Ошибка загрузки аниме');
        notFound();
      } finally {
        setLoading(false);
      }
    });
  }, [params]);

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h6">Загрузка...</Typography>
      </Container>
    );
  }

  if (error || !anime) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h6" color="error">
          {error || 'Аниме не найдено'}
        </Typography>
      </Container>
    );
  }


  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white' }}>
          {anime.title}
        </Typography>
      </Box>

      <AnimePlayer anime={anime} />
    </Container>
  );
}
