import { useLocation, useParams } from 'react-router-dom';
import { Main, Catalog, AccountAuthor, AccountAdmin } from 'components';
import { adminHash } from 'utils/constants';

const Fork = ({ section, setSection }) => {
  const location = useLocation();
  const { lang } = useParams();

  if (Object.values(adminHash).includes(location.hash)) {
    return (
      <AccountAdmin hash={location.hash} resetSection={() => setSection('')} />
    );
  }

  return location.hash ? (
    <AccountAuthor hash={location.hash} resetSection={() => setSection('')} />
  ) : section || lang ? (
    <Catalog section={section} setSection={setSection} />
  ) : (
    <Main setSection={setSection} />
  );
};

export default Fork;
