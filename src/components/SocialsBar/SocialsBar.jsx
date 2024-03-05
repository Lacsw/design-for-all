import { useContext } from 'react';
import './SocialsBar.css';

import { socialIcons } from '../../utils/constants';
import plusBigIcon from '../../images/author/plus-icon.svg';
import { UserContext } from '../../contexts/UserContext';

export default function SocialsBar() {
	const { user } = useContext(UserContext);

	const renderSocialMedia = () => {
		return Object.entries(user.social_media).map(([key, value], index) => (
			<a key={index} href={value} target="_blank" rel="noreferrer">
				<img src={socialIcons[key]} alt="Иконка" className="socials-bar-btn" />
			</a>
		));
	};

	return (
		<div className="socials-bar">
			{renderSocialMedia()}
			<button className="socials-bar-btn">
				<img src={plusBigIcon} alt="Иконка добавить" />
			</button>
		</div>
	);
}
