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

  // При любом изменении articleId — сразу сбрасываем категорию, чтобы убрать дерево предыдущей секции
  useEffect(() => {
    if (articleId && articleId !== 'no-article') {
      dispatch(setCurrentCategory(''));
    }
  }, [articleId, dispatch]);

  // Загружаем статью один раз при смене lang/articleId
  useEffect(() => {
    if (!articleId || articleId === 'no-article') return;
    dispatch(fetchArticle({ lang, articleId }));
  }, [lang, articleId, dispatch]);

  // Определяем категорию при первом открытии каталога
  useEffect(() => {
    const validKeys = Object.keys(titles[language] || []);
    if (validKeys.length === 0) return;

    // Пытаемся найти категорию по hash: #/web → "web"
    const rawHash = hash.replace(/^#\/?/, '');
    if (rawHash && validKeys.includes(rawHash)) {
      dispatch(setCurrentCategory(rawHash));
      return;
    }

    // Если статья не найдена, то ничего не делаем
    if (articleId === 'no-article') {
      return;
    }

    // Если статья найдена, то ждём, пока в стейте появится наша статья
    if (articleId) {
      if (!article || currentArticleId !== articleId) {
        return; // ждём дальше
      }
      // Получаем локализованное имя категории
      const localized = article.publication.main_category;
      // ищем key по titles[langParam]
      const foundKey = Object.keys(titles[lang] || []).find(
        (k) => titles[lang][k] === localized
      );
      // Если ключ найден, то устанавливаем категорию
      if (foundKey) {
        dispatch(setCurrentCategory(foundKey));
      }
      // Иначе устанавливаем первую категорию из списка
      return;
    }

    // Если статья не найдена, то устанавливаем первую категорию из списка
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

  // Каждый раз, когда currentCategory меняется → загружаем дерево, если нужно
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
