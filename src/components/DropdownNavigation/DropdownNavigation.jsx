export default function DropdownNavigation({ options, type, title }) {
	// type - navigation, user, lang
	// options - icon, text
	// title - icon

	//state - isOpen, isExpanded

	return (
		<div className="dropdown">
			<ul>
				{options.map((option) => (
					<li>{option.icon}</li>
				))}
			</ul>
			<div className="dropdown-navigation__sidebar">
				<ul>
					{options.map((option) => (
						<li>{option.text}</li>
					))}
				</ul>
			</div>
		</div>
	);
}
