import { useEffect, useLayoutEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
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
  setCurrentSubCategory,
} from 'store/slices/catalog/slice';
import { fetchTree, fetchArticle } from 'store/slices/article';

export function useRouteCategory() {
  const { hash, search } = useLocation();
  const { lang, articleId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const titles = useSelector(selectTitles);
  const catalog = useSelector(selectCatalog);
  const article = useSelector(selectArticle);
  const language = useSelector(getLanguage);
  const currentCategory = useSelector(selectCurrentCategory);
  const currentArticleId = useSelector(selectArticleId);

  //  При размонтировании каталога — сбросываем state
  useEffect(() => {
    return () => {
      dispatch(setCurrentCategory(''));
      dispatch(setCurrentSubCategory(''));
    };
  }, [dispatch]);

  // Первичная установка главной категории
  useLayoutEffect(() => {
    const keys = Object.keys(titles?.[language] || []);
    if (!keys.length) return;

    const rawHash = hash.replace(/^#\/?/, '');
    if (rawHash && keys.includes(rawHash)) {
      dispatch(setCurrentCategory(rawHash));
      dispatch(setCurrentSubCategory(''));
      return;
    }

    if (articleId === 'no-article') {
      const params = new URLSearchParams(search);
      const category = params.get('category');
      const subСategory = params.get('subcategory') || '';
      // проверяем, что такая категория есть в списке
      if (category && keys.includes(category)) {
        dispatch(setCurrentCategory(category));
        dispatch(setCurrentSubCategory(subСategory));
      }

      return;
    }

    if (articleId && article && currentArticleId === articleId) {
      const mainCatLocalized = article.publication.main_category;
      const foundKey = keys.find((k) => titles[lang][k] === mainCatLocalized);
      const parts = article.publication.sub_category.split('/');

      parts.shift();
      const subPath = parts.join('/');

      if (foundKey) {
        dispatch(setCurrentCategory(foundKey));
        dispatch(setCurrentSubCategory(subPath));
      }
      return;
    }
  }, [
    search,
    hash,
    articleId,
    article,
    titles,
    language,
    currentArticleId,
    lang,
    dispatch,
    navigate,
  ]);

  //  Загрузка статьи при смене lang/articleId
  useEffect(() => {
    if (!articleId || articleId === 'no-article') return;
    dispatch(fetchArticle({ lang, articleId }));
  }, [lang, articleId, dispatch]);

  // При изменении главной категории — загрузка её дерева
  useEffect(() => {
    if (!currentCategory) return;
    const section = catalog[language]?.[currentCategory];
    const age = Date.now() - (section?.fetchTime || 0);
    const needsFetch = !section?.original || age > 10 * 60 * 1000;
    if (needsFetch) {
      dispatch(fetchTree(`${language}_${currentCategory}`));
    }
  }, [currentCategory, catalog, language, dispatch]);
}
