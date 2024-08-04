import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { SideBar } from 'components';
import './Catalog.css';

export default function Catalog() {
  const catalogRef = useRef();
  useEffect(() => catalogRef.current.scrollIntoView(false), []);
  return (
    <div className="catalog__container" ref={catalogRef}>
      <SideBar />
      <Outlet />
    </div>
  );
}
