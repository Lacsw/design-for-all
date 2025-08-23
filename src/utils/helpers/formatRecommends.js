import authorApi from 'utils/api/author';

async function formatRecommends(data) {
  async function fetchRecsByIds(lang, idsArray) {
    if (!Array.isArray(idsArray) || idsArray.length === 0) return [];
    const results = await Promise.all(
      idsArray.map(async (id) => {
        try {
          const resp = await authorApi.getArticleById({ lang, articleId: id });
          const image = resp?.publication?.image || '';
          const title = resp?.publication?.title || '';
          return { uuid: id, image, title };
        } catch (e) {
          return null;
        }
      })
    );
    return results.filter(Boolean);
  }

  if (data.type) {
    if (data.recommend_from_creator?.length) {
      const recs = await fetchRecsByIds(data.lang, data.recommend_from_creator);
      data.recommend_from_creator = recs;
    }
  }

  if (data.offered_update) {
    if (data.offered_update.recommend_from_creator?.length) {
      const recs = await fetchRecsByIds(
        data.offered_update.lang,
        data.offered_update.recommend_from_creator
      );
      data.offered_update.recommend_from_creator = recs;
    }
  }

  if (data.what_update) {
    if (data.what_update.recommend_from_creator?.length) {
      const recs = await fetchRecsByIds(
        data.offered_update.what_update_lang || data.offered_update.lang,
        data.what_update.recommend_from_creator
      );
      data.what_update.recommend_from_creator = recs;
    }
  }

  return data;
}

export default formatRecommends;
