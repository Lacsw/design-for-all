import { Header, SideBar, Footer } from 'components';
import { Outlet } from 'react-router-dom';
import './Catalog.css';

export default function Catalog() {
  return (
    <>
      <Header />
      <div className="catalog__container">
        <SideBar />
        <Outlet />
      </div>
      <Footer />
    </>
  )
}