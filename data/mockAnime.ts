import { Anime } from '../types/anime';

export const mockAnime: Anime[] = [
  {
    id: '1',
    title: 'Атака Титанов',
    description: 'В мире, где человечество борется за выживание против гигантских существ, известных как Титаны, история следует за Эреном Йегером и его друзьями в их борьбе за свободу.',
    poster: '/api/placeholder/400/600',
    genres: ['Экшен', 'Фэнтези', 'Драма'],
    status: 'completed',
    year: 2013,
    seasons: [
      {
        id: 's1',
        number: 1,
        episodes: Array.from({ length: 25 }, (_, i) => ({
          id: `ep${i + 1}`,
          number: i + 1,
          title: `Эпизод ${i + 1}`,
          duration: 24,
          videoUrl: `/anime/attack-on-titan/s1/${i + 1}.mp4`
        }))
      }
    ]
  },
  {
    id: '2',
    title: 'Демон Слейер',
    description: 'История о мальчике Танджиро Камадо, который становится охотником на демонов после того, как его семья была убита демоном, а сестра превращена в демона.',
    poster: '/api/placeholder/400/600',
    genres: ['Экшен', 'Сёнен', 'Сверхъестественное'],
    status: 'ongoing',
    year: 2019,
    seasons: [
      {
        id: 's1',
        number: 1,
        episodes: Array.from({ length: 26 }, (_, i) => ({
          id: `ep${i + 1}`,
          number: i + 1,
          title: `Эпизод ${i + 1}`,
          duration: 24,
          videoUrl: `/anime/demon-slayer/s1/${i + 1}.mp4`
        }))
      }
    ]
  },
  {
    id: '3',
    title: 'Твоё имя',
    description: 'История о двух подростках, которые таинственным образом меняются телами и пытаются найти способ вернуться в свои тела.',
    poster: '/api/placeholder/400/600',
    genres: ['Романтика', 'Драма', 'Фэнтези'],
    status: 'completed',
    year: 2016,
    seasons: [
      {
        id: 's1',
        number: 1,
        episodes: [
          {
            id: 'ep1',
            number: 1,
            title: 'Твоё имя',
            duration: 106, // фильм
            videoUrl: '/anime/your-name/movie.mp4'
          }
        ]
      }
    ]
  },
  {
    id: '4',
    title: 'Мой герой академия',
    description: 'В мире, где большинство людей имеют суперспособности, история следует за подростком без способностей, который мечтает стать героем.',
    poster: '/api/placeholder/400/600',
    genres: ['Экшен', 'Сёнен', 'Супергерои'],
    status: 'ongoing',
    year: 2016,
    seasons: [
      {
        id: 's1',
        number: 1,
        episodes: Array.from({ length: 13 }, (_, i) => ({
          id: `ep${i + 1}`,
          number: i + 1,
          title: `Эпизод ${i + 1}`,
          duration: 24,
          videoUrl: `/anime/my-hero-academia/s1/${i + 1}.mp4`
        }))
      }
    ]
  },
  {
    id: '5',
    title: 'Стальной алхимик',
    description: 'Братья Эдвард и Альфонс Элрики пытаются воскресить мать с помощью алхимии, но платят страшную цену за нарушение законов эквивалентного обмена.',
    poster: '/api/placeholder/400/600',
    genres: ['Экшен', 'Фэнтези', 'Драма'],
    status: 'completed',
    year: 2003,
    seasons: [
      {
        id: 's1',
        number: 1,
        episodes: Array.from({ length: 51 }, (_, i) => ({
          id: `ep${i + 1}`,
          number: i + 1,
          title: `Эпизод ${i + 1}`,
          duration: 24,
          videoUrl: `/anime/fullmetal-alchemist/s1/${i + 1}.mp4`
        }))
      }
    ]
  },
  {
    id: '6',
    title: 'Один кусок',
    description: 'История о пирате по имени Монки Д. Луффи, который ищет сокровище всех сокровищ - One Piece - и становится Королём Пиратов.',
    poster: '/api/placeholder/400/600',
    genres: ['Приключения', 'Экшен', 'Комедия'],
    status: 'ongoing',
    year: 1999,
    seasons: [
      {
        id: 's1',
        number: 1,
        episodes: Array.from({ length: 61 }, (_, i) => ({
          id: `ep${i + 1}`,
          number: i + 1,
          title: `Эпизод ${i + 1}`,
          duration: 24,
          videoUrl: `/anime/one-piece/s1/${i + 1}.mp4`
        }))
      }
    ]
  },
  {
    id: '7',
    title: 'Тетрадь смерти',
    description: 'Умный старшеклассник Лайт Ягами находит тетрадь, способную убивать людей. Решив очистить мир от преступников, он становится богом смерти, но привлекает внимание следователя Л.',
    poster: '/api/placeholder/400/600',
    genres: ['Триллер', 'Психологический', 'Драма'],
    status: 'completed',
    year: 2006,
    seasons: [
      {
        id: 's1',
        number: 1,
        episodes: [
          {
            id: 'ep1',
            number: 1,
            title: 'Перерождение',
            duration: 24,
            videoUrl: '/1deathnote1.mp4'
          },
          {
            id: 'ep2',
            number: 2,
            title: 'Соперничество',
            duration: 24,
            videoUrl: '/1deathnote2.mp4'
          }
        ]
      },
      {
        id: 's2',
        number: 2,
        episodes: [
          {
            id: 'ep1',
            number: 1,
            title: 'Новое начало',
            duration: 24,
            videoUrl: '/2deathnote2.mp4'
          }
        ]
      }
    ]
  }
];
