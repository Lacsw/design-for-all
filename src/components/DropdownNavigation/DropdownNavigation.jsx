import { useState } from 'react';
import './DropdownNavigation.css';
import { NavLink } from 'react-router-dom';

export default function DropdownNavigation({ options, titleIcon, title }) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

	return (
		<div
			className="dropdown-navigation"
			onMouseEnter={() => setIsDropdownOpen(true)}
			onMouseLeave={() => {
				setIsDropdownOpen(false);
				setIsSideMenuOpen(false);
			}}
		>
			<div className="dropdown-navigation__title-icon-white">
				<img src={titleIcon} alt={title} />
			</div>

			{isDropdownOpen ? (
				<>
					<ul className="dropdown-navigation__menu-list">
						{options.map((option) => (
							<li onMouseEnter={() => setIsSideMenuOpen(true)}>
								{option.name === 'Свернуть' ? (
									<img
										className={
											isSideMenuOpen ? 'dropdown-navigation__hide-button' : null
										}
										src={option.src}
										alt={option.name}
										onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
									/>
								) : (
									<NavLink to={option.link}>
										<img src={option.src} alt={option.name} />
									</NavLink>
								)}
							</li>
						))}
					</ul>

					{isSideMenuOpen ? (
						<ul
							onMouseLeave={() => setIsSideMenuOpen(false)}
							className="dropdown-navigation__sidebar"
						>
							{options.map((option) => (
								<li className="dropdown-navigation__sidebar-list-item">
									{option.name}
								</li>
							))}
						</ul>
					) : null}
				</>
			) : null}
		</div>
	);
}
