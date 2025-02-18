import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/selectors';
import './SlideIframe.css';
import { useMemo } from 'react';

export function SlideIframe({ lang, category }) {
  const theme = useSelector(getCurrentTheme);

  // Формируем URL для статичного HTML-файла с параметром темы
  const previewUrl = useMemo(() => {
    return `https://design-for-all.net/${lang}_main_${category}_preview.html?theme=${theme}`;
  }, [lang, theme, category]);

  return (
    <div
      className="slide-iframe__container"
    >
      <iframe
        src={previewUrl}
        title="Slide Preview"
        className="slide-iframe"
      ></iframe>
    </div>
  );
}
export default SlideIframe;
