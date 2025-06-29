export const stub = `<p>
      Рецепт пельменного теста с горячей водой и растительным маслом. Вам очень
      понравится работать с этим тестом, оно очень эластичное, не рвётся, не
      разваривается, хорошо лепится и прекрасно переносит заморозку. Чтобы
      сделать сочнее фарш для начинки, не бойтесь добавлять в него немного воды.
      Я ещё добавляю немножко сала, если мясо постное. Пельмени получаются очень
      вкусными и сочными.
    </p>`;

/** @param {number} count */
export const getMockedArticleContent = (count) => {
  const justText = `
    ${stub}
    ${stub}
    ${stub}
    ${stub}
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
  let res = '';
  if (!count) {
    res = justText;
  }
  for (let i = 1; i <= count; i++) {
    res += `\n
    <h3>Заголовок ${i}</h3>
    ${justText}
    `;
  }
  return res;
};

export const PELMENI = `
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
                                          <strong>ВТОРОЙ заголовок ооооооченьдлинныйизачем-товоднословопсихикакиетопридумализачемпостояннонаэтопроверятьверсткубожечелНувцеломладноужепривычно</strong>
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
                                        <strong>ТРЕТИЙ заголовок очень длинный но пробелы хотя бы есть хах Получается, когда страница зависает, браузер просто не успевает достаточно быстро пройти шаги 1-3. Если при анимации будем двигать только сам элемент, то браузер пропускает первые 2 шага и сразу перейдет к композиции. Подберем свойства, которые: </strong>
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

export const ARTICLE = (content) => ({
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
    description: content,
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
