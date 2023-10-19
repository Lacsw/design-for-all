import './AdminAppNewAuthorNavbar.css';
import publishIcon from '../../../images/account/publish-icon.svg';
import returnIcon from '../../../images/account/logout-icon.svg';
import cancelIcon from '../../../images/account/cancel-icon.svg';
import LinkButton from '../../LinkButton/LinkButton';
import ModalAttention from '../../Modal/ModalAttention/ModalAttention';
import { useState } from 'react';

export default function AdminAppNewAuthorNavbar() {
	const [isOpenModal, setIsOpenModal] = useState(false);

	const handleCancelClick = () => {
		setIsOpenModal(!isOpenModal);
	};

	return (
		<nav className="admin-app-newauthor-navbar">
			<ul className="admin-app-newauthor-navbar__list">
				<li>
					<LinkButton to="/" icon={publishIcon}>
						Опубликовать
					</LinkButton>
				</li>

				<li>
					<LinkButton to="/" icon={cancelIcon}>
						Отклонить
					</LinkButton>
				</li>

				<li>
					<LinkButton to="applications/" icon={returnIcon}>
						Назад к заявкам
					</LinkButton>
				</li>
			</ul>
			<ModalAttention
				isOpen={isOpenModal}
				onClose={handleCancelClick}
				title="Внимание!"
			/>
		</nav>
	);
}
