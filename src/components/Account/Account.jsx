import './Account.css';
import { User } from 'components';

export default function Account({ children, navBar }) {
  return (
    <div className="account__container">
      <div className="account__author-and-navbar">
        <User />
        {navBar}
      </div>
      {children}
    </div>
  );
}
