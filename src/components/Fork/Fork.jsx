import { useLocation, useParams } from 'react-router-dom';
import {
  Main,
  Catalog,
  AccountAuthor,
  AccountAdmin,
  MobileAccountAuthor,
} from 'components';
import { adminHash } from 'utils/constants';
import { useEffect } from 'react';
import { useIsMobile } from 'utils/hooks/useIsMobile';

const Fork = ({ section, setSection }) => {
  const location = useLocation();
  const { lang } = useParams();
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.key]);

  if (Object.values(adminHash).includes(location.hash)) {
    return (
      <AccountAdmin hash={location.hash} resetSection={() => setSection('')} />
    );
  }

  if (location.hash) {
    return isMobile ? (
      <MobileAccountAuthor
        hash={location.hash}
        resetSection={() => setSection('')}
      />
    ) : (
      <AccountAuthor hash={location.hash} resetSection={() => setSection('')} />
    );
  }

  return section || lang ? (
    <Catalog section={section} setSection={setSection} />
  ) : (
    <Main setSection={setSection} />
  );
};

export default Fork;
