import { Route, Routes } from 'react-router-dom';
import { memo } from 'react';

import './App.css';
import {
  Main,
  Map,
  Articles,
  Guides,
  AccountAuthor,
  AccountAdmin,
  NotFound,
} from 'components';
import Catalog from 'components/Catalog/Catalog';
import CatalogArticle from 'components/Catalog/CatalogArticle';

function App() {
  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/map" element={<Map />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:lang/:articleId" element={<Articles />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/author/*" element={<AccountAuthor />} />

        <Route path="/mobile" element={<Catalog />}>
          <Route index element={<CatalogArticle />} />
          <Route path="/mobile/:lang/:articleId" element={<CatalogArticle />} />
        </Route>

        <Route path="/web" element={<Catalog />}>
          <Route index element={<CatalogArticle />} />
          <Route path="/web/:lang/:articleId" element={<CatalogArticle />} />
        </Route>

        <Route path="/desktop" element={<Catalog />}>
          <Route index element={<CatalogArticle />} />
          <Route path="/desktop/:lang/:articleId" element={<CatalogArticle />} />
        </Route>

        <Route path="/admin/*" element={<AccountAdmin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default memo(App);
