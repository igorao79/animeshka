// Service Worker для кэширования изображений Animeshka
const CACHE_NAME = 'animeshka-v1';
const IMAGES_CACHE_NAME = 'animeshka-images-v1';

// Ресурсы для предварительного кэширования
const PRECACHE_URLS = [
  '/',
  '/favicon.ico',
  '/manifest.json'
];

// Установка Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

// Активация Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== IMAGES_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Стратегия кэширования: ТОЛЬКО изображения
self.addEventListener('fetch', (event) => {
  // Кэшируем ТОЛЬКО изображения аниме
  if (isImageRequest(event.request)) {
    event.respondWith(handleImageRequest(event.request));
    return;
  }

  // ВСЕ остальные запросы (JS, CSS, HTML) - НЕ кэшируем, пропускаем
  // Никакого вмешательства Service Worker в обычные запросы
  return;
});

// Проверка, является ли запрос изображением АНИМЕ
function isImageRequest(request) {
  const url = new URL(request.url);
  return (
    // НЕ кэшируем API запросы
    !url.pathname.startsWith('/api/') &&
    (
      // Изображения с сервера аниме
      url.hostname === '192.168.50.94' ||
      // Локальные изображения аниме
      url.pathname.includes('/pics/') ||
      // Логотип аниме
      url.pathname.includes('logoanimeshka')
    )
  );
}

// Обработка запросов изображений
async function handleImageRequest(request) {
  try {
    // Сначала проверяем кэш
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Загружаем изображение
    const response = await fetch(request);

    // Проверяем успешность загрузки
    if (!response.ok) {
      console.warn('❌ Failed to fetch image:', request.url, response.status);
      return response;
    }

    // Кэшируем изображение (без ограничения по времени)
    const cache = await caches.open(IMAGES_CACHE_NAME);
    cache.put(request, response.clone());

    return response;

  } catch {
    // СЕТЬ НЕДОСТУПНА - пытаемся вернуть из кэша
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Изображение не в кэше - возвращаем ошибку
    console.warn('❌ Image not in cache and network unavailable:', request.url);
    return new Response('Image not available (offline)', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Обработка сообщений от клиента
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'GET_CACHE_INFO') {
    // Отправляем информацию о кэше
    caches.keys().then((cacheNames) => {
      const cachePromises = cacheNames.map(async (cacheName) => {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        return {
          name: cacheName,
          count: keys.length,
          urls: keys.slice(0, 10).map(req => req.url) // Первые 10 URL
        };
      });

      Promise.all(cachePromises).then((cacheInfo) => {
        event.ports[0].postMessage({
          type: 'CACHE_INFO',
          data: cacheInfo
        });
      });
    });
  }
});

// Очистка старого кэша при обновлении
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      event.ports[0].postMessage({ type: 'CACHE_CLEARED' });
    });
  }
});
