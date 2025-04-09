import { useLocation, useParams } from 'react-router-dom';
import { Main, Catalog, AccountAuthor, AccountAdmin } from 'components';
import { adminHash } from 'utils/constants';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCatalogOpen, selectTitles } from 'store/slices/articleSlice';
import UpdatesPage from 'components/Updates/UpdatesPage';
import { getLanguage } from 'store/selectors';

const Fork = ({ section, setSection }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { articleId } = useParams();
  const titles = useSelector(selectTitles);
  const language = useSelector(getLanguage);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.key]);

  const isCatalogOpen = Boolean( articleId || section);

  useEffect(() => {
    dispatch(setIsCatalogOpen(isCatalogOpen));
  }, [isCatalogOpen, dispatch]);

  const rawHash = location.hash ? location.hash.replace(/^#\/?/, '') : '';
  const validKeys = Object.keys(titles[language] || {});

  useEffect(() => {
    if (rawHash && validKeys.includes(rawHash) && section !== rawHash) {
      setTimeout(() => {
        setSection(rawHash);
      }, 0);
    }
  }, [rawHash, section, setSection, validKeys]);

  // Если hash соответствует админскому – показываем AccountAdmin
  if (Object.values(adminHash).includes(location.hash)) {
    return (
      <AccountAdmin hash={location.hash} resetSection={() => setSection('')} />
    );
  }

  if (rawHash === 'updates') {
    return <UpdatesPage section={rawHash} setSection={setSection} />;
  }

  if (articleId) {
    return <Catalog section={section} setSection={setSection} />;
  }

  if (rawHash && validKeys.includes(rawHash)) {
    return <Catalog section={rawHash} setSection={setSection} />;
  }

  if (location.hash) {
    return (
      <AccountAuthor hash={location.hash} resetSection={() => setSection('')} />
    );
  }

  if (location.pathname === '/' && !location.hash) {
    return <Main setSection={setSection} />;
  }

  return isCatalogOpen ? (
    <Catalog section={section} setSection={setSection} />
  ) : (
    <Main setSection={setSection} />
  );
};

export default Fork;
