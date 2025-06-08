import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

import {
  NotFoundArticle,
  ArticleHeader,
  AuthorAndReviewers,
  Recommendations,
  RichTextEditor,
  ArticleNavigator,
  ImageWithFallback,
} from 'components';

import {
  fetchArticle,
  selectArticle,
  selectError,
  selectLoading,
} from 'store/slices/article';
import { getLanguage } from 'store/slices/user';

import { useInteractiveManager } from 'utils/contexts/InteractiveManagerContext';
import { useIsMobile } from 'utils/hooks/useIsMobile';
import { CATALOG } from 'utils/translationKeys';
import tutorialRu from 'videos/tutorial_ru.mp4';
import tutorialEn from 'videos/tutorial_en.mp4';
import tutorialEs from 'videos/tutorial_es.mp4';
import tutorialZh from 'videos/tutorial_zh.mp4';

import './CatalogArticle.css';
import './withNavigator.css';
import { useArticleNavigator } from './hooks/useArtNavigator';
import {
  artNavSlotProps,
  scrollableElParams,
  targetHeadings,
} from './constants';

const stub = `<p>
      Рецепт пельменного теста с горячей водой и растительным маслом. Вам очень
      понравится работать с этим тестом, оно очень эластичное, не рвётся, не
      разваривается, хорошо лепится и прекрасно переносит заморозку. Чтобы
      сделать сочнее фарш для начинки, не бойтесь добавлять в него немного воды.
      Я ещё добавляю немножко сала, если мясо постное. Пельмени получаются очень
      вкусными и сочными.
    </p>`;

const h3_rte = `
<h1>Домашние пельмени</h1>
${stub}
${stub}
${stub}
${stub}
<h2>Домашние пельмени 2</h2>
${stub}
${stub}
${stub}
${stub}
${stub}
${stub}
<h2>Домашние пельмени 3</h2>
${stub}
${stub}
${stub}
${stub}
${stub}
${stub}
${stub}
${stub}
${stub}
`;

