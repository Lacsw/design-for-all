import { useLocation, useParams } from 'react-router-dom';
import { Main, Catalog, AccountAuthor, AccountAdmin } from 'components';
import { adminHash } from 'utils/constants';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setIsCatalogOpen } from 'store/slices/articleSlice';

const Fork = ({ section, setSection }) => {
  const location = useLocation();
  const { lang } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.key]);

  const isCatalogOpen = Boolean(section || lang);

  useEffect(() => {
    dispatch(setIsCatalogOpen(isCatalogOpen));
  }, [isCatalogOpen, dispatch]);

  if (Object.values(adminHash).includes(location.hash)) {
    return (
      <AccountAdmin hash={location.hash} resetSection={() => setSection('')} />
    );
  }

  if (location.hash) {
    return (
      <AccountAuthor hash={location.hash} resetSection={() => setSection('')} />
    );
  }

  return isCatalogOpen ? (
    <Catalog section={section} setSection={setSection} />
  ) : (
    <Main setSection={setSection} />
  );
};

export default Fork;
