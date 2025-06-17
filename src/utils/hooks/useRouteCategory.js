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
  setCurrentSubCategory,
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
  const currentArticleId = useSelector(selectArticleId);

  const isMountedRef = useRef(false);

  // Сброс главной категории и подкатегории при монтировании
  useEffect(() => {
    // dispatch(setCurrentCategory(''));
    // dispatch(setCurrentSubCategory(''));
    isMountedRef.current = true;
  }, [dispatch]);

  //  Загрузка статьи при смене lang/articleId
  useEffect(() => {
    if (!articleId || articleId === 'no-article') return;
    dispatch(fetchArticle({ lang, articleId }));
  }, [lang, articleId, dispatch]);

  // Установка currentSubCategory из URL или из статьи
  useEffect(() => {
    if (!isMountedRef.current) return;

    // Если это узел без статьи — сразу выставляем маршрут
    if (articleId === 'no-article') {
      // Например, сохраняем путь в каком-то внешнем стейте или из хеша
      // Здесь просто обнулим, т.к. глубину можно задать вручную при навигации
      dispatch(setCurrentSubCategory(''));
      return;
    }

    //  Если статья загружена — парсим её sub_category
    if (article && currentArticleId === articleId) {
      const parts = article.publication.sub_category.split('/');
      // отбросить первый элемент (главную категорию)
      parts.shift();
      const subPath = parts.join('/');
      dispatch(setCurrentSubCategory(subPath));
    }
  }, [articleId, article, currentArticleId, dispatch]);

  // Первичная установка главной категории
  useEffect(() => {
    const keys = Object.keys(titles?.[language] || []);
    if (!keys.length) return;

    // 4.1 Hash-based (если нужно)
    const rawHash = hash.replace(/^#\/?/, '');
    if (rawHash && keys.includes(rawHash)) {
      dispatch(setCurrentCategory(rawHash));
      return;
    }

    // Если перешли на “no-article” — не трогаем текущую категорию
    if (articleId === 'no-article') {
      if (!currentCategory) {
        dispatch(setCurrentCategory(keys[0])); // выставляем первую, если не задана
      }
      return;
    }

    // Если перешли на статью — ждём, пока она загрузится и currentCategory ещё не выставлена
    if (articleId && article && currentArticleId === articleId) {
      const mainCatLocalized = article.publication.main_category;
      const foundKey = keys.find((k) => titles[lang][k] === mainCatLocalized);
      if (foundKey) {
        dispatch(setCurrentCategory(foundKey));
      }
      return;
    }

    // 4.4 По умолчанию — первая
    dispatch(setCurrentCategory(keys[0]));
  }, [
    hash,
    articleId,
    article,
    titles,
    language,
    currentArticleId,
    lang,
    dispatch,
    currentCategory,
  ]);

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
