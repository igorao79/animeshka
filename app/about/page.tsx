'use client';

import { Container, Typography, Box, Paper, List, ListItem, ListItemText } from '@mui/material';

export default function AboutPage() {
  return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h1" component="h1" gutterBottom>
            О нас
          </Typography>
          <Typography variant="h6" color="text.secondary">
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

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, mt: 2 }}>
            <Paper elevation={2} sx={{ p: 3, backgroundColor: '#25274D', color: '#AAABB8' }}>
              <Typography variant="h5" component="h3" gutterBottom>
                Особенности
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="• Полноэкранный режим просмотра" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• Регулировка громкости" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• Автовоспроизведение следующей серии" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• Адаптивный дизайн для всех устройств" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• История просмотров" />
                </ListItem>
              </List>
            </Paper>

            <Paper elevation={2} sx={{ p: 3, backgroundColor: '#25274D', color: '#AAABB8' }}>
              <Typography variant="h5" component="h3" gutterBottom>
                Технологии и хранение
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="• Next.js 15" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• TypeScript" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• Material-UI" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• Tailwind CSS" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• Хранение на мини ПК (256 ГБ)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• Автоматическая очистка данных" />
                </ListItem>
              </List>
            </Paper>
          </Box>
        </Paper>
      </Container>
  );
}
