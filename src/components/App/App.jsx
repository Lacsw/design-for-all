import { Route, Routes } from 'react-router-dom';

import './App.css';
import {
  Main,
  Map,
  Articles,
  Guides,
  AccountAuthor,
  AccountAdmin,
} from 'components';

export default function App() {
  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/map" element={<Map />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:lang/:articleId" element={<Articles />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/author/*" element={<AccountAuthor />} />
        <Route path="/admin/*" element={<AccountAdmin />} />
      </Routes>
    </div>
  );
}
