import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setDecision } from 'store/slices/user';
import { ViewArticle } from 'components';
import previewImage from 'images/article/preview.png';
import CheckFields from 'components/CheckFields/CheckFields';
import { ADMIN } from 'utils/translationKeys';

function correctData(info) {
  const whatUpdate = { ...info.what_update };
  whatUpdate.lang =
    info.offered_update.what_update_lang || info.offered_update.lang;
  if (!whatUpdate.image || whatUpdate.image.includes('test_')) {
    whatUpdate.image = previewImage;
  }
  return whatUpdate;
}

const ArticlesDecision = ({ info, state }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDecision({ uuid: info.uuid || info.offered_update.uuid }));
  }, [dispatch, info]);

  return !info.offered_update ? (
    <ViewArticle original={info} />
  ) : (
    <>
      <ViewArticle
        original={correctData(info)}
        title={t(ADMIN.ARTICLE_DECISION.ORIGINAL_ARTICLE_TITLE)}
      />
      {info.offered_update.type === 'created_lang' || state.status ? (
        <ViewArticle
          original={info.offered_update}
          rejectFields={info.offered_update.rejected_fields}
        />
      ) : (
        <CheckFields
          offer={info.offered_update}
          title={t(ADMIN.ARTICLE_DECISION.UPDATED_TITLE)}
        />
      )}
    </>
  );
};

export default ArticlesDecision;
