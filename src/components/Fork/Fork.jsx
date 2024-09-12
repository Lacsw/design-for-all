import { useLocation } from 'react-router-dom';
import { Main, Catalog, AccountAuthor } from 'components';

const Fork = ({ section, setSection }) => {
  const location = useLocation();
  return location.hash ? (
    <AccountAuthor hash={location.hash} />
  ) : section ? (
    <Catalog section={section} setSection={setSection} />
  ) : (
    <Main setSection={setSection} />
  );
};

export default Fork;
