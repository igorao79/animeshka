'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ServerStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ServerStatusModal({ isOpen, onClose }: ServerStatusModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        animation: 'fadeIn 0.3s ease-out'
      }}
      onClick={onClose}
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: 'var(--primary-800)',
          borderRadius: '16px',
          padding: '32px',
          maxWidth: '500px',
          width: '90%',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6)',
          border: '1px solid var(--primary-700)',
          animation: 'slideIn 0.3s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{
          color: 'var(--primary-300)',
          marginTop: 0,
          marginBottom: '20px',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          Статус сервера
        </h3>

        <p style={{
          color: 'var(--primary-300)',
          lineHeight: 1.7,
          marginBottom: '24px',
          fontSize: '16px'
        }}>
          Я не могу держать сервер вечно включенным, поэтому если вы видите статус оффлайн, то видео не будут доступны к просмотру. Изображения будут кэшироваться при заходе на сайт со включенным сервером.
        </p>

        <button
          onClick={onClose}
          style={{
            backgroundColor: 'var(--primary-500)',
            color: 'var(--primary-900)',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--primary-400)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--primary-500)';
          }}
        >
          Понятно
        </button>
      </div>

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
    </div>,
    document.body
  );
}
