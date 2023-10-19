import React from 'react';
import './Reviewers.css';
import avatar from '../../images/reviewers/avatar.svg';
import { Link } from 'react-router-dom';

export default function Reviewers() {
	const reviewers = false;
	return (
		<div className="reviewers">
			<p className="reviewers__title">Рецензенты</p>
			{reviewers ? (
				<>
					<div className="reviewers__icon-container">
						<img src={avatar} alt="" />
						<img src={avatar} alt="" />
						<img src={avatar} alt="" />
						<img src={avatar} alt="" />
						<img src={avatar} alt="" />
						<img src={avatar} alt="" />
						<img src={avatar} alt="" />
						<img src={avatar} alt="" />
					</div>
					<p className="reviewers__see-more">Показать всех</p>{' '}
				</>
			) : (
				<p className="reviewers__text">
					<Link href="/" className="reviewers__text-link">
						Предложите правки
					</Link>
					, чтобы стать рецензентом
				</p>
			)}
		</div>
	);
}
