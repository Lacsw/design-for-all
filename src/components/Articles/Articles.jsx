import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './Articles.css';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import Article from '../Article/Article';
import AuthorAndReviewers from '../AuthorAndReviewers/AuthorAndReviewers';
import authorApi from '../../utils/api/author';

export default function Articles() {
	const { lang, articleId } = useParams();
	const [article, setArticle] = useState({});

	useEffect(() => {
		authorApi
			.getArticleById({ lang, articleId })
			.then((data) => {
				setArticle(data);
			})
			.catch((err) => console.log('err', err));
	}, [lang, articleId]);

	return (
		<>
			<Header />
			<div className="articles__container">
				<SideBar />
				{false ? (
					<div className="articles__initial">
						<p className="articles__initial-text">
							Воспользуйтесь{' '}
							<strong className="articles__initial-link">
								поиском по дереву
							</strong>{' '}
							или{' '}
							<strong className="articles__initial-link">
								поиском по заголовкам{' '}
							</strong>
							статей
						</p>
					</div>
				) : (
					<Article />
				)}
				<AuthorAndReviewers />
			</div>
		</>
	);
}
