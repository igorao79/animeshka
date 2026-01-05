'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Anime, Episode } from '../types/anime';
import {
  Box,
  Slider,
  IconButton,
  Typography,
  Paper,
  Stack
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  Fullscreen,
  SkipNext,
  ExpandMore,
  ExpandLess
} from '@mui/icons-material';
import ThemeWrapper from './ThemeWrapper';

interface AnimePlayerProps {
  anime: Anime;
}

export default function AnimePlayer({ anime }: AnimePlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentEpisode, setCurrentEpisode] = useState<Episode>(anime.seasons[0].episodes[0]);
  const [currentSeason, setCurrentSeason] = useState(anime.seasons[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [autoplayNext, setAutoplayNext] = useState(false);
  const [showPauseIcon, setShowPauseIcon] = useState(false);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [seasonsMenuOpen, setSeasonsMenuOpen] = useState(false);
  const [episodesMenuOpen, setEpisodesMenuOpen] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  // Загрузка настроек из localStorage
  useEffect(() => {
    const savedVolume = localStorage.getItem('animeshka-volume');
    const savedAutoplay = localStorage.getItem('animeshka-autoplay');
    const savedTime = localStorage.getItem(`animeshka-${anime.id}-${currentEpisode.id}-time`);

    if (savedVolume) {
      const vol = parseFloat(savedVolume);
      // eslint-disable-next-line
      setVolume(vol);
      if (videoRef.current) {
        videoRef.current.volume = vol;
      }
    }

    if (savedAutoplay) {
      // eslint-disable-next-line
      setAutoplayNext(savedAutoplay === 'true');
    }

    if (savedTime && videoRef.current) {
      const time = parseFloat(savedTime);
      // eslint-disable-next-line
      setCurrentTime(time);
      videoRef.current.currentTime = time;
    }
  // eslint-disable-next-line
  }, [anime.id, currentEpisode.id]);

  // Сохранение настроек в localStorage
  useEffect(() => {
    localStorage.setItem('animeshka-volume', volume.toString());
  }, [volume]);

  useEffect(() => {
    localStorage.setItem('animeshka-autoplay', autoplayNext.toString());
  }, [autoplayNext]);

  useEffect(() => {
    if (currentTime > 0) {
      localStorage.setItem(`animeshka-${anime.id}-${currentEpisode.id}-time`, currentTime.toString());
    }
  }, [currentTime, anime.id, currentEpisode.id]);

  useEffect(() => {
    // eslint-disable-next-line
    setVideoSrc(currentEpisode.videoUrl);
    // eslint-disable-next-line
    setError(null);
    // eslint-disable-next-line
    setThumbnail(null); // Очищаем старый thumbnail

    // Показываем лоадер на 3 секунды при каждом новом эпизоде
    // eslint-disable-next-line
    setIsLoading(true);
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
    loadingTimeoutRef.current = setTimeout(() => {
      // eslint-disable-next-line
      setIsLoading(false);
    }, 3000);
  // eslint-disable-next-line
  }, [currentEpisode]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setError(null);
      generateThumbnail();
      // Лоадер скроется через 3 секунды автоматически благодаря таймеру
    };
    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleDurationChange = () => setDuration(video.duration);
    const handlePlay = () => {
      setIsPlaying(true);
      setShowPauseIcon(false);
    };
    const handlePlaying = () => {
      // Убираем превью только когда видео действительно начинает играть
      setThumbnail(null);
    };
    const handlePause = () => {
      if (!showPauseIcon) { // Предотвращаем множественные вызовы
        setIsPlaying(false);
        setShowPauseIcon(true);
      }
    };
    const handleNextEpisode = () => {
      const currentEpisodeIndex = currentSeason.episodes.findIndex(ep => ep.id === currentEpisode.id);
      const nextEpisodeIndex = currentEpisodeIndex + 1;

      if (nextEpisodeIndex < currentSeason.episodes.length) {
        // Следующий эпизод в текущем сезоне
        setCurrentEpisode(currentSeason.episodes[nextEpisodeIndex]);
      } else {
        // Следующий сезон
        const currentSeasonIndex = anime.seasons.findIndex(s => s.id === currentSeason.id);
        const nextSeasonIndex = currentSeasonIndex + 1;

        if (nextSeasonIndex < anime.seasons.length) {
          const nextSeason = anime.seasons[nextSeasonIndex];
          setCurrentSeason(nextSeason);
          setCurrentEpisode(nextSeason.episodes[0]);
        }
      }
    };

    const handleEnded = () => {
      if (autoplayNext) {
        handleNextEpisode();
      }
    };
    const handleError = () => {
      setError('Ошибка загрузки видео');
      // Не скрываем лоадер при ошибке - пусть таймер сам решит
    };

    const generateThumbnail = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;

      // Ждем пока видео загрузится
      const tryGenerate = () => {
        if (video.videoWidth === 0 || video.videoHeight === 0) {
          // Если видео еще не загрузилось, попробуем еще раз через 500ms
          setTimeout(tryGenerate, 500);
          return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Сохраняем текущую позицию
        const currentPosition = video.currentTime;

        // Устанавливаем позицию видео на 10% от начала для лучшего превью
        const targetTime = Math.min(video.duration * 0.1, 5);
        video.currentTime = targetTime;

        // Ждем пока видео загрузится на эту позицию
        const handleSeeked = () => {
          canvas.width = video.videoWidth / 4; // Уменьшенное разрешение для превью
          canvas.height = video.videoHeight / 4;

          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          try {
            const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
            setThumbnail(thumbnailUrl);
          } catch (error) {
            console.warn('Cannot generate thumbnail due to CORS policy:', error);
            // Не устанавливаем thumbnail - будет использоваться poster
          }

          // Возвращаем видео на исходную позицию
          video.currentTime = currentPosition;

          video.removeEventListener('seeked', handleSeeked);
        };

        video.addEventListener('seeked', handleSeeked);
      };

      tryGenerate();
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('play', handlePlay);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, [currentEpisode]);

  // Управление видимостью контроллов
  const showControls = useCallback(() => {
    setControlsVisible(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    const timeout = setTimeout(() => {
      setControlsVisible(false);
    }, 5000);
    controlsTimeoutRef.current = timeout;
  }, []);

  const hideControls = useCallback(() => {
    setControlsVisible(false);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      setShowPauseIcon(true);
      showControls(); // Показать контроллы при паузе
    } else {
      video.play().catch(console.error);
      setShowPauseIcon(false);
    }
  }, [isPlaying, showControls]);

  const handleVolumeChange = (_event: Event, newValue: number | number[]) => {
    const newVolume = Array.isArray(newValue) ? newValue[0] : newValue;
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleProgressChange = (_event: Event, newValue: number | number[]) => {
    const newTime = Array.isArray(newValue) ? newValue[0] : newValue;
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        // Войти в полноэкранный режим - делаем fullscreen на контейнер плеера
        if (playerContainerRef.current && playerContainerRef.current.requestFullscreen) {
          await playerContainerRef.current.requestFullscreen();
          setIsFullscreen(true);
          showControls(); // Показать контроллы при входе в fullscreen
        }
      } else {
        // Выйти из полноэкранного режима
        if (document.exitFullscreen) {
          await document.exitFullscreen();
          setIsFullscreen(false);
          showControls(); // Показать контроллы при выходе из fullscreen
        }
      }
    } catch (error) {
      console.error('Ошибка при переключении полноэкранного режима:', error);
    }
  };

  // Обработчик изменения состояния полноэкранного режима
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Инициализация контроллов при монтировании
  useEffect(() => {
    // eslint-disable-next-line
    showControls();
  // eslint-disable-next-line
  }, []); // showControls стабилен благодаря useCallback с пустым массивом зависимостей

  const handleEpisodeSelect = (episode: Episode) => {
    setCurrentEpisode(episode);
    setIsLoading(true);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Очистка таймеров при размонтировании
  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <ThemeWrapper>
      <div className="w-full" style={{ marginTop: 0, paddingTop: 0 }}>
        {/* Canvas для генерации thumbnail */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />


        {/* Видеоплеер */}
          <div
            ref={playerContainerRef}
            className={`relative overflow-hidden ${isFullscreen ? '' : 'bg-black rounded-lg'}`}
            style={{
              ...isFullscreen ? {
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100dvh',
                backgroundColor: 'black',
                margin: 0,
                padding: 0
              } : {
                width: '100%',
                height: '700px',
                objectFit: 'cover'
              },
              cursor: controlsVisible ? 'default' : 'none'
            }}
            onMouseMove={showControls}
            onMouseLeave={isFullscreen ? hideControls : undefined}
          >
          {/* Кнопки выбора сезона и эпизода в левом верхнем углу */}
          {controlsVisible && !isLoading && (
            <Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 55, display: 'flex', gap: 1 }}>
              {/* Кнопка выбора сезона */}
              <IconButton
                onClick={() => {
                  setSeasonsMenuOpen(!seasonsMenuOpen);
                  setEpisodesMenuOpen(false); // Закрыть меню эпизодов
                }}
                sx={{
                  color: 'var(--white)',
                  backgroundColor: seasonsMenuOpen ? 'rgba(46, 156, 202, 0.3)' : 'rgba(0,0,0,0.5)',
                  '&:hover': { backgroundColor: seasonsMenuOpen ? 'rgba(46, 156, 202, 0.4)' : 'rgba(0,0,0,0.7)' },
                  px: 2,
                  borderRadius: 1,
                }}
                size="small"
              >
                <Typography variant="caption" sx={{ fontSize: '0.75rem', mr: 0.5 }}>
                  Сезон {currentSeason.number}
                </Typography>
                {seasonsMenuOpen ? <ExpandLess sx={{ fontSize: 16 }} /> : <ExpandMore sx={{ fontSize: 16 }} />}
              </IconButton>

              {/* Кнопка выбора эпизода */}
              <IconButton
                onClick={() => {
                  setEpisodesMenuOpen(!episodesMenuOpen);
                  setSeasonsMenuOpen(false); // Закрыть меню сезонов
                }}
                sx={{
                  color: 'var(--white)',
                  backgroundColor: episodesMenuOpen ? 'rgba(46, 156, 202, 0.3)' : 'rgba(0,0,0,0.5)',
                  '&:hover': { backgroundColor: episodesMenuOpen ? 'rgba(46, 156, 202, 0.4)' : 'rgba(0,0,0,0.7)' },
                  px: 2,
                  borderRadius: 1,
                }}
                size="small"
              >
                <Typography variant="caption" sx={{ fontSize: '0.75rem', mr: 0.5 }}>
                  Эпизод {currentEpisode.number}
                </Typography>
                {episodesMenuOpen ? <ExpandLess sx={{ fontSize: 16 }} /> : <ExpandMore sx={{ fontSize: 16 }} />}
              </IconButton>
            </Box>
          )}

          {/* Раскрывающееся меню выбора сезонов */}
          {seasonsMenuOpen && !isLoading && (
            <Paper
              sx={{
                position: 'absolute',
                top: 70,
                left: 16,
                background: 'linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.9))',
                color: 'white',
                zIndex: 50,
                maxHeight: '200px',
                overflowY: 'auto',
                borderRadius: 2,
                minWidth: 120,
              }}
            >
              <Box sx={{ p: 1 }}>
                {anime.seasons.map((season) => (
                  <IconButton
                    key={season.id}
                    onClick={() => {
                      // Найти сезон и переключиться на его первый эпизод
                      const selectedSeason = anime.seasons.find(s => s.id === season.id);
                      if (selectedSeason && selectedSeason.episodes.length > 0) {
                        setCurrentSeason(selectedSeason);
                        handleEpisodeSelect(selectedSeason.episodes[0]);
                        setSeasonsMenuOpen(false);
                      }
                    }}
                    sx={{
                      width: '100%',
                      justifyContent: 'flex-start',
                      color: season.id === currentSeason.id ? 'primary.main' : 'white',
                      backgroundColor: season.id === currentSeason.id ? 'rgba(46, 156, 202, 0.2)' : 'transparent',
                      '&:hover': {
                        backgroundColor: season.id === currentSeason.id ? 'rgba(46, 156, 202, 0.3)' : 'rgba(255,255,255,0.1)',
                      },
                      px: 2,
                      py: 1,
                      borderRadius: 1,
                    }}
                    size="small"
                  >
                    <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                      Сезон {season.number}
                    </Typography>
                  </IconButton>
                ))}
              </Box>
            </Paper>
          )}

          {/* Раскрывающееся меню выбора эпизодов */}
          {episodesMenuOpen && !isLoading && (
            <Paper
              sx={{
                position: 'absolute',
                top: 70,
                left: 120, // Сдвинуто правее кнопки сезона
                background: 'linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.9))',
                color: 'white',
                zIndex: 50,
                maxHeight: '300px',
                overflowY: 'auto',
                borderRadius: 2,
                minWidth: 200,
              }}
            >
              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'var(--primary-500)', mb: 1, fontWeight: 'bold' }}>
                  Сезон {currentSeason.number}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {currentSeason.episodes.map((episode) => (
                    <IconButton
                      key={episode.id}
                      onClick={() => {
                        handleEpisodeSelect(episode);
                        setEpisodesMenuOpen(false);
                      }}
                      sx={{
                        minWidth: 40,
                        height: 40,
                        color: episode.id === currentEpisode.id ? 'primary.main' : 'white',
                        backgroundColor: episode.id === currentEpisode.id ? 'rgba(46, 156, 202, 0.3)' : 'rgba(255,255,255,0.05)',
                        border: episode.id === currentEpisode.id ? '2px solid' : '1px solid rgba(255,255,255,0.2)',
                        borderColor: episode.id === currentEpisode.id ? 'primary.main' : 'rgba(255,255,255,0.2)',
                        '&:hover': {
                          backgroundColor: episode.id === currentEpisode.id ? 'rgba(46, 156, 202, 0.4)' : 'rgba(255,255,255,0.1)',
                        },
                        fontSize: '0.8rem',
                        fontWeight: episode.id === currentEpisode.id ? 'bold' : 'normal',
                      }}
                      size="small"
                    >
                      <Typography variant="caption" sx={{ fontSize: '0.75rem', fontWeight: 'inherit' }}>
                        {episode.number}
                      </Typography>
                    </IconButton>
                  ))}
                </Box>
              </Box>
            </Paper>
          )}
          <video
            ref={videoRef}
            src={videoSrc || undefined}
            className={`relative z-10 ${isFullscreen ? 'absolute inset-0 w-full h-full' : 'w-full h-[700px] object-cover'}`}
            onClick={togglePlay}
            preload="metadata"
            poster={anime.poster}
            crossOrigin="anonymous"
            style={isFullscreen ? {
              zIndex: 10,
              objectFit: 'cover',
              width: '100vw',
              height: '100dvh'
            } : {
              width: '100%',
              height: '700px',
              objectFit: 'cover'
            }}
          >
            Ваш браузер не поддерживает видео.
          </video>

          {/* Overlay элементы только для обычного режима */}
          {!isFullscreen && (
            <>
              {/* Иконка паузы */}
              {showPauseIcon && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <Pause sx={{ fontSize: 80, color: 'white', opacity: 0.8 }} />
                </div>
              )}

              {/* Loading overlay - поверх видео */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black pointer-events-none z-10">
                  <span className="loader"></span>
                </div>
              )}

              {/* Error overlay */}
              {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                  <div className="text-center text-white">
                    <div className="text-xl mb-2">⚠️ {error}</div>
                    <div className="text-sm opacity-75">
                      Попробуйте перезагрузить страницу или выбрать другой эпизод
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Информация о сезоне/эпизоде и контроллы - для fullscreen режима */}
          {isFullscreen && (
            <>

              {/* Лоадер в fullscreen */}
              {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black pointer-events-none z-45">
                  <span className="loader"></span>
                </div>
              )}

              {/* Иконка паузы в fullscreen */}
              {showPauseIcon && (
                <div className="fixed inset-0 flex items-center justify-center z-55 pointer-events-none">
                  <Pause sx={{ fontSize: 120, color: 'white', opacity: 0.8 }} />
                </div>
              )}

              {/* MUI Контролы в fullscreen */}
              {controlsVisible && !isLoading && (
                <Paper
                  sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 2,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                    color: 'var(--white)',
                    zIndex: 60,
                  }}
                >
                  <Stack spacing={1}>
                    {/* Прогресс бар */}
                    <Box>
                      <Slider
                        value={currentTime}
                        max={duration || 100}
                        onChange={handleProgressChange}
                        sx={{
                          color: 'primary.main',
                          '& .MuiSlider-thumb': {
                            width: 12,
                            height: 12,
                          },
                        }}
                      />
                    </Box>

                    {/* Основные контроллы в одной строке */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {/* Левая часть: время */}
                      <Typography variant="caption" sx={{ minWidth: 80 }}>
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </Typography>

                      {/* Центральная часть: основные кнопки */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton
                          onClick={togglePlay}
                          sx={{ color: 'white' }}
                          size="medium"
                        >
                          {isPlaying ? <Pause /> : <PlayArrow />}
                        </IconButton>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <IconButton size="small" sx={{ color: 'white' }}>
                            {volume === 0 ? <VolumeOff /> : <VolumeUp />}
                          </IconButton>
                          <Slider
                            value={volume}
                            min={0}
                            max={1}
                            step={0.01}
                            onChange={handleVolumeChange}
                            sx={{
                              width: 80,
                              color: 'primary.main',
                              '& .MuiSlider-thumb': {
                                width: 8,
                                height: 8,
                              },
                            }}
                          />
                        </Box>

                        <IconButton
                          onClick={() => setAutoplayNext(!autoplayNext)}
                          sx={{
                            color: autoplayNext ? 'primary.main' : 'white',
                            '&:hover': { color: 'primary.light' }
                          }}
                          size="small"
                          title={autoplayNext ? 'Выключить автопроигрывание' : 'Включить автопроигрывание'}
                        >
                          <SkipNext />
                        </IconButton>
                      </Box>

                      {/* Правая часть: fullscreen */}
                      <IconButton
                        onClick={toggleFullscreen}
                        sx={{ color: 'white' }}
                        size="small"
                      >
                        <Fullscreen />
                      </IconButton>
                    </Box>
                  </Stack>
                </Paper>
              )}
            </>
          )}

          {/* MUI Контролы - только для обычного режима */}
          {controlsVisible && !isFullscreen && !isLoading && (
            <Paper
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                p: 2,
                background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                color: 'white',
                zIndex: 30,
              }}
            >
              <Stack spacing={1}>
                {/* Прогресс бар */}
                <Box>
                  <Slider
                    value={currentTime}
                    max={duration || 100}
                    onChange={handleProgressChange}
                    sx={{
                      color: 'primary.main',
                      '& .MuiSlider-thumb': {
                        width: 12,
                        height: 12,
                      },
                    }}
                  />
                </Box>

                {/* Основные контроллы в одной строке */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  {/* Левая часть: время */}
                  <Typography variant="caption" sx={{ minWidth: 80 }}>
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </Typography>

                  {/* Центральная часть: основные кнопки */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton
                      onClick={togglePlay}
                      sx={{ color: 'white' }}
                      size="medium"
                    >
                      {isPlaying ? <Pause /> : <PlayArrow />}
                    </IconButton>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton size="small" sx={{ color: 'white' }}>
                        {volume === 0 ? <VolumeOff /> : <VolumeUp />}
                      </IconButton>
                      <Slider
                        value={volume}
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={handleVolumeChange}
                        sx={{
                          width: 80,
                          color: 'primary.main',
                          '& .MuiSlider-thumb': {
                            width: 8,
                            height: 8,
                          },
                        }}
                      />
                    </Box>

                    <IconButton
                      onClick={() => setAutoplayNext(!autoplayNext)}
                      sx={{
                        color: autoplayNext ? 'primary.main' : 'white',
                        '&:hover': { color: 'primary.light' }
                      }}
                      size="small"
                      title={autoplayNext ? 'Выключить автопроигрывание' : 'Включить автопроигрывание'}
                    >
                      <SkipNext />
                    </IconButton>
                  </Box>

                  {/* Правая часть: fullscreen */}
                  <IconButton
                    onClick={toggleFullscreen}
                    sx={{ color: 'white' }}
                    size="small"
                  >
                    <Fullscreen />
                  </IconButton>
                </Box>
              </Stack>
            </Paper>
          )}
        </div>
      </div>
    </ThemeWrapper>
  );
}
