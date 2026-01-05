'use client';

import { Container, Typography, Box, Alert } from '@mui/material';
import AnimeCard from '../components/AnimeCard';
import { useState, useEffect } from 'react';
import { Anime } from '../types/anime';

export default function Home() {
  const [anime, setAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/anime');
        if (!response.ok) {
          throw new Error('Failed to fetch anime');
        }
        const animeData = await response.json();
        setAnime(animeData);
      } catch (err) {
        console.error('Error loading anime:', err);
        setError('Ошибка загрузки аниме');
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h1" component="h1" gutterBottom>
            Доступные аниме
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6">Загрузка...</Typography>
        </Box>
      </Container>
    );
  }

  return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Доступные аниме
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Выберите аниме для просмотра из нашей коллекции
          </Typography>
        </Box>

        {anime.length > 0 ? (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
              gap: 3,
              alignItems: 'stretch',
            }}
          >
            {anime.map((animeItem) => (
              <Box key={animeItem.id} sx={{ height: '100%' }}>
                <AnimeCard anime={animeItem} />
              </Box>
            ))}
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Alert severity={error ? "error" : "info"} sx={{ maxWidth: 400, mx: 'auto' }}>
              {error || 'Пока нет доступных аниме для просмотра'}
            </Alert>
          </Box>
        )}
      </Container>
  );
}
