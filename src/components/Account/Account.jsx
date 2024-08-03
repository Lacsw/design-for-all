import './Account.css';
import { Author } from 'components';

export default function Account({ children, navBar }) {
  return (
    <div className="account__container">
      <div className="account__author-and-navbar">
        <Author isAuthorAccount={true} />
        {navBar}
      </div>
      {children}
    </div>
  );
}
