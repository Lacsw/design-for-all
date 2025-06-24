import { TreeItem } from 'components';
import './TreeList.css';

export default function TreeList({ nodes = [], language }) {
  return (
    <ul className="tree-list">
      {nodes.map((node) => (
        <TreeItem
          key={node.key} // полный уникальный путь
          title={node.title}
          id={node.id} // uuid | null
          children={node.children}
          nodeKey={node.key}
          language={language}
        />
      ))}
    </ul>
  );
}
