import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import './MainNavigationBar.css';
export default function MainNavigationBar({
	navLinksList,
	onClick,
	activeTab,
}) {

	return (
		<ul className="main-navbar">
			{navLinksList.map((icon, i) => (
				<li
					className="main-navbar__item"
					key={i}
					onClick={() => onClick({name: icon.name, index: i})}
				>
					<img src={icon.src} alt={icon.name} className="main-navbar__icon" />
					<NavLink
						href={icon.link}
						className={cn('main-navbar__link main-navbar__link_light', {
							current: activeTab.name === icon.name,
						})}
					>
						Перейти
					</NavLink>
				</li>
			))}
		</ul>
	);
}
