import { Route, Routes } from 'react-router-dom';
import { memo, useEffect } from 'react';
import { NotFound, Layout, Fork } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTitles, selectTitles } from 'store/slices/article';
import { useSyncTabs } from 'utils/hooks/useSyncTabs';
import { useLanguageSync } from 'utils/hooks/useLanguageSync';

function App() {
  const dispatch = useDispatch();
  const categories = useSelector(selectTitles);

  // Используем хук для синхронизации между вкладками
  useSyncTabs();
  
  // Используем хук для синхронизации языка между Redux и i18next
  useLanguageSync();

  useEffect(() => {
    if (!categories) {
      dispatch(fetchTitles());
    }
  }, [categories, dispatch]);


  return (
    <div className="app">
      <Layout >
        {categories && (
          <Routes>
            <Route path="/" element={<Fork />} />
            <Route path="/:lang/:articleId" element={<Fork />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </Layout>
    </div>
  );
}

export default memo(App);
