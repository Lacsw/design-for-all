import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
import loupe from '../../images/loupe-icon.svg';
import account from '../../images/account-icon.svg';
import DropdownNavigation from '../DropdownNavigation/DropdownNavigation';
import {
	accountNavigationList,
	navigationOptionsList,
	languageList,
	currencyList,
} from '../../utils/constants';
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
					<li>
						<DropdownNavigation
							options={navigationOptionsList}
							titleIcon={dropdownIconWhite}
							type="dropdownWithLinks"
							title="Меню"
						/>
					</li>
					<li>
						<DropdownNavigation options={languageList} title="Язык" />
					</li>
					<li>
						<DropdownNavigation options={currencyList} title="Валюта" />
					</li>
					<li>
						<DropdownNavigation
							options={accountNavigationList}
							titleIcon={account}
							type="dropdownWithLinks"
							title="Профиль"
						/>
					</li>
				</ul>
			</div>
		</header>
	);
}
