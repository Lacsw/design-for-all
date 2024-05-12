export const getMainImage = (state) => state.author.newArticle.mainImage;
export const getIsMainImageLoading = (state) =>
  state.author.newArticle.isLoading;
export const getIsMainImageSuccess = (state) => state.author.newArticle.success;
export const getMainImageError = (state) => state.author.newArticle.error;
