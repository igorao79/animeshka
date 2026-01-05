'use client';

import { Container, Typography, Box, Alert } from '@mui/material';
import AnimeCard from '../../components/AnimeCard';
import { mockAnime } from '../../data/mockAnime';

// В будущем это будет приходить из localStorage или базы данных
const watchedAnimeIds = ['1', '3']; // Пример просмотренных аниме

export default function WatchedPage() {
  const watchedAnime = mockAnime.filter(anime =>
    watchedAnimeIds.includes(anime.id)
  );

  return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Просмотренные аниме
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Ваша история просмотров
          </Typography>
        </Box>

        {watchedAnime.length > 0 ? (
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
            }}
          >
            {watchedAnime.map((anime) => (
              <Box key={anime.id}>
                <AnimeCard anime={anime} />
              </Box>
            ))}
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Alert severity="info" sx={{ maxWidth: 500, mx: 'auto', mb: 2, backgroundColor: '#464866', color: '#AAABB8' }}>
              Вы еще не просмотрели ни одного аниме
            </Alert>
            <Typography variant="body1" color="text.secondary">
              Начните с главной страницы и выберите интересующее вас аниме
            </Typography>
          </Box>
        )}
      </Container>
  );
}
