import TreeList from "./TreeList";
import { useState } from "react";

export default function TreeItem({ title, data }) {

  const [isOpen, setIsOpen] = useState(false);

  function handleClick(evt) {
    evt.stopPropagation();
    setIsOpen(!isOpen);
  }

  return (
    <li onClick={handleClick}>
      {title}
      {!isOpen ? null : typeof data === 'object' ? <TreeList list={data} /> : data}
    </li>
  )
}