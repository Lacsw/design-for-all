import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCatalog, fetchTree } from 'store/slices/articleSlice';
import { TreeList } from 'components';
import './ArticlesTree.css';

export default function TestTree({ path }) {
  const dispatch = useDispatch();
  const { tree } = useSelector(selectCatalog);
  const fetchPath = `ru_${path}`;

  useEffect(() => {
    dispatch(fetchTree(fetchPath));
  }, [fetchPath, dispatch]);

  return (
    <div className="tree-container">{tree && <TreeList list={tree} />}</div>
  );
}
