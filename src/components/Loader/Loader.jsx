import './Loader.css';
import { useTranslation } from 'react-i18next';
import { COMMON } from 'utils/translationKeys'; 

function Loader({ extraClass }) {
  const { t } = useTranslation();
  return <h2 className={`loader ${extraClass ?? ''}`}>{t(COMMON.LOADER.LOADING_TEXT)}</h2>;
}

export default Loader;
