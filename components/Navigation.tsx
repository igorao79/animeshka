'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <nav style={{
        position: 'relative',
        width: '100%',
        padding: '1rem',
        marginBottom: '1rem',
        zIndex: 1000
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#2A2D4A',
          borderRadius: '50px',
          padding: '0.5rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {/* Логотип */}
          <Link href="/" style={{
            color: '#E0E0E0',
            textDecoration: 'none',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            padding: '0.5rem 1rem',
            borderRadius: '25px',
            transition: 'all 0.3s ease',
            marginLeft: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Image
              src="/logoanimeshka.webp"
              alt="Animeshka Logo"
              width={32}
              height={32}
              style={{
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />
            Animeshka
          </Link>

          {/* Навигационные pill кнопки - заглушки */}
          <div style={{
            display: 'flex',
            gap: '0.25rem',
            alignItems: 'center'
          }}>
            {['Главная', 'Просмотренные', 'О нас'].map((label) => (
              <div
                key={label}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '25px',
                  fontWeight: '500',
                  fontSize: '0.9rem',
                  color: '#E0E0E0',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  minWidth: '100px',
                  textAlign: 'center'
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </nav>
    );
  }

  const navItems = [
    { label: 'Главная', href: '/' },
    { label: 'Просмотренные', href: '/watched' },
    { label: 'О нас', href: '/about' }
  ];

  return (
    <nav style={{
      position: 'relative',
      width: '100%',
      padding: '1rem',
      marginBottom: '1rem',
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#2A2D4A',
        borderRadius: '50px',
        padding: '0.5rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        {/* Логотип */}
        <Link href="/" style={{
          color: '#E0E0E0',
          textDecoration: 'none',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          padding: '0.5rem 1rem',
          borderRadius: '25px',
          transition: 'all 0.3s ease',
          marginLeft: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Image
            src="/logoanimeshka.webp"
            alt="Animeshka Logo"
            width={48}
            height={48}
            style={{
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />
          Animeshka
        </Link>

        {/* Навигационные pill кнопки */}
        <div style={{
          display: 'flex',
          gap: '0.25rem',
          alignItems: 'center'
        }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    position: 'relative',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '25px',
                    textDecoration: 'none',
                    fontWeight: '500',
                    fontSize: '0.9rem',
                    color: isActive ? '#2A2D4A' : '#E0E0E0',
                    backgroundColor: isActive ? '#4A9FD1' : 'transparent',
                    border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    display: 'inline-block',
                    textAlign: 'center',
                    minWidth: '100px',
                    transform: isActive ? 'scale(1.02)' : 'scale(1)',
                    boxShadow: isActive ? '0 4px 12px rgba(74, 159, 209, 0.3)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
              >
                {item.label}
                  {/* Активный индикатор */}
                  {isActive && (
                    <div style={{
                      position: 'absolute',
                      bottom: '-2px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '30px',
                      height: '3px',
                      backgroundColor: '#2A2D4A',
                      borderRadius: '2px',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      opacity: 1,
                      animation: 'slideInFromBottom 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                    }} />
                  )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
