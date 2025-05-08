import { useLocation, useParams } from 'react-router-dom';
import { Main, Catalog, AccountAuthor, AccountAdmin, NotFound } from 'components';
import { adminHash, hashPaths } from 'utils/constants';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpen, setMainCategory } from 'store/slices/catalog/slice';
import { selectTitles } from 'store/slices/article/slice';
import UpdatesPage from 'components/Updates/UpdatesPage';
import { getLanguage } from 'store/slices/user';
import ProtectedHashRoute from '../ProtectedHashRoute/ProtectedHashRoute';

const SPECIAL_SECTIONS = ['updates', 'search'];

const Fork = ({ section, setSection }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { articleId } = useParams();
  const titles = useSelector(selectTitles);
  const language = useSelector(getLanguage);

  const updateSection = useCallback((newSection) => {
    const cleanSection = newSection.replace(/^\//, '');
    if (setSection) {
      setSection(cleanSection);
    }
    dispatch(setMainCategory(cleanSection));
  }, [setSection, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.key]);

  const rawHash = location.hash ? location.hash.replace(/^#\/?/, '') : '';
  const validKeys = Object.keys(titles?.[language] || {});

  useEffect(() => {
    if (rawHash && validKeys.includes(rawHash) && section !== rawHash && !SPECIAL_SECTIONS.includes(rawHash)) {
      updateSection(rawHash);
    }
  }, [rawHash, section, validKeys, updateSection]);

  const isCatalogOpen = Boolean(
    articleId || 
    (rawHash && validKeys.includes(rawHash) && !SPECIAL_SECTIONS.includes(rawHash))
  );

  useEffect(() => {
    dispatch(setIsOpen(isCatalogOpen));
  }, [isCatalogOpen, dispatch]);

  if (Object.values(adminHash).includes(location.hash)) {
    return (
      <ProtectedHashRoute requiredRoles={['admin', 'super_admin']}>
        <AccountAdmin
          hash={location.hash}
          resetSection={() => setSection('')}
        />
      </ProtectedHashRoute>
    );
  }

  if (rawHash === 'updates') {
    return <UpdatesPage section={rawHash} setSection={setSection} />;
  }

  if (rawHash === 'articles') {
    return (
     <NotFound resetSection={() => setSection('')}/>
    );
  }

  if (articleId || (rawHash && validKeys.includes(rawHash))) {
    return <Catalog section={articleId ? section : rawHash} setSection={setSection} />;
  }

  if (Object.values(hashPaths).includes(location.hash)) {
    return (
      <ProtectedHashRoute requiredRole="mentor">
        <AccountAuthor
          hash={location.hash}
          resetSection={() => setSection('')}
        />
      </ProtectedHashRoute>
    );
  }

  if (location.pathname === '/' && !location.hash) {
    return <Main setSection={setSection} />;
  }

    // Для всех остальных случаев показываем 404
    if (rawHash || location.pathname !== '/') {
      return <NotFound resetSection={() => setSection('')} />;
    }


};

export default Fork;
