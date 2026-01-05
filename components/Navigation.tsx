'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, Close } from '@mui/icons-material';
import ServerStatusModal from './ServerStatusModal';

export default function Navigation() {
  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
          backgroundColor: 'var(--primary-900)',
          borderRadius: '50px',
          padding: '0.5rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {/* Логотип */}
          <Link href="/" style={{
            color: 'var(--white)',
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
                  color: 'var(--primary-300)',
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
          backgroundColor: 'var(--primary-900)',
        borderRadius: '50px',
        padding: '0.5rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        {/* Логотип */}
        <Link href="/" className="logo-link" style={{
          color: 'var(--white)',
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
          <div className="mobile-header-content">
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
            <span
              onClick={() => setModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginLeft: '6px',
                padding: '8px 12px',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderRadius: '20px',
                border: '1px solid rgb(170, 171, 184)',
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'var(--white)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                animation: 'pulse 2s infinite'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ОНЛАЙН
            </span>
          </div>
        </Link>

        {/* Мобильное меню */}
        <div style={{
          display: 'flex',
          gap: '0.25rem',
          alignItems: 'center'
        }}>
          {/* Десктопные кнопки */}
          <div style={{
            display: 'flex',
            gap: '0.25rem',
            alignItems: 'center'
          }} className="desktop-nav">
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
                      color: isActive ? 'var(--white)' : 'var(--white)',
                      backgroundColor: isActive ? 'var(--primary-500)' : 'transparent',
                      border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      display: 'inline-block',
                      textAlign: 'center',
                      minWidth: '100px',
                      transform: isActive ? 'scale(1.02)' : 'scale(1)',
                      boxShadow: isActive ? '0 4px 12px rgba(46, 156, 202, 0.3)' : 'none',
                      textShadow: isActive ? '0 0 12px rgba(255, 255, 255, 0.8)' : 'none'
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
                </Link>
              );
            })}
          </div>

          {/* Мобильная бургер-кнопка */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="mobile-menu-btn"
            aria-label="Открыть меню"
          >
            <Menu sx={{ fontSize: 24 }} />
          </button>
        </div>
      </div>

      <ServerStatusModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      {/* Мобильное меню */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="mobile-menu-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Кнопка закрытия */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: 'transparent',
                border: 'none',
                color: 'var(--white)',
                cursor: 'pointer',
                padding: '4px'
              }}
              aria-label="Закрыть меню"
            >
              <Close sx={{ fontSize: 28 }} />
            </button>

            {/* Заголовок меню */}
            <h3 style={{
              color: 'var(--white)',
              marginTop: 0,
              marginBottom: '32px',
              textAlign: 'center',
              fontSize: '28px',
              fontWeight: 'bold'
            }}>
              Меню
            </h3>

            {/* Навигационные ссылки */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'block',
                      padding: '20px 24px',
                      borderRadius: '16px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '20px',
                      color: isActive ? 'var(--primary-500)' : 'var(--white)',
                      backgroundColor: isActive ? 'rgba(46, 156, 202, 0.1)' : 'transparent',
                      border: isActive ? '2px solid var(--primary-500)' : '2px solid transparent',
                      transition: 'all 0.2s ease',
                      textAlign: 'center',
                      marginBottom: '12px'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }

            @keyframes slideIn {
              from {
                opacity: 0;
                transform: scale(0.9) translateY(-20px);
              }
              to {
                opacity: 1;
                transform: scale(1) translateY(0);
              }
            }
          `}</style>
    </nav>
  );
}