const PELMENI = `
  <h1
      class="rte__node rte__node_heading"
      data-sub-headers-1="Домашние пельмени"
      style="text-align: start"
    >
      <strong>Домашние пельмени</strong>
    </h1>
    <imagecustom
      src="https://img1.russianfood.com/dycontent/images_upl/361/sm_360017.jpg"
      class="rte__node rte__node_img justify"
    ></imagecustom>
    <p>
      Рецепт пельменного теста с горячей водой и растительным маслом. Вам очень
      понравится работать с этим тестом, оно очень эластичное, не рвётся, не
      разваривается, хорошо лепится и прекрасно переносит заморозку. Чтобы
      сделать сочнее фарш для начинки, не бойтесь добавлять в него немного воды.
      Я ещё добавляю немножко сала, если мясо постное. Пельмени получаются очень
      вкусными и сочными.
    </p>


    <h2 class="rte__node rte__node_heading" data-sub-headers-2="Продукты">
      <strong>Продукты</strong>
    </h2>


    <p>
      Мука пшеничная просеянная - 500 г + для работы с тестомВода горячая (70-75
      градусов) - 250 млЯйцо (небольшое) - 1 шт.Соль - 1 ч. ложка без горкиМасло
      растительное без запаха - 25 мл*Для начинки:Мясо (говядина и свинина) -
      550 гЛук репчатый - 200 гСало (по желанию, если мясо постное) - 30 гВода -
      70-80 г (по консистенции фарша)Соль - 1 ч. ложка без горкиПерец чёрный
      молотый - по вкусу*Для варки:Лист лавровый - по вкусуСоль - по вкусуПерец
      чёрный горошком - по вкусуЛук репчатый - 1/4 шт.*Для подачи:Масло
      сливочное - по вкусу
    </p>


    <h2 class="rte__node rte__node_heading" data-sub-headers-2="Видео рецепт">
      <strong>Видео рецепт</strong>
    </h2>


    <p>Домашние пельмени</p>


    <h2
      class="rte__node rte__node_heading"
      data-sub-headers-2="Пошаговый фото рецепт"
    >
      <strong>Пошаговый фото рецепт</strong>
    </h2>


    <h3 class="rte__node rte__node_heading" data-sub-headers-3="ПЕРВЫЙ">
      <strong>ПЕРВЫЙ заголовок</strong>
    </h3>


    <imagecustom
      src="https://img1.russianfood.com/dycontent/images_upl/361/sm_360246.jpg"
      class="rte__node rte__node_img center"
    ></imagecustom>
    <p>
      В муку добавляем соль, яйцо и растительное масло. Слегка перемешиваем.
    </p>


                                        <h3 class="rte__node rte__node_heading" data-sub-headers-3="ВТОРОЙ">
                                          <strong>ВТОРОЙ заголовок</strong>
                                        </h3>


    <imagecustom
      src="https://img1.russianfood.com/dycontent/images_upl/361/sm_360247.jpg"
      class="rte__node rte__node_img center"
    ></imagecustom>
    <p>
      Сдвигаем яйцо немного к краю миски, чтобы оно не сварилось. Заливаем муку
      горячей водой (температура 70-75 градусов), постоянно перемешивая ложкой.
    </p>



                                      <h3 class="rte__node rte__node_heading" data-sub-headers-3="ТРЕТИЙ">
                                        <strong>ТРЕТИЙ заголовок</strong>
                                      </h3>



    <imagecustom
      src="https://img1.russianfood.com/dycontent/images_upl/361/sm_360248.jpg"
      class="rte__node rte__node_img center"
    ></imagecustom>
    <p>
      Затем замешиваем тесто руками. Если останутся небольшие вкрапления
      сварившегося желтка - ничего страшного, они разойдутся при вымешивании
      теста.<br />Вымешиваем тесто примерно 7 минут, пока оно полностью не
      остынет.
    </p>
    <imagecustom
      src="https://img1.russianfood.com/dycontent/images_upl/361/sm_360021.jpg"
      class="rte__node rte__node_img center"
    ></imagecustom>
    <p>
      Тесто не липнет ни к рукам, ни к поверхности, поэтому дополнительно муку
      можно не добавлять.
    </p>
    <h3 class="rte__node rte__node_heading" data-sub-headers-3="ЧЕТВЕРТЫЙ">
      !!! !!! ЧЕТВЕРТЫЙ заголовок
    </h3>
    <p><br />Накрываем тесто полотенцем и даём ему отдохнуть 20-30 минут.</p>
    <imagecustom
      src="https://img1.russianfood.com/dycontent/images_upl/361/sm_360022.jpg"
      class="rte__node rte__node_img center"
    ></imagecustom>
    <p>
      Готовим начинку. Вес теста - приблизительно 800 г, поэтому и начинки берём
      тоже 800 г.<br />Мясо, сало и лук перемалываем с помощью мясорубки. (Можно
      взять уже готовый фарш и смешать с измельчённым луком.)<br />Фарш солим и
      перчим. Добавляем немного воды, чтобы фарш был слегка жидковатым.
      Перемешиваем.
    </p>
    <imagecustom
      src="https://img1.russianfood.com/dycontent/images_upl/361/sm_360281.jpg"
      class="rte__node rte__node_img center"
    ></imagecustom>
    <p>
      Берём часть теста весом 120 г, выкладываем на присыпанную мукой
      поверхность и раскатываем по размеру пельменницы. Остальное тесто
      отправляем под полотенце, чтобы оно не засыхало.
    </p>
    <imagecustom
      src="https://img1.russianfood.com/dycontent/images_upl/361/sm_360284.jpg"
      class="rte__node rte__node_img center"
    ></imagecustom>
    <p>
      Хорошо посыпаем мукой верх пельменницы и ту сторону теста, которую будем
      выкладывать на пельменницу, чтобы пельмени хорошо от неё отделялись.
    </p>
    <imagecustom
      src="https://img1.russianfood.com/dycontent/images_upl/361/sm_360302.jpg"
      class="rte__node rte__node_img center"
    ></imagecustom>
    <p>Разравниваем тесто по всей поверхности пельменницы.</p>
    <imagecustom
      src="https://img1.russianfood.com/dycontent/images_upl/361/sm_360024.jpg"
      class="rte__node rte__node_img center"
    ></imagecustom>
    <p>
      Выкладываем фарш в ячейки. Следим, чтобы фарш не попадал на тесто вокруг
      ячеек, таким образом тесто будет хорошо скрепляться и пельмени не
      развалятся.
    </p>
    <imagecustom
      src="https://img1.russianfood.com/dycontent/images_upl/361/sm_360310.jpg"
      class="rte__node rte__node_img center"
    ></imagecustom>
    <p>
      Раскатываем еще одну часть теста (весом 80 г), накрываем пельменницу,
      хорошо прокатываем скалкой.
    </p>
    <imagecustom
      src="https://img1.russianfood.com/dycontent/images_upl/361/sm_360311.jpg"
      class="rte__node rte__node_img center"
    ></imagecustom>
    <p>
      Убираем остатки теста по краям, кладём под полотенце, их можно
      использовать повторно. Вытряхиваем пельмени из пельменницы.
    </p>
    <imagecustom
      src="https://img1.russianfood.com/dycontent/images_upl/361/sm_360025.jpg"
      class="rte__node rte__node_img center"
    ></imagecustom>
    <p>
      Из этого количества теста и фарша получилось 185 пельменей (5 пельменниц).
      Пельмени выкладываем на посыпанную мукой поверхность и замораживаем.
    </p>
    <imagecustom
      src="https://img1.russianfood.com/dycontent/images_upl/361/sm_360312.jpg"
      class="rte__node rte__node_img center"
    ></imagecustom>
    <p>
      Отвариваем пельмени в подсоленной воде с лавровым листом, горошинами
      чёрного перца и луком. Слегка перемешиваем пельмени и варим 2-3 минуты
      после того, как они всплывут. Даже если варить дольше, пельмени не
      разварятся.
    </p>
    <imagecustom
      src="https://img1.russianfood.com/dycontent/images_upl/361/sm_360313.jpg"
      class="rte__node rte__node_img center"
    ></imagecustom>
    <p>Подаём пельмени со сливочным маслом.<br />Приятного аппетита!</p>
    <p><strong>Запомнить и поделиться рецептом с друзьями:</strong></p>
    <ul class="rte__node rte__node_bullet-list">
      <li
        style="
          margin: 2px 4px 0px 0px;
          list-style-type: none;
          font-family: 'YS Text', Arial, sans-serif;
          font-size: 20px;
          line-height: normal;
          padding: 0px;
          display: inline-block;
          vertical-align: top;
        "
        class="ya-share2__item ya-share2__item_service_vkontakte"
      >
        <p></p>
      </li>
      <li
        style="
          margin: 2px 4px 0px 0px;
          list-style-type: none;
          font-family: 'YS Text', Arial, sans-serif;
          font-size: 20px;
          line-height: normal;
          padding: 0px;
          display: inline-block;
          vertical-align: top;
        "
        class="ya-share2__item ya-share2__item_service_odnoklassniki"
      >
        <p></p>
      </li>
      <li
        style="
          margin: 2px 4px 0px 0px;
          list-style-type: none;
          font-family: 'YS Text', Arial, sans-serif;
          font-size: 20px;
          line-height: normal;
          padding: 0px;
          display: inline-block;
          vertical-align: top;
        "
        class="ya-share2__item ya-share2__item_service_pinterest"
      >
        <p></p>
      </li>
      <li
        style="
          margin: 2px 4px 0px 0px;
          list-style-type: none;
          font-family: 'YS Text', Arial, sans-serif;
          font-size: 20px;
          line-height: normal;
          padding: 0px;
          display: inline-block;
          vertical-align: top;
        "
        class="ya-share2__item ya-share2__item_service_telegram"
      >
        <p></p>
      </li>
      <li
        style="
          margin: 2px 4px 0px 0px;
          list-style-type: none;
          font-family: 'YS Text', Arial, sans-serif;
          font-size: 20px;
          line-height: normal;
          padding: 0px;
          display: inline-block;
          vertical-align: top;
        "
        class="ya-share2__item ya-share2__item_service_twitter"
      >
        <p></p>
      </li>
      <li
        style="
          margin: 2px 4px 0px 0px;
          list-style-type: none;
          font-family: 'YS Text', Arial, sans-serif;
          font-size: 20px;
          line-height: normal;
          padding: 0px;
          display: inline-block;
          vertical-align: top;
        "
        class="ya-share2__item ya-share2__item_service_viber"
      >
        <p></p>
      </li>
      <li
        style="
          margin: 2px 4px 0px 0px;
          list-style-type: none;
          font-family: 'YS Text', Arial, sans-serif;
          font-size: 20px;
          line-height: normal;
          padding: 0px;
          display: inline-block;
          vertical-align: top;
        "
        class="ya-share2__item ya-share2__item_service_whatsapp"
      >
        <p></p>
      </li>
      <li
        style="
          margin: 2px 4px 0px 0px;
          list-style-type: none;
          font-family: 'YS Text', Arial, sans-serif;
          font-size: 20px;
          line-height: normal;
          padding: 0px;
          display: inline-block;
          vertical-align: top;
        "
        class="ya-share2__item ya-share2__item_service_moimir"
      >
        <p></p>
      </li>
      <li
        style="
          margin: 2px 4px 0px 0px;
          list-style-type: none;
          font-family: 'YS Text', Arial, sans-serif;
          font-size: 20px;
          line-height: normal;
          padding: 0px;
          display: inline-block;
          vertical-align: top;
        "
        class="ya-share2__item ya-share2__item_service_skype"
      >
        <p></p>
      </li>
      <li
        style="
          margin: 2px 4px 0px 0px;
          list-style-type: none;
          font-family: 'YS Text', Arial, sans-serif;
          font-size: 20px;
          line-height: normal;
          padding: 0px;
          display: inline-block;
          vertical-align: top;
        "
        class="ya-share2__item ya-share2__item_service_lj"
      >
        <p></p>
      </li>
      <li
        style="
          margin: 2px 0px 0px;
          list-style-type: none;
          font-family: 'YS Text', Arial, sans-serif;
          font-size: 20px;
          line-height: normal;
          padding: 0px;
          display: inline-block;
          vertical-align: top;
        "
        class="ya-share2__item ya-share2__item_service_blogger"
      >
        <p></p>
      </li>
    </ul>
    <p>
      <a
        target="_blank"
        rel="noopener noreferrer"
        class="link_type_in-text rte__mark rte__mark_link"
        href="https://www.russianfood.com/users/register.php?backurl=%2Fusers%2Fbookmark.php%3Fadd%3D1%26c_id%3D152967%26c_type_id%3D1"
        ><strong>Добавить в мою записную книжку</strong></a
      >
    </p>
    <p>Сказать автору<br />СПАСИБО!</p>
    <p>Нет...</p>
    <p>Рецепт: Домашние пельмени. Как приготовить Домашние пельмени?</p>
`;

