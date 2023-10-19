import './Profile.css';

import avatar from '../../images/profile-img.png';

import Button from '../Button/Button';
import SocialsBar from '../SocialsBar/SocialsBar';
import InputEditable from '../InputEditable/InputEditable';

export default function Profile() {
	return (
		<section className="profile">
			<div className="profile__container">
				<form className="profile__form" id="profile-form">
					<img src={avatar} alt="Аватар" className="profile__avatar" />

					<fieldset className="profile__fieldset">
						<label className="profile__field">
							<span className="profile__sub-title">Фамилия, имя, отчество</span>
							<InputEditable type={'text'} value={'Иванова Иванка'} />
						</label>

						<div className="profile__field">
							<span className="profile__sub-title">Социальные сети</span>
							<SocialsBar />
						</div>

						<label className="profile__field">
							<span className="profile__sub-title">Логин</span>
							<InputEditable type={'text'} value={'Ivanka_ivanova'} />
						</label>

						<label className="profile__field">
							<span className="profile__sub-title">Пароль</span>
							<InputEditable type={'password'} value={'12345678'} />
						</label>
					</fieldset>
				</form>
				<div className="profile__buttons">
					<Button type={'submit'} relatedForm={'profile-form'}>
						Сохранить
					</Button>
					<Button type={'submit'}>Отменить</Button>
				</div>
			</div>
		</section>
	);
}
