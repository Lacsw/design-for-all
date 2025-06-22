import { adminHash, hashPaths } from 'utils/constants';

export const useRouteType = (location, titles, language, articleId) => {
    const rawHash = location.hash ? location.hash.replace(/^#\/?/, '') : '';
    const validKeys = Object.keys(titles?.[language] || {});
  
    return {
      isAdminRoute: Object.values(adminHash).includes(location.hash),
      isAuthorRoute: Object.values(hashPaths).includes(location.hash),
      isUpdatesRoute: rawHash === 'updates',
      isCatalogRoute: articleId || (rawHash && validKeys.includes(rawHash)),
      isMainRoute: location.pathname === '/' && !location.hash,
      currentHash: rawHash,
    };
  };