import { getRandomInt } from 'utils/helpers/math';

const _mockedImages = [
  'https://yandex-images.clstorage.net/qtS9G7366/c73361mH6KI/mH6z1XFK1pLCnFa8mHbKQfmRLEjwyHeDre9PZRoEK6Hp9dl_PP2C7ozIjKufW7JfZ8WZtM018iVQjgE65I8m2cr8IZDnWUKDVliS-loiGkcpkDwKNQwlz-NiFOxUivRr4zqSujyvlvmYHBysyQ7pEOPUiekV4O01TFseuS2fpYWa42mKcgPXkgcYlysWNkqY-pyuj7IOJsQtZN0pUgqypakx0n2pKVP6W9sTMkYCqFa2mEHjm-MnfIcRUf4nmunE0GGhDT1K3FxJGVDqET1MVHPT7Uywy-CFLOhYZxmJemtsdB0_5uXc8JlRGv8Hi-icv1SPIVDobT3I0pR_715ugdqpJgZ0RdKTxlaT79e1w5n3WyQFP4UphWomFWnXwPTlpzqdtaWsnfmT1pJzQkgj3v7YxmGaoum0yFma9SIbK8HWqKLFcApXW0zbES-eNk_WNl8vQ3AEaM2o55Gsn8pwqySxH7Amr9p3HdPe-8eEph41WADm2W1vt4xWXDZonqoFnSEgxHvEVhRPndupVTZMUPGbZUd0g6iKb6vRp1dJs2uu9JM6Jm2Y9hvdlPTNjWBcPZQErptvKHvH2F3yJJDlRNdjrE49hZZWR9Ce5lP3RRiy1SeKOc_lTWBunawfhbiv57hQO-LnUn_VlxSzS4CoXPfXhWmfby99gZPU9uSeI86VLCWF-w8SHsqdn2TVew2Q8pjpgbAHrUaqLFUpE8c16Gd9WrMlb5MzE9nZtoiF653xE0BgnK_vNM9Ynv4h0iOA1yugyvCCmJLKXZksVjpCHjVdYsNxwCaM4efWJZ0KvGJrMVJw6adXv5VfXDwIg28dN1BBIRXi4j0DVlc1oNinSBnq5AbyxdvUQdgZr510hZN_Ha9Ddc0iBWQqGq6eAXbjK3Scfy_sWvPRlZu2SoCv0bjfi-OXYqhzABPdd6_Xo08c5mmE84qQ0YeaHObWP0-YNtUvBfAHpMUkZl9mU8',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/0xf09f9984.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/1xf09f9895.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/2xf09f98a9.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/3xf09f9aac.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/4xf09f8cbf.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/5xf09f9ab4e2808de29982efb88f.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/6xf09f90b5.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/7xf09f90b5.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/8xf09f90b5.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/9xf09f90b5.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/10xf09f90b5.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/11xf09f90b5.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/12xf09f90b5.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/13xe29da4.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/14xe29da4.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/15xe29da4.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/16xf09f8f89.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/17xe29895efb88f.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/18xf09f98a0.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/19xf09f92aa.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/20xf09fa5ba.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/21xf09f8d85.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/22xf09fa4a8.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/23xf09f928b.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/24xf09f97a1.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/25xf09f90b0.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/26xf09f8d8c.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/27xf09f9aac.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/28xf09f8d8c.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/29xf09f94ab.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/30xf09f8dba.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/31xf09faa96.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/32xf09fa493.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/33xf09f98b6.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/34xf09f87aff09f87b5.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/35xf09f8eb6.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/36xf09fa790.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/37xf09f98b6.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/38xf09f98b6.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/39xf09f9893.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/40xf09f98b6.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/41xf09fa7a5.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/42xf09f9884.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/43xf09f9183.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/44xf09fa4af.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/45xf09fa5ac.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/46xf09f90b6.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/47xf09f90b6.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/48xf09f90b6.webp',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/49xf09f90b6.webp',
];

