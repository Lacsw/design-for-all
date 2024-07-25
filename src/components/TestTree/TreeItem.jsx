import TreeList from "./TreeList";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function TreeItem({ title, data }) {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = typeof data === 'object';
  const id = hasChildren ? data.id : data;

  const newData = { ...data };
  delete newData.id;

  const arrowClass =
    !hasChildren ? '' :
      !isOpen ?
        ' tree-item__arrow_visible' :
        ' tree-item__arrow_visible tree-item__arrow_on';

  function handleOpen() {
    setIsOpen(!isOpen);
  }

  function handleResponse() {
    if (id) {
      navigate(`ru/${id}`);
    } else {
      navigate('ru/no-article');
    }
  }

  return (
    <li className="tree-item">
      <div className="tree-item__top">
        <span className={'tree-item__arrow' + arrowClass} onClick={handleOpen}></span>
        <span className="tree-item__title" onClick={handleResponse}>{title}</span>
      </div>
      {!isOpen || !hasChildren ? null : <TreeList list={newData} />}
    </li>
  )
}