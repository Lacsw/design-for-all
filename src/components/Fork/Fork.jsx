import { useLocation } from 'react-router-dom';
import { Main, Catalog, AccountAuthor, AccountAdmin } from 'components';
import { adminHash } from 'utils/constants';

const Fork = ({ section, setSection }) => {
  const location = useLocation();

  if (Object.values(adminHash).includes(location.hash)) {
    return <AccountAdmin />
  }

  return location.hash ? (
    <AccountAuthor hash={location.hash} resetSection={() => setSection('')} />
  ) : section ? (
    <Catalog section={section} setSection={setSection} />
  ) : (
    <Main setSection={setSection} />
  );
};

export default Fork;
