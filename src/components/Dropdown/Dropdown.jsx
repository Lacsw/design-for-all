import { useState } from 'react';
import './Dropdown.css';

import arrow from '../../images/author/arrow.svg';
import largeArrow from '../../images/admin/arrow-large.svg';

export default function Dropdown({ id, name, options, title, large }) {
	const [selectedOption, setSelectedOption] = useState(title);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleOptionClick = (option) => {
		setSelectedOption(option);
		setIsDropdownOpen(false);
	};

	return (
		<div
			className={`dropdown ${large && 'dropdown__large'}`}
			id={id}
			name={name}
			onMouseEnter={() => setIsDropdownOpen(true)}
			onMouseLeave={() => setIsDropdownOpen(false)}
		>
			<div className="dropdown__title">
				{selectedOption}
				<img
					className="dropdown__image"
					src={large ? largeArrow : arrow}
					alt="стрелка"
				/>
			</div>

			{isDropdownOpen && (
				<ul className="dropdown__list">
					{options.map((option) => (
						<li
							key={option.value}
							value={option.value}
							className="dropdown__item"
							onClick={() => handleOptionClick(option.label)}
						>
							{option.label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
