'use client';

import { useEffect, useState } from 'react';

interface CacheInfo {
  name: string;
  count: number;
  urls: string[];
}

export default function ServiceWorkerRegistration() {
  // Состояния для потенциального будущего использования (сейчас не отображаются)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cacheInfo, setCacheInfo] = useState<CacheInfo[] | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOnline, setIsOnline] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Функция для получения информации о кэше
  const getCacheInfo = () => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      const messageChannel = new MessageChannel();

      messageChannel.port1.onmessage = (event) => {
        if (event.data.type === 'CACHE_INFO') {
          setCacheInfo(event.data.data);
        }
      };

      navigator.serviceWorker.controller.postMessage(
        { type: 'GET_CACHE_INFO' },
        [messageChannel.port2]
      );
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Отслеживаем статус сети
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // eslint-disable-next-line
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isClient]);

  useEffect(() => {
    if (!isClient || !('serviceWorker' in navigator)) return;

    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js')
        .then(function(registration) {
          console.log('🟢 Service Worker registered:', registration.scope);

          // Проверяем на обновления
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('🔄 New Service Worker available');
                }
              });
            }
          });

          // Запрашиваем информацию о кэше
          getCacheInfo();
        })
        .catch(function(error) {
          console.error('🔴 Service Worker registration failed:', error);
        });
    });

    // Обновляем информацию о кэше каждые 30 секунд
    const interval = setInterval(getCacheInfo, 30000);

    return () => clearInterval(interval);
  }, [isClient]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const clearCache = () => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      const messageChannel = new MessageChannel();

      messageChannel.port1.onmessage = (event) => {
        if (event.data.type === 'CACHE_CLEARED') {
          setCacheInfo(null);
          console.log('🗑️ Cache cleared');
        }
      };

      navigator.serviceWorker.controller.postMessage(
        { type: 'CLEAR_CACHE' },
        [messageChannel.port2]
      );
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const preloadImages = async () => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      console.log('🔄 Preloading images...');

      // Собираем все изображения на странице
      const images = document.querySelectorAll('img');
      const imageUrls = Array.from(images).map(img => img.src).filter(url => url);

      // Отправляем запросы на кэширование
      for (const url of imageUrls) {
        try {
          const response = await fetch(url);
          if (response.ok) {
            console.log('💾 Preloaded and cached:', url);
          }
        } catch (error) {
          console.warn('❌ Failed to preload:', url, error);
        }
      }

      console.log('✅ Image preloading completed');
      // Обновляем информацию о кэше
      getCacheInfo();
    }
  };

  // Компонент не рендерит ничего визуального, только регистрирует Service Worker
  return null;
}