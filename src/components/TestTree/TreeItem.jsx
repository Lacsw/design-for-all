import TreeList from "./TreeList";
import { useState } from "react";

export default function TreeItem({ title, data }) {

  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = typeof data === 'object';
  const id = hasChildren ? data.id : data;

  const newData = {...data};
  delete newData.id;

  const arrowClass =
    !hasChildren ? '' :
      !isOpen ?
        ' tree-list__arrow_visible' :
        ' tree-list__arrow_visible tree-list__arrow_on';

  const titleClass = id ? ' tree-list__title_id' : '';

  function handleOpen() {
    setIsOpen(!isOpen);
  }

  function handleResponse() {
    console.log(id);
  }

  return (
    <li>
      <div className="tree-list__top">
        <span className={'tree-list__arrow' + arrowClass} onClick={handleOpen}></span>
        <span className={'tree-list__title' + titleClass} onClick={handleResponse}>{title}</span>
      </div>
      {!isOpen || !hasChildren ? null : <TreeList list={newData} />}
    </li>
  )
}