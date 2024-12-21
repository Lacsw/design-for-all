import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setDecision } from 'store/slices';
import { ViewArticle } from 'components';
import previewImage from 'images/article/preview.png';
import CheckFields from 'components/CheckFields/CheckFields';

function correctData(info) {
  const whatUpdate = { ...info.what_update };
  whatUpdate.lang =
    info.offered_update.what_update_lang || info.offered_update.lang;
  whatUpdate.image = previewImage;
  return whatUpdate;
}

const ArticlesDecision = ({ info }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDecision({ uuid: info.uuid || info.offered_update.uuid }));
  }, [dispatch, info]);

  return !info.offered_update ? (
    <ViewArticle original={info} />
  ) : (
    <>
      <ViewArticle original={correctData(info)} title="Оригинал статьи" />
      {info.offered_update.type === 'created_lang' ? (
        <ViewArticle original={info.offered_update} />
      ) : (
        <CheckFields offer={info.offered_update} title="Обновление статьи" />
      )}
    </>
  );
};

export default ArticlesDecision;
