import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
import loupe from '../../images/loupe-icon.svg';
import list from '../../images/list-icon.svg';
import flag from '../../images/flag-icon.svg';
import dollar from '../../images/dollar-icon.svg';
import account from '../../images/account-icon.svg';
import { NavLink } from 'react-router-dom';
import DropdownNavigation from '../DropdownNavigation/DropdownNavigation';
import { accountNavigationList, navigationOptionsList } from '../../utils/constants';
import dropdownIconWhite from '../../images/navigation/dropdown-icon-white.svg';

export default function Header() {
	return (
		<header className="header">
			<div className="header__container">
				<a href="/">
					<img src={logo} alt="Логотип" className="header__logo" />
				</a>
				<ul className="header__icons-container">
					<li>
						<button className="header__icon-background">
							<img src={loupe} alt="Иконка лупы" className="header__icon" />
						</button>
					</li>
					<li >
						<DropdownNavigation options={navigationOptionsList} titleIcon={dropdownIconWhite}/>
					</li>
					<li>
						<button className="header__icon-background">
							<img src={flag} alt="Иконка флага" className="header__icon" />
						</button>
					</li>
					<li>
						<button className="header__icon-background">
							<img src={dollar} alt="Иконка доллара" className="header__icon" />
						</button>
					</li>
					<li>
						<DropdownNavigation options={accountNavigationList} titleIcon={account}/>
						{/* <NavLink to="/author/articles">
							<button className="header__icon-background">
								<img
									src={account}
									alt="Иконка аккаунта"
									className="header__icon"
								/>
							</button>
						</NavLink> */}
					</li>
				</ul>
			</div>
		</header>
	);
}
