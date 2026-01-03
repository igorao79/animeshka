'use client';

import { Card, CardContent, CardMedia, Typography, Chip, Box, Link } from '@mui/material';
import ThemeWrapper from './ThemeWrapper';
import { Anime } from '../types/anime';

interface AnimeCardProps {
  anime: Anime;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <ThemeWrapper>
      <Link href={`/anime/${anime.id}`} sx={{ textDecoration: 'none' }}>
      <Card
        sx={{
          width: '100%',
          height: '480px', // Фиксированная высота для всех карточек
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          backgroundColor: '#464866',
          color: '#AAABB8',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="280"
            image={anime.poster}
            alt={anime.title}
            sx={{
              objectFit: 'cover',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)',
            }}
          />
          <Box sx={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                color: 'white',
                fontWeight: 600,
                mb: 1,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {anime.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {anime.year}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                •
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {anime.seasons.length} сезон{anime.seasons.length !== 1 ? 'ов' : ''}
              </Typography>
            </Box>
          </Box>
        </Box>
        <CardContent sx={{ p: 2, flexGrow: 1 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {anime.description}
          </Typography>
        </CardContent>
        <Box sx={{ p: 2, pt: 0 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {anime.genres.slice(0, 3).map((genre) => (
              <Chip
                key={genre}
                label={genre}
                size="small"
                variant="outlined"
                sx={{
                  color: 'primary.light',
                  borderColor: 'primary.light',
                  fontSize: '0.75rem',
                }}
              />
            ))}
          </Box>
        </Box>
      </Card>
    </Link>
    </ThemeWrapper>
  );
}
