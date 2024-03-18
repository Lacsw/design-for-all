import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import './MainNavigationBar.css';
export default function MainNavigationBar({
	navLinksList,
	onClick,
	activeTab,
}) {
	console.log(activeTab);
	return (
		<ul className="main-navbar">
			{navLinksList.map((icon, i) => (
				<li
					className="main-navbar__item"
					key={i}
					onClick={() => onClick(icon.name)}
				>
					<img src={icon.src} alt={icon.name} className="main-navbar__icon" />
					<NavLink
						href={icon.link}
						className={cn('main-navbar__link main-navbar__link_light', {
							current: activeTab === icon.name,
						})}
					>
						Перейти
					</NavLink>
				</li>
			))}
		</ul>
	);
}
