import { Header, Footer } from 'components';
import './Layout.css';

export default function Layout({ resetSection, children }) {
  return (
    <div className="page">
      <Header resetSection={resetSection} />
      <div className="main-wrapper">
        <main className="main">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
