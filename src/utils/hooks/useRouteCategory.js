import { useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectTitles,
  selectCatalog,
  selectArticle,
  selectArticleId,
} from 'store/slices/article/slice';
import { getLanguage } from 'store/slices/user';
import {
  setCurrentCategory,
  selectCurrentCategory,
} from 'store/slices/catalog/slice';
import { fetchTree, fetchArticle } from 'store/slices/article';

export function useRouteCategory() {
  const { hash } = useLocation();
  const { lang, articleId } = useParams();
  const dispatch = useDispatch();
  const titles = useSelector(selectTitles);
  const catalog = useSelector(selectCatalog);
  const article = useSelector(selectArticle);
  const language = useSelector(getLanguage);
  const currentCategory = useSelector(selectCurrentCategory);
  const isAlive = useRef(true);
  const currentArticleId = useSelector(selectArticleId);
  // флаг размонтирования
  useEffect(() => {
    return () => {
      isAlive.current = false;
    };
  }, []);

  // 1️⃣ Загружаем статью ровно один раз при смене lang/articleId
  useEffect(() => {
    if (!articleId || articleId === 'no-article') return;
    dispatch(setCurrentCategory(''));
    dispatch(fetchArticle({ lang, articleId }));
  }, [lang, articleId, dispatch]);

  // 1️⃣ Определяем категорию при **первом** заходе
  useEffect(() => {
    const validKeys = Object.keys(titles[language] || []);
    if (validKeys.length === 0) return;

    // A) Попытка по hash: #/web → "web"
    const rawHash = hash.replace(/^#\/?/, '');
    if (rawHash && validKeys.includes(rawHash)) {
      dispatch(setCurrentCategory(rawHash));
      return;
    }

    if (articleId === 'no-article') {
      return;
    }

    // B) статья → ждём, пока в стейте появится наша статья
    if (articleId) {
      if (!article || currentArticleId !== articleId) {
        return; // ждём дальше
      }
      // теперь у нас в `article.publication.main_category`
      // локализованное имя на языке статьи (langParam)
      const localized = article.publication.main_category;
      // чтобы найти наш key, ищем по titles[langParam], а не по интерфейсным
      const foundKey = Object.keys(titles[lang] || []).find(
        (k) => titles[lang][k] === localized
      );
      if (foundKey) {
        dispatch(setCurrentCategory(foundKey));
      }
      return;
    }

    // C) Иначе — первая секция из списка
    dispatch(setCurrentCategory(validKeys[0]));
  }, [
    hash,
    articleId,
    article,
    titles,
    language,
    dispatch,
    currentArticleId,
    lang,
  ]);

  // 2️⃣ Каждый раз, когда currentCategory меняется → загружаем дерево, если нужно
  useEffect(() => {
    if (!currentCategory) return;
    const section = catalog[language]?.[currentCategory];
    const age = Date.now() - (section?.fetchTime || 0);
    const needsFetch = !section?.original || age > 630_000;
    if (needsFetch) {
      dispatch(fetchTree(`${language}_${currentCategory}`));
    }
  }, [currentCategory, catalog, language, dispatch]);
}
