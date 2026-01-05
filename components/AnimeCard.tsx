'use client';

import { Card, CardMedia, Typography, Chip, Box, Link } from '@mui/material';
import ThemeWrapper from './ThemeWrapper';
import { Anime } from '../types/anime';

interface AnimeCardProps {
  anime: Anime;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <ThemeWrapper>
      <Link href={`/anime/${anime.id}`} sx={{ textDecoration: 'none' }}>
      <div suppressHydrationWarning>
        <Card
          sx={{
            width: '100%',
            height: '320px', // Уменьшаем высоту, так как убрали описание
            position: 'relative',
            cursor: 'pointer',
            backgroundColor: 'background.paper',
            color: 'text.primary',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            overflow: 'hidden',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
        <CardMedia
          component="img"
          height="320"
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
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 40%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          <Typography
            variant="h6"
            component="h3"
            sx={{
              color: 'var(--white)',
              fontWeight: 600,
              mb: 1,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textShadow: '0 2px 4px rgba(0,0,0,0.8)',
            }}
          >
            {anime.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="body2" sx={{ color: 'white', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
              {anime.year}
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
              •
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
              {anime.seasons.length} {(() => {
                const count = anime.seasons.length;
                if (count === 1) return 'сезон';
                if (count >= 2 && count <= 4) return 'сезона';
                return 'сезонов';
              })()}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {anime.genres.slice(0, 3).map((genre) => (
              <Chip
                key={genre}
                label={genre}
                size="small"
                sx={{
                  color: 'primary.main',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  fontSize: '0.7rem',
                  height: '20px',
                  textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                  '& .MuiChip-label': {
                    padding: '0 6px',
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      </Card>
      </div>
    </Link>
    </ThemeWrapper>
  );
}
