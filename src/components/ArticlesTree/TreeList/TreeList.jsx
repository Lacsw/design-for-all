import { TreeItem } from 'components';
import './TreeList.css';

export default function TreeList({ list = {}, language, status }) {
  const topics = Object.keys(list || {});
  return (
    <ul className="tree-list">
      {topics.map((item, index) => (
        <TreeItem
          key={index}
          title={item}
          data={list[item]}
          language={language}
          status={status}
        />
      ))}
    </ul>
  );
}
