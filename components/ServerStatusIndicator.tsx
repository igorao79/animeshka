'use client';

import { useState, useEffect } from 'react';

export default function ServerStatusIndicator() {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const checkServer = async () => {
      if (isChecking) return;
      setIsChecking(true);

      try {
        const response = await fetch('http://192.168.50.94:3001/api/ping', {
          method: 'GET',
          signal: AbortSignal.timeout(5000)
        });

        if (response.ok) {
          setIsOnline(true);
        } else {
          setIsOnline(false);
        }
      } catch (error) {
        setIsOnline(false);
      } finally {
        setIsChecking(false);
      }
    };

    // Первая проверка
    checkServer();

    // Проверка каждые 30 секунд
    const interval = setInterval(checkServer, 30000);

    return () => clearInterval(interval);
  }, [isMounted, isChecking]);

  // НЕ рендерим на сервере - только на клиенте после монтирования
  if (!isMounted) {
    return null;
  }


  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        marginLeft: '20px',
        padding: '8px 12px',
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: '20px',
        border: '1px solid #AAABB8',
        fontSize: '14px',
        fontWeight: 'bold'
      }}
    >
      <div
        style={{
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          backgroundColor:
            isOnline === null ? 'var(--primary-500)' :
            isOnline ? 'var(--primary-500)' : 'var(--primary-600)',
          boxShadow: `0 0 10px ${
            isOnline === null ? 'rgba(46, 156, 202, 0.8)' :
            isOnline ? 'rgba(46, 156, 202, 0.8)' : 'rgba(41, 104, 138, 0.8)'
          }`,
          animation: isOnline === null && isChecking ? 'pulse 1s infinite' : 'none'
        }}
      />
      <span style={{
        color:
          isOnline === null ? 'var(--primary-500)' :
          isOnline ? 'var(--primary-500)' : 'var(--primary-600)'
      }}>
        {isOnline === null ? 'ПРОВЕРКА...' :
         isOnline ? 'ОНЛАЙН' : 'ОФФЛАЙН'}
      </span>
    </div>
  );
}