import './SocialsBar.css';

import telegramIcon from '../../images/socials/telegram-icon.svg';
import plusBigIcon from '../../images/plus-big-icon.svg';

export default function SocialsBar() {
	return (
		<div className="socials-bar">
			<button className="socials-bar-btn">
				<img src={telegramIcon} alt="Иконка соцсети" />
			</button>
			<button className="socials-bar-btn">
				<img src={telegramIcon} alt="Иконка соцсети" />
			</button>
			<button className="socials-bar-btn">
				<img src={telegramIcon} alt="Иконка соцсети" />
			</button>
			<button className="socials-bar-btn">
				<img src={telegramIcon} alt="Иконка соцсети" />
			</button>
			<button className="socials-bar-btn">
				<img src={plusBigIcon} alt="Иконка добавить" />
			</button>
		</div>
	);
}