const _mockedImages2 = [
  'https://i.ibb.co/GNcPpYP/very-horizontal.png', // очень горизонтальная
  // горизонтальная
  'https://yandex-images.clstorage.net/qtS9G7366/c73361mH6KI/mH6z1XFK1pLCnFa8mHbKQfmRLEjwyHeDre9PZRoEK6Hp9dl_PP2C7ozIjKufW7JfZ8WZtM018iVQjgE65I8m2cr8IZDnWUKDVliS-loiGkcpkDwKNQwlz-NiFOxUivRr4zqSujyvlvmYHBysyQ7pEOPUiekV4O01TFseuS2fpYWa42mKcgPXkgcYlysWNkqY-pyuj7IOJsQtZN0pUgqypakx0n2pKVP6W9sTMkYCqFa2mEHjm-MnfIcRUf4nmunE0GGhDT1K3FxJGVDqET1MVHPT7Uywy-CFLOhYZxmJemtsdB0_5uXc8JlRGv8Hi-icv1SPIVDobT3I0pR_715ugdqpJgZ0RdKTxlaT79e1w5n3WyQFP4UphWomFWnXwPTlpzqdtaWsnfmT1pJzQkgj3v7YxmGaoum0yFma9SIbK8HWqKLFcApXW0zbES-eNk_WNl8vQ3AEaM2o55Gsn8pwqySxH7Amr9p3HdPe-8eEph41WADm2W1vt4xWXDZonqoFnSEgxHvEVhRPndupVTZMUPGbZUd0g6iKb6vRp1dJs2uu9JM6Jm2Y9hvdlPTNjWBcPZQErptvKHvH2F3yJJDlRNdjrE49hZZWR9Ce5lP3RRiy1SeKOc_lTWBunawfhbiv57hQO-LnUn_VlxSzS4CoXPfXhWmfby99gZPU9uSeI86VLCWF-w8SHsqdn2TVew2Q8pjpgbAHrUaqLFUpE8c16Gd9WrMlb5MzE9nZtoiF653xE0BgnK_vNM9Ynv4h0iOA1yugyvCCmJLKXZksVjpCHjVdYsNxwCaM4efWJZ0KvGJrMVJw6adXv5VfXDwIg28dN1BBIRXi4j0DVlc1oNinSBnq5AbyxdvUQdgZr510hZN_Ha9Ddc0iBWQqGq6eAXbjK3Scfy_sWvPRlZu2SoCv0bjfi-OXYqhzABPdd6_Xo08c5mmE84qQ0YeaHObWP0-YNtUvBfAHpMUkZl9mU8',
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/12xf09f90b5.webp', // вертикальная
  'https://i.ibb.co/7drmQw4g/very-vertical.png', // очень вертикальная
  'https://cdn2.combot.org/monkiz3_by_fstikbot/webp/15xe29da4.webp', // квадратная
];

export const stub = () => {
  const arr = _mockedImages2;
  return `<p>
      Рецепт пельменного теста с горячей водой и растительным маслом. Вам очень
      понравится работать с этим тестом, оно очень эластичное, не рвётся, не
      разваривается, хорошо лепится и прекрасно переносит заморозку. Чтобы
      сделать сочнее фарш для начинки, не бойтесь добавлять в него немного воды.
      Я ещё добавляю немножко сала, если мясо постное. Пельмени получаются очень
      вкусными и сочными.
    </p>
    <img src='${arr[getRandomInt(0, arr.length - 1)]}' />`;
};

/** @param {number} count */
export const getMockedArticleContent = (count) => {
  const justText = () => `
    ${stub()}
    ${stub()}
    ${stub()}
    ${stub()}
    ${stub()}
    ${stub()}
    ${stub()}
    ${stub()}
    ${stub()}
    ${stub()}
    ${stub()}
    ${stub()}
    ${stub()}
  `;
  let res = '';
  if (!count) {
    res = justText();
  }
  for (let i = 1; i <= count; i++) {
    res += `\n
    <h3>Заголовок ${i}</h3>
    ${justText()}
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
