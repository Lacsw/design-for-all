import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTree } from 'store/slices/articleSlice';
import { TreeList } from 'components';
import './ArticlesTree.css';

export default function TestTree({ path, catalog, language }) {
  const dispatch = useDispatch();
  const { tree, fetchTime } = catalog[language][path];
  const fetchPath = `${language}_${path}`;

  useEffect(() => {
    Date.now() - fetchTime > 630000 && dispatch(fetchTree(fetchPath));
  }, [fetchPath, fetchTime, dispatch]);

  return (
    <div className="tree">
      {tree && <TreeList list={tree} language={language} />}
    </div>
  );
}
