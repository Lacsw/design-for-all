import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTree } from 'store/slices/article';
import { TreeList } from 'components';
import { VALID_SECTIONS } from 'utils/constants';
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
    // Проверяем, что path является допустимой секцией
    if ((!sectionData?.original || Date.now() - fetchTime > 630000) && VALID_SECTIONS.includes(path)) {
      dispatch(fetchTree(fetchPath));
    }
  }, [fetchPath, fetchTime, dispatch, sectionData, path]);

  return (
    <div className="tree">
      {tree && Object.keys(tree).length > 0 && (
        <TreeList list={tree} language={language} />
      )}
    </div>
  );
}
