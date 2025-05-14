import { TreeList } from 'components';
import './ArticlesTree.css';

export default function ArticlesTree({ path, catalog, language }) {
  // Получаем данные
  const sectionData = catalog?.[language]?.[path];
  const tree = sectionData?.tree || [];

  return (
    <div className="tree">
      {tree && Object.keys(tree).length > 0 && (
        <TreeList list={tree} language={language} />
      )}
    </div>
  );
}
