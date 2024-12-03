import authorApi from 'utils/api/author';

async function formatRecommends(data) {
  if (data.type) {
    if (data.recommend_from_creator?.length) {
      const ids = data.recommend_from_creator.join(';');
      let recs = [];
      try {
        recs = await authorApi.getRecommends(data.lang, ids);
      } catch {
        recs = [];
      }
      data.recommend_from_creator = recs;
    }
  }

  if (data.offered_update) {
    if (data.offered_update.recommend_from_creator?.length) {
      const ids = data.offered_update.recommend_from_creator.join(';');
      let recs = [];
      try {
        recs = await authorApi.getRecommends(data.offered_update.lang, ids);
      } catch {
        recs = [];
      }
      data.offered_update.recommend_from_creator = recs;
    }
  }

  if (data.what_update) {
    if (data.what_update.recommend_from_creator?.length) {
      const ids = data.what_update.recommend_from_creator.join(';');
      const recs = await authorApi.getRecommends(
        data.offered_update.what_update_lang || data.offered_update.lang,
        ids
      );
      data.what_update.recommend_from_creator = recs;
    }
  }

  return data;
}

export default formatRecommends;
