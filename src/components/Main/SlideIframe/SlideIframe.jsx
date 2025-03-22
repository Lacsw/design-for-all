import { useRef, useMemo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/selectors';
import './SlideIframe.css';
import { domain } from 'utils/config';

export function SlideIframe({ lang, category, active }) {
  const theme = useSelector(getCurrentTheme);
  const iframeRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState(null);

  // Формируем URL для статичного HTML-файла с параметром темы
  const previewUrl = useMemo(() => {
    return `${domain}/${lang}_main_${category}_preview.html?theme=${theme}`;
  }, [lang, theme, category]);

  const handleIframeLoad = () => {
    if (iframeRef.current) {
      const iframeDocument =
        iframeRef.current.contentDocument ||
        iframeRef.current.contentWindow.document;
      if (iframeDocument) {
        const contentHeight = Math.max(
          iframeDocument.body.scrollHeight,
          iframeDocument.documentElement.scrollHeight
        );
        setIframeHeight(contentHeight);
        iframeRef.current.style.height = contentHeight + 'px';
      }
    }
  };

  // Пересчитываем высоту, когда слайд становится активным
  useEffect(() => {
    if (active) {
      handleIframeLoad();
    }
  }, [active]);

  return (
    <div
      className="slide-iframe__container"
      style={iframeHeight ? { height: iframeHeight } : {}}
    >
      <iframe
        ref={iframeRef}
        src={previewUrl}
        title="Slide Preview"
        className="slide-iframe"
        onLoad={handleIframeLoad}
      ></iframe>
    </div>
  );
}

export default SlideIframe;
