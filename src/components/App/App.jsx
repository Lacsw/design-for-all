import { Route, Routes } from 'react-router-dom';
import { memo, useEffect, useState } from 'react';
import { NotFound, Layout, Fork } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTitles, selectTitles } from 'store/slices/articleSlice';
import { useSyncTabs } from 'utils/hooks/useSyncTabs';

function App() {
  const dispatch = useDispatch();
  const [section, setSection] = useState('');
  const categories = useSelector(selectTitles);

  // Используем хук для синхронизации между вкладками
  useSyncTabs();

  useEffect(() => {
    !categories && dispatch(fetchTitles());
  });

  return (
    <Layout resetSection={() => setSection('')}>
      {categories && (
        <Routes>
          <Route
            path="/"
            element={<Fork section={section} setSection={setSection} />}
          />
          <Route
            path="/:lang/:articleId"
            element={<Fork section={section} setSection={setSection} />}
          />
          <Route path="*" element={<NotFound resetSection={() => setSection('')} />} />
        </Routes>
      )}
    </Layout>
  );
}

export default memo(App);
