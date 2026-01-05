'use client';

import { Container, Typography, Box, Paper } from '@mui/material';

export default function AboutPage() {
  return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 6, textAlign: 'left' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            О нас
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Узнайте больше о нашем проекте
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ p: 4, mb: 4, backgroundColor: '#464866', color: '#AAABB8' }}>
          <Typography variant="body1" paragraph>
            Добро пожаловать на Animeshka - вашу персональную платформу для просмотра аниме!
          </Typography>

          <Typography variant="body1" paragraph>
            Этот проект создан не в серьезных коммерческих целях, а для уютного просмотра аниме
            с девушкой в романтической обстановке. Все данные хранятся на моем мини ПК с всего
            лишь 256 ГБ памяти, поэтому информация о просмотренных сериях будет своевременно
            удаляться по мере добавления новых аниме.
          </Typography>

          <Typography variant="body1" paragraph>
            Мы создали это приложение для создания комфортной атмосферы просмотра аниме
            с интуитивным интерфейсом и всеми необходимыми функциями плеера.
          </Typography>
        </Paper>
      </Container>
  );
}
