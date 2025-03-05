import { useEffect, useRef } from 'react';
import { CatalogArticle, SideBar, NotFound, Overlay } from 'components';
import './Catalog.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsMobileSidebarOpen,
  selectTitles,
  setIsMobileSidebarOpen,
} from 'store/slices/articleSlice';
import { useParams } from 'react-router-dom';
import { useIsMobile } from 'utils/hooks/useIsMobile';

export default function Catalog({ section, setSection }) {
  const catalogRef = useRef();
  const dispatch = useDispatch();

  const { lang, articleId } = useParams();
  const titles = useSelector(selectTitles);
  const isMobileSidebarOpen = useSelector(selectIsMobileSidebarOpen);
  const isMobile = useIsMobile();
  const langs = Object.keys(titles);

  const isWrong = (function () {
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

  useEffect(() => document.querySelector('.main-wrapper').scrollTo(0, 0));

  const closeSidebar = () => {
    dispatch(setIsMobileSidebarOpen(false)); 
  };

  return isWrong ? (
    <NotFound />
  ) : (
    <div className="catalog__container" ref={catalogRef}>
      {isMobile ? (
        isMobileSidebarOpen && (
          <Overlay onClick={closeSidebar} zIndex={998}>
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
