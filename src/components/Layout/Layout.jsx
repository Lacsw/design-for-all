import { Header, Footer } from 'components';
import './Layout.css';
import Snowfall from 'utils/snow/Snowfall';

new Snowfall();

export default function Layout({ resetSection, children }) {
  return (
    <div className="page">
      <Header resetSection={resetSection} />
      <div className="main-wrapper">
        <main className="main">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
