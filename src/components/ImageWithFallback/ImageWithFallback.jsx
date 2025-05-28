import { useState, useEffect } from 'react';
import { ErrorImage } from 'components';
import { useTranslation } from 'react-i18next';
import { COMMON } from 'utils/translationKeys';

export default function ImageWithFallback({
  src,
  alt,
  className,
  imageClassName,
  fallbackClassName,
  fallbackAlt,
  showFallback = true,
}) {
  const { t } = useTranslation();
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
        alt={fallbackAlt || t(COMMON.IMAGE_FALLBACK_TEXT)}
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