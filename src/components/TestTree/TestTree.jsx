import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAll, fetchTree } from 'store/slices/articleSlice';
import TreeList from './TreeList';
import './TestTree.css';

export default function TestTree() {
  const dispatch = useDispatch();
  const { catalog } = useSelector(selectAll);

  useEffect(() => {
    dispatch(fetchTree('ru_mobile'));
  }, [dispatch]);

  return (
    <div>
      {catalog && <TreeList list={catalog} />}
    </div>
  );
}