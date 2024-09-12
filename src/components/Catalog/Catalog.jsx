import { useEffect, useRef } from 'react';
import { CatalogArticle, SideBar, NotFound } from 'components';
import './Catalog.css';
import { useSelector } from 'react-redux';
import { selectTitles } from 'store/slices/articleSlice';
import { useParams } from 'react-router-dom';

export default function Catalog({ section, setSection }) {
  const catalogRef = useRef();
  const { lang, articleId } = useParams();
  const titles = useSelector(selectTitles);
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

  return isWrong ? (
    <NotFound />
  ) : (
    <div className="catalog__container" ref={catalogRef}>
      <SideBar section={section} setSection={setSection} />
      <CatalogArticle />
    </div>
  );
}
