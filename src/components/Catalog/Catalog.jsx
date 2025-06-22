import { useEffect } from 'react';
import { CatalogArticle, SideBar, NotFound, Overlay } from 'components';
import './Catalog.css';
import { useParams } from 'react-router-dom';
import { useIsMobile } from 'utils/hooks/useIsMobile';
import { useInteractiveManager } from 'utils/contexts/InteractiveManagerContext';
import { useSelector } from 'react-redux';
import { selectTitles } from 'store/slices/article';
import { useRouteCategory } from 'utils/hooks/useRouteCategory';

export default function Catalog() {
  useRouteCategory(); // Вызов хука для обработки маршрута и загрузки данных каталог
  const { lang, articleId } = useParams();
  const titles = useSelector(selectTitles);
  const isMobile = useIsMobile();
  const langs = Object.keys(titles);
  const { activeComponent, closeComponent } = useInteractiveManager();

  const isWrong =
    lang &&
    articleId &&
    (!langs.includes(lang) ||
      (articleId.length !== 32 && articleId !== 'no-article'));

  useEffect(() => {
    document.querySelector('.main-wrapper').scrollTo(0, 0);
  }, []);

  // Функция для закрытия сайдбара на мобильных устройствах
  const closeSidebar = () => {
    closeComponent('mobileSidebar');
  };

  return isWrong ? (
    <NotFound />
  ) : (
    <div className="catalog__container">
      {isMobile ? (
        activeComponent === 'mobileSidebar' && (
          <Overlay onClick={closeSidebar} zIndex={998} disableHover={true}>
            <SideBar />
          </Overlay>
        )
      ) : (
        <SideBar />
      )}
      <CatalogArticle />
    </div>
  );
}
