import { useState, useEffect } from 'react';
import TreeList from './TreeList';
import createTree from './createTree';
import './TestTree.css';

export default function TestTree() {

  const [sections, setSections] = useState(null);

  useEffect(() => {
    fetch('https://design-for-all.net/tree_ru_mobile.json')
      .then(res => res.json())
      .then(data => {
        const articlesTree = createTree(data);
        setSections(articlesTree);
      })
      .catch(err => console.log('Ошибка ' + err))
  }, []);

  return (
    <div>
      {sections && <TreeList list={sections} />}
    </div>
  );
}