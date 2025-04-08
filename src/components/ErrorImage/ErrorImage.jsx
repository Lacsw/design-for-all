import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/selectors';
import errorImageDark from 'images/error-image_black.jpg';
import errorImageLight from 'images/error-image_white.jpg';
import './ErrorImage.css';

export default function ErrorImage({
  className,
  alt = 'Заглушка',
  show = false,
}) {
  const theme = useSelector(getCurrentTheme);

  if (show) {
    return (
      <div className={`error-image-placeholder ${className || ''}`}>
        <img
          src={theme === 'dark' ? errorImageDark : errorImageLight}
          alt={alt}
          className="error-image"
        />
      </div>
    );
  }

  return null;
}
