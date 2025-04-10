import { useState, useEffect } from 'react';
import { ErrorImage } from 'components';

export default function ImageWithFallback({
  src,
  alt,
  className,
  imageClassName,
  fallbackClassName,
  fallbackAlt = 'Заглушка',
  showFallback = true,
}) {
  const [imageError, setImageError] = useState(false);

  // Сбрасываем состояние imageError при изменении src
  useEffect(() => {
    setImageError(false);
  }, [src]);

  const handleImageError = () => {
    setImageError(true);
  };

  if (imageError) {
    return (
      <ErrorImage
        className={fallbackClassName}
        alt={fallbackAlt}
        show={showFallback}
        imageClassName={imageClassName}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleImageError}
    />
  );
} 