const ARTICLE = (a) => ({
  languages: ['ru'],
  author: {
    uuid: '51c3b007648f8d39282499aef607ab1c',
    avatar:
      'https://i.pinimg.com/736x/70/61/09/7061092431d84ca86605bb67a7598742.jpg',
    fio: 'No no name',
    social_media: {
      phone: '+84729182376',
      email: 'HFSDGJSHD@UHDFSG.CHD',
      default: 'https://vk.ru',
      instagram: 'https://www.instagram.com/',
      facebook: 'https://www.facebook.com/',
      pinterest: 'https://ru.pinterest.com/',
      x: 'https://x.com/',
      vk: 'https://vk.com/',
    },
  },
  recommend: [],
  publication: {
    main_category: 'веб',
    title: 'My first pumba',
    description: a,
    date_create: 1742666937,
    last_update: 1742666937,
    image:
      'https://avatars.mds.yandex.net/i?id=43f1a029d98aef8cb0091dba04947086_l-5292126-images-thumbs&n=27&h=480&w=480',
    sub_category: '/test',
    views: 0,
    likes: 0,
  },
  reviews: [],
});

const tutorialVideos = {
  ru: tutorialRu,
  en: tutorialEn,
  es: tutorialEs,
  zh: tutorialZh,
};

export default function CatalogArticle() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { lang, articleId } = useParams();

  const language = useSelector(getLanguage);
  // const article = useSelector(selectArticle);
  const article = ARTICLE(PELMENI);
  // const error = useSelector(selectError);
  const error = false;
  // const loading = useSelector(selectLoading);
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 500);

  const articleRef = useRef(null);
  const editorContainerRef =
    /** @type {React.RefObject<HTMLDivElement | null>} */ (useRef(null));

  const { openComponent } = useInteractiveManager();
  const isMobile = useIsMobile();

  const needToFetch = Boolean(lang && articleId && articleId !== 'no-article');
  const isBlank = !lang;
  const isError = Boolean(error || articleId === 'no-article');

  const handleTreeSearch = () => {
    if (isMobile) {
      openComponent('mobileSidebar', { activateSearch: true });
    } else {
      openComponent('treeSearch');
    }
  };

  const handleHeaderSearch = () => {
    openComponent('headerSearch');
  };

  const {
    navigatorFlag,
    headerElRef,
    handleEditorUpdate,
    handleEditorCreation,
  } = useArticleNavigator({ editorContainerRef });

  // useEffect(() => document.querySelector('.main-wrapper').scrollTo(0, 0)); // зачем?

  useEffect(() => {
    if (!needToFetch) return;
    dispatch(fetchArticle({ lang, articleId }));
  }, [lang, articleId, needToFetch, dispatch]);

  return isBlank ? (
    <div className="blank">
      <p className="blank__text">
        <Trans
          i18nKey={CATALOG.ARTICLE.BLANK.SEARCH_TREE}
          components={{
            tree: <button className="blank__link" onClick={handleTreeSearch} />,
            header: (
              <button className="blank__link" onClick={handleHeaderSearch} />
            ),
          }}
        />
      </p>
      <video
        key={language}
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        width="100%"
        height="auto"
        style={{ maxWidth: '800px', margin: '0 auto', display: 'block' }}
      >
        <source src={tutorialVideos[language] || tutorialRu} type="video/mp4" />
      </video>
    </div>
  ) : isError ? (
    <NotFoundArticle />
  ) : loading ? (
    <div className="blank">
      <span className="preloader" />
    </div>
  ) : (
    <>
      <div className="article">
        <ArticleHeader
          title={article.publication.title}
          timeCreate={article?.publication.date_create}
          timeUpdate={article?.publication.last_update}
        />

        <div ref={articleRef} className="article__main">
          <ImageWithFallback
            src={article.publication.image}
            alt={t(CATALOG.ARTICLE.IMAGE.ALT)}
            className="article__image"
            fallbackClassName="article__image-placeholder"
            fallbackAlt={t(CATALOG.ARTICLE.IMAGE.FALLBACK_ALT)}
          />

          <div className="article__editor-container" ref={editorContainerRef}>
            <ArticleNavigator
              flag={navigatorFlag}
              // parentSelector="body"
              targetRef={articleRef}
              targetSelector=".tiptap.ProseMirror"
              scrollableElParams={scrollableElParams}
              targetHeadings={targetHeadings}
              firstShowingOffset={0}
              lastShowingOffset={0}
              onOpen={(params) => {
                const header = headerElRef.current;
                if (!header) {
                  return;
                }
                header.style.setProperty('--scroll-w', params.barWidth + 'px');
                header.classList.add('article-navigator_expanded');
              }}
              onClose={(params) => {
                headerElRef.current?.classList.remove(
                  'article-navigator_expanded'
                );
              }}
              slotProps={artNavSlotProps}
            />

            <RichTextEditor
              className="rte__article"
              initialValue={article.publication.description}
              readOnly={true}
              onInput={handleEditorUpdate}
              onRealCreate={handleEditorCreation}
            />
          </div>
        </div>
        <Recommendations list={article.recommend} />
      </div>
      <AuthorAndReviewers />
    </>
  );
}
