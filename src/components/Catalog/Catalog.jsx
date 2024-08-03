import { Outlet } from 'react-router-dom';
import { SideBar } from 'components';
import './Catalog.css';

export default function Catalog() {
  return (
    <div className="catalog__container">
      <SideBar />
      <Outlet />
    </div>
  );
}
