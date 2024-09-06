import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { SideBar } from 'components';
import './Catalog.css';

export default function Catalog() {
  const catalogRef = useRef();
  useEffect(() => document.querySelector('.main-wrapper').scrollTo(0, 0));
  return (
    <div className="catalog__container" ref={catalogRef}>
      <SideBar />
      <Outlet />
    </div>
  );
}
