import { useEffect, useRef } from 'react';
import { CatalogArticle, SideBar, NotFound, Overlay } from 'components';
import './Catalog.css';
import { useParams } from 'react-router-dom';
import { useIsMobile } from 'utils/hooks/useIsMobile';
import { useInteractiveManager } from 'utils/contexts/InteractiveManagerContext';
import { useSelector } from 'react-redux';
import { selectTitles } from 'store/slices/article/slice';

export default function Catalog({ section, setSection }) {
  const catalogRef = useRef();
  const { lang, articleId } = useParams();
  const titles = useSelector(selectTitles);
  const isMobile = useIsMobile();
  const langs = Object.keys(titles);

  const { activeComponent, closeComponent } = useInteractiveManager();

  const isWrong = (() => {
    if (
      lang &&
      articleId &&
      (!langs.includes(lang) ||
        (articleId.length !== 32 && articleId !== 'no-article'))
    ) {
      return true;
    }
    return false;
  })();

  useEffect(() => {
    document.querySelector('.main-wrapper').scrollTo(0, 0);
  }, []);

  const closeSidebar = () => {
    closeComponent('mobileSidebar');
  };

  return isWrong ? (
    <NotFound />
  ) : (
    <div className="catalog__container" ref={catalogRef}>
      {isMobile ? (
        activeComponent === 'mobileSidebar' && (
          <Overlay onClick={closeSidebar} zIndex={998} disableHover={true}>
            <SideBar section={section} setSection={setSection} />
          </Overlay>
        )
      ) : (
        <SideBar section={section} setSection={setSection} />
      )}
      <CatalogArticle />
    </div>
  );
}
