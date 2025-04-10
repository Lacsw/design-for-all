import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTree } from 'store/slices/article/slice';
import { TreeList } from 'components';
import './ArticlesTree.css';

export default function ArticlesTree({ path, catalog, language }) {
  const dispatch = useDispatch();

  // Проверяем существование данных
  const sectionData = catalog?.[language]?.[path];
  const tree = sectionData?.tree || [];
  const fetchTime = sectionData?.fetchTime || 0;
  const fetchPath = `${language}_${path}`;

  useEffect(() => {
    // Загружаем дерево, если данных нет или они устарели
    if (!sectionData?.original || Date.now() - fetchTime > 630000) {
      dispatch(fetchTree(fetchPath));
    }
  }, [fetchPath, fetchTime, dispatch, sectionData]);

  return (
    <div className="tree">
      {tree && Object.keys(tree).length > 0 && (
        <TreeList list={tree} language={language} />
      )}
    </div>
  );
}
