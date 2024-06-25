import './TranslationArticle.css';
import previewImage from 'images/article/preview.png';
import contentImage from 'images/article/content.png';
import smallPreviewImage from 'images/article/smallPreview.png';
import addPictureIcon from 'images/article/addPictureDark.png';
import { langSelectOptions } from 'utils/constants';
import { useEffect, useState } from 'react';
import Select from 'react-select';

export default function TranslationArticle() {
  const [imageOfArticle, setImageOfArticle] = useState(null);

  const languageOptions = langSelectOptions.map((language) => ({
    value: language.value,
    label: language.label,
  }));
  function handleChange(event) {
    event.preventDefault();
    if (event.target.files) {
      setImageOfArticle(event.target.files[0]);
    }
  }

  function handleDrop(event) {
    event.preventDefault();
    if (event.dataTransfer.files) {
      setImageOfArticle(event.dataTransfer.files[0]);
    }
  }
  function handleDrag(event) {
    event.preventDefault();
    handleChange(event);
  }
  function handleDragLeave(event) {
    event.preventDefault();
  }

  useEffect(() => {
    console.log(imageOfArticle);
  }, [imageOfArticle]);

  return (
    <section className="translation-article">
      <div className="translation-article__column">
        <h2 className="translation-article__title">Оригинал статьи</h2>
        <dl className="translation-article__list">
          <div className="">
            <dt className="translation-article__term">Язык</dt>
            <dd className="translation-article__definition translation-article__definition_type_language">
              Русский
            </dd>
          </div>
          <div className="">
            <dt className="translation-article__term">Подкатегория</dt>
            <dd className="translation-article__definition">
              component/active elements/button/flat button
            </dd>
          </div>
          <div className="">
            <dt className="translation-article__term">Картинка статьи</dt>
            <dd className="translation-article__definition translation-article__definition_img">
              <img
                src={previewImage}
                alt="превью"
                className="translation-article__previewImg"
              />
            </dd>
          </div>
          <div className="">
            <dt className="translation-article__term">Заголовок статьи</dt>
            <dd className="translation-article__definition translation-article__definition_title">
              Плоские кнопки какого-то элемента гы
            </dd>
          </div>
          <div className="">
            <dt className="translation-article__term">Контент статьи</dt>
            <dd className="translation-article__definition translation-article__definition_type_content">
              <p className="translation-article__text">
                Создание правильных взаимодействий и стилей для ваших кнопок
                является одной из наиболее важных частей процесса. Каждое
                состояние должно иметь четкие аффордансы, которые отличают его
                от других состояний и окружающего макета, но не должны
                радикально изменять компонент или создавать много визуального
                шума.
              </p>
              <img src={contentImage} alt="контент" />
            </dd>
          </div>
          <div className="">
            <dt className="translation-article__term">
              Рекомендации от авторов
            </dt>
            <dd className="translation-article__definition">
              <ul className="translation-article__recomendations-list">
                <li className="translation-article__recomendation">
                  <img
                    src={smallPreviewImage}
                    alt="превью рекомендации"
                    className="translation-article__recomendation-preview"
                  />
                  <p className="translation-article__recomendation-title">
                    Как замутить крутое превью
                  </p>
                </li>
                <li className="translation-article__recomendation">
                  <img
                    src={smallPreviewImage}
                    alt="превью рекомендации"
                    className="translation-article__recomendation-preview"
                  />
                  <p className="translation-article__recomendation-title">
                    Как замутить крутое превью
                  </p>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
      <div className="translation-article__column">
        <h2 className="translation-article__title">Перевод статьи</h2>
        <dl className="translation-article__list">
          <div className="">
            <dt className="translation-article__term">Язык</dt>
            <dd
              className="translation-article__definition
            translation-article__select-language-section"
            >
              <Select
                options={languageOptions}
                defaultValue={languageOptions[0]}
                unstyled
                classNames={{
                  dropdownIndicator: () =>
                    'translation-article__dropdownIndicator',
                  indicatorSeparator: () =>
                    'translation-article__indicatorSeparator',
                  control: () => 'translation-article__control',
                }}
              />
            </dd>
          </div>
          <div className="">
            <dt className="translation-article__term">Подкатегория</dt>
            <dd className="translation-article__definition"></dd>
          </div>
          <div className="">
            <dt className="translation-article__term">Картинка статьи</dt>
            <dd
              className="translation-article__definition translation-article__definition_type_add-picture"
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {imageOfArticle !== null ? (
                <img
                  src={URL.createObjectURL(imageOfArticle)}
                  alt="превью"
                  className="translation-article__previewImg"
                />
              ) : (
                <label className="translation-article__add-picture-label">
                  <img src={addPictureIcon} alt="добавить картинку" />
                  <input
                    type="file"
                    className="translation-article__add-picture-input"
                    onChange={handleChange}
                  />
                </label>
              )}
            </dd>
          </div>
          <div className="">
            <dt className="translation-article__term">Заголовок статьи</dt>
            <dd className="translation-article__definition"></dd>
          </div>
          <div className="">
            <dt className="translation-article__term">Контент статьи</dt>
            <dd className="translation-article__definition"></dd>
          </div>
          <div className="">
            <dt className="translation-article__term">
              Рекомендации от авторов
            </dt>
            <dd className="translation-article__definition"></dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
