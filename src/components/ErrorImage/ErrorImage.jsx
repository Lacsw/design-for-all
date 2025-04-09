// @ts-check
import React from 'react';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/selectors';
// @ts-ignore
import errorImageDark from 'images/error-image_black.jpg';
// @ts-ignore
import errorImageLight from 'images/error-image_white.jpg';
import './ErrorImage.css';

/**
 * Компонент для отображения изображения-заглушки при ошибках загрузки изображений (коды ответов 4xx и 5xx)
 * @param {object} props - Свойства компонента
 * @param {string} props.className - CSS-класс для контейнера изображения-заглушки
 * @param {string} props.alt - Альтернативный текст для изображения-заглушки
 * @param {boolean} props.show - Флаг для отображения изображения-заглушки
 * @param {string} props.imageClassName - CSS-класс для самого изображения-заглушки
 * @returns {JSX.Element|null} - Компонент изображения-заглушки или null, если show=false
 */
export default function ErrorImage({ 
  className, 
  alt = 'Заглушка', 
  show = false,
  imageClassName = 'error-image'
}) {
  const theme = useSelector(getCurrentTheme);

  if (show) {
    return (
      <div className={`error-image-placeholder ${className || ''}`}>
        <img 
          src={theme === 'dark' ? errorImageDark : errorImageLight}
          alt={alt} 
          className={imageClassName}
        />
      </div>
    );
  }

  return null;
}
