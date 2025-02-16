import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/selectors';
import './DesktopSlideIframe.css';
import { useMemo } from 'react';

export function DesktopSlideIframe({ lang, category }) {
  const theme = useSelector(getCurrentTheme);

  // Формируем URL для статичного HTML-файла с параметром темы
  const previewUrl = useMemo(() => {
    return `https://design-for-all.net/${lang}_main_${category}_preview.html?theme=${theme}`;
  }, [lang, theme, category]);

  return (
    <div
      className="desktop-slide-iframe__container"
    >
      <iframe
        src={previewUrl}
        title="Desktop Slide Preview"
        className="desktop-slide-iframe"
      ></iframe>
    </div>
  );
}
export default DesktopSlideIframe;
