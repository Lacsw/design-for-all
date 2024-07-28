import { TreeItem } from 'components';
import './TreeList.css';

export default function TreeList({ list }) {
  const topics = Object.keys(list);

  return (
    <ul className="tree-list">
      {topics.map((item, index) => (
        <TreeItem key={index} title={item} data={list[item]} />
      ))}
    </ul>
  );
}
