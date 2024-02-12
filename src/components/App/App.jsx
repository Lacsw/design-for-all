import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Main from '../Main/Main';
import Map from '../Map/Map';
import Articles from '../Articles/Articles';
import Guides from '../Guides/Guides';
import AccountAuthor from '../AccountAuthor/AccountAuthor';
import AccountAdmin from '../AccountAdmin/AccountAdmin';
import authApi from '../../utils/api/auth';
import authorApi from '../../utils/api/author';
import { UserContext } from '../../contexts/UserContext';

export default function App() {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  // 	authApi
  // 		.loginAuthor()
  // 		.then(() => {})
  // 		.catch((err) => {
  // 			authorApi.profileAuthor().then((user) => {
  // 				setUser(user.success);
  // 			});
  // 			console.log(err);
  // 		});
  // }, []);

  return (
    <UserContext.Provider value={user}>
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
    </UserContext.Provider>
  );
}
