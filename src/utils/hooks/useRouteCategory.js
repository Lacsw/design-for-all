import { useLayoutEffect, useEffect, useMemo, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectTitles,
  selectCatalog,
  selectArticle,
  selectArticleId,
  fetchTree,
  fetchArticle,
} from 'store/slices/article/slice';
import { getLanguage } from 'store/slices/user';
import {
  setCurrentCategory,
  selectCurrentCategory,
  setCurrentSubCategory,
} from 'store/slices/catalog/slice';

export function useRouteCategory() {
  const { hash } = useLocation();
  const { lang, articleId } = useParams();
  const dispatch = useDispatch();
  const titles = useSelector(selectTitles);
  const catalog = useSelector(selectCatalog);
  const article = useSelector(selectArticle);
  const currentArticleId = useSelector(selectArticleId);
  const language = useSelector(getLanguage);
  const currentCategory = useSelector(selectCurrentCategory);
  const prevDesiredRef   = useRef('');

  // Вычисляем новую главную категорию
  const desiredCategory = useMemo(() => {
    const dict = titles?.[language] || {};
    const keys = Object.keys(dict);
    if (!keys.length) return '';

    const raw = hash.replace(/^#\/?/, '');
    if (raw && keys.includes(raw)) return raw;

    if (articleId && article && currentArticleId === articleId) {
      // ищем ключ по имени из мета, перебирая все языковые словари
      for (const dictLang of Object.values(titles || {})) {
        const entry = Object.entries(dictLang).find(
          ([, name]) => name === article.publication.main_category
        );
        if (entry) {
          const foundKey = entry[0];
          if (keys.includes(foundKey)) {
            return foundKey;
          }
        }
      }
    }

    return keys[0];
  }, [hash, articleId, article, currentArticleId, titles, language]);

  useLayoutEffect(() => {
    // сработает ТОЛЬКО раз, когда desiredCategory реально поменялся
    if (prevDesiredRef.current !== desiredCategory) {
      prevDesiredRef.current = desiredCategory;
      // и только если это отличается от текущей (т.е. ручные клики не затрутся)
      if (desiredCategory && desiredCategory !== currentCategory) {
        dispatch(setCurrentCategory(desiredCategory));
      }
    }
  }, [desiredCategory, currentCategory, dispatch])

  // Умная загрузка дерева с кешированием
  useEffect(() => {
    if (!currentCategory) return;
    const section = catalog[language]?.[currentCategory];
    const age = Date.now() - (section?.fetchTime || 0);
    const needsFetch = !section?.original || age > 10 * 60 * 1000;
    if (needsFetch) {
      dispatch(fetchTree(`${language}_${currentCategory}`));
    }
  }, [currentCategory, catalog, language, dispatch]);

  // Загрузка статьи при смене articleId
  useEffect(() => {
    if (articleId && articleId !== 'no-article') {
      dispatch(fetchArticle({ lang, articleId }));
    }
  }, [lang, language, articleId, dispatch]);

  // Установка подкатегории
  useEffect(() => {
    if (articleId === 'no-article') {
      dispatch(setCurrentSubCategory(''));
    } else if (article && currentArticleId === articleId) {
      const parts = article.publication.sub_category.split('/');
      parts.shift();
      dispatch(setCurrentSubCategory(parts.join('/')));
    }
  }, [articleId, article, currentArticleId, dispatch]);

  return desiredCategory;
}
