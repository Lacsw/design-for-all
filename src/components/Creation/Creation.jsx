import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { prepareDraft, resetDraft, addOriginal } from 'store/slices';
import authorApi from 'utils/api/author';
import { selectArticle } from 'store/slices/articleSlice';
import { NewArticle, ViewArticle } from 'components';
import previewImage from 'images/article/preview.png';
import { langSelectOptions } from 'utils/constants';
import './Creation.css';
import { getDraft } from 'store/selectors';
import formatRecommends from 'utils/helpers/formatRecommends';

const Creation = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const article = useSelector(selectArticle);
  const draft = useSelector(getDraft);
  const original = useRef(null);
  const rejectFields = useRef([]);
  const langsList = useRef(langSelectOptions);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(resetDraft());
    if (!location.state) {
      setLoading(false);
      return;
    }
    if (location.state.draft) {
      const type = location.state.name === 'edit' ? 'draft' : 'update';
      authorApi
        .getCreation(type, location.state.draft)
        .then(formatRecommends)
        .then((data) => {
          original.current = data.what_update;
          rejectFields.current = data.offered_update?.rejected_fields || [];
          const newDraft = {
            lang: data.lang || data.offered_update?.lang,
            main_category:
              data.main_category || data.offered_update?.main_category,
            sub_category:
              data.sub_category || data.offered_update?.sub_category || '',
            image: data.image || data.offered_update?.image ? previewImage : '',
            title: data.title || data.offered_update?.title || '',
            description:
              data.description || data.offered_update?.description || '',
            recommend_from_creator:
              data.recommend_from_creator ||
              data.offered_update?.recommend_from_creator ||
              [],
          };
          if (data.type !== 'created') {
            newDraft.what_update = data.offered_update?.what_update;
            original.current.image = previewImage;
          }
          if (data.offered_update?.type === 'updated') {
            original.current.lang = data.offered_update?.lang;
            newDraft.sub_category =
              data.offered_update.sub_category ?? data.what_update.sub_category;
            newDraft.image =
              data.offered_update.image ?? data.what_update.image;
            newDraft.title =
              data.offered_update.title ?? data.what_update.title;
            newDraft.description =
              data.offered_update.description ?? data.what_update.description;
            newDraft.recommend_from_creator =
              data.offered_update.recommend_from_creator ??
              data.what_update.recommend_from_creator;
          }
          if (data.offered_update?.type === 'created_lang') {
            original.current.lang = data.offered_update?.what_update_lang;
            newDraft.what_update_lang = data.offered_update?.what_update_lang;
          }
          if (location.state.name === 'edit') {
            newDraft.uuid = location.state.draft;
          }
          dispatch(prepareDraft(newDraft));
          dispatch(
            addOriginal(
              location.state.type === 'updated' ? original.current : newDraft
            )
          );
        })
        .catch((err) => console.warn(err))
        .finally(() => setLoading(false));
    }
    if (
      location.state.name === 'correct' ||
      location.state.name === 'translate'
    ) {
      original.current = {
        languages: article.languages,
        lang: location.state.lang,
        sub_category: article.publication.sub_category,
        image: previewImage,
        title: article.publication.title,
        description: article.publication.description,
        recommend_from_creator: article.recommend,
      };
      dispatch(addOriginal(original.current));
    }
    if (location.state.name === 'correct') {
      dispatch(
        prepareDraft({
          lang: location.state.lang,
          main_category: 'default',
          sub_category: article.publication.sub_category,
          image: previewImage,
          title: article.publication.title,
          description: article.publication.description,
          what_update: location.state.original,
          recommend_from_creator: article.recommend,
        })
      );
      setLoading(false);
    }
    if (location.state.name === 'translate') {
      langsList.current = langSelectOptions.filter(
        (lang) => !original.current.languages.includes(lang.value)
      );
      dispatch(
        prepareDraft({
          main_category: 'default',
          what_update: location.state.original,
          what_update_lang: location.state.lang,
        })
      );
      setLoading(false);
    }
  }, [location, article, dispatch]);

  if (loading) return <span className="preloader_fixed" />;

  return (
    <div
      className={
        original.current
          ? 'account__draft account__draft_two'
          : 'account__draft'
      }
    >
      {original.current && (
        <ViewArticle original={original.current} title={'Оригинал статьи'} />
      )}
      {location.state?.name === 'view' ? (
        <ViewArticle original={draft} rejectFields={rejectFields.current} />
      ) : (
        <NewArticle
          langsList={langsList.current}
          rejectFields={rejectFields.current}
          draft={draft}
        />
      )}
    </div>
  );
};

export default Creation;
