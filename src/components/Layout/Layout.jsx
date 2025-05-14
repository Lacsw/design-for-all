import { Header, Footer } from 'components';
import './Layout.css';

export default function Layout({ children }) {
  return (
    <div className="page">
      <Header />
      <div className="main-wrapper">
        <main className="main">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
