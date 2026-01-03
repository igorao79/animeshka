'use client';

import { Container, Typography, Grid, Box, Alert } from '@mui/material';
import AnimeCard from '../components/AnimeCard';
import { mockAnime } from '../data/mockAnime';

export default function Home() {
  return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h1" component="h1" gutterBottom>
            Доступные аниме
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Выберите аниме для просмотра из нашей коллекции
          </Typography>
        </Box>

        {mockAnime.length > 0 ? (
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
            {mockAnime.map((anime) => (
              <Box key={anime.id} sx={{ height: '100%' }}>
                <AnimeCard anime={anime} />
              </Box>
            ))}
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Alert severity="info" sx={{ maxWidth: 400, mx: 'auto' }}>
              Пока нет доступных аниме для просмотра
            </Alert>
          </Box>
        )}
      </Container>
  );
}
