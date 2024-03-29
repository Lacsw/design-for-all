import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './DropdownNavigation.css';

export default function DropdownNavigation({
	options,
	type,
	titleIcon,
	title,
}) {
	const [selectedOption, setSelectedOption] = useState(options[0]);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

	const handleOptionClick = (option) => {
		const currentOption = options.filter((i) => i.name === option);
		setSelectedOption(...currentOption);
	};

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
				{type === 'dropdownWithLinks' ? (
					<img
						src={titleIcon}
						alt={title}
						className="dropdown-navigation__title-image"
					/>
				) : (
					<img src={selectedOption.src} alt={selectedOption.name} />
				)}
			</div>

			{isDropdownOpen ? (
				<>
					<ul className="dropdown-navigation__menu-list">
						{options.map((option, i) =>
							type === 'dropdownWithLinks' ? (
								<li
									key={i}
									onMouseEnter={() => {
										setIsSideMenuOpen(true);
									}}
								>
									{option.name === 'Свернуть' ? (
										<img
											className={
												isSideMenuOpen
													? 'dropdown-navigation__hide-button'
													: null
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
							) : (
								<li key={i}>
									<img
										className="dropdown-navigation__menu-list-item "
										src={option.src}
										alt={option.name}
										onClick={() => handleOptionClick(option.name)}
									/>
								</li>
							)
						)}
					</ul>

					{isSideMenuOpen ? (
						<ul className="dropdown-navigation__sidebar">
							{options.map((option, i) => (
								<li key={i} className="dropdown-navigation__sidebar-list-item">
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
