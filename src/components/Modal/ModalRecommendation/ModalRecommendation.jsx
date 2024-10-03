import { useEffect, useRef, useState } from 'react';
import './ModalRecommendation.css';
import { Input, Modal } from 'components';
import authorApi from 'utils/api/author';

const baseRegex = /^https:\/\/design-for-all\.net/i;
const fullRegex =
  /^https:\/\/design-for-all\.net\/(en|es|ru|zh)\/[a-z0-9]{32}$/;
const pathRegex = /[a-z]{2}\/[a-z0-9]{32}/;
const baseError = 'Вставьте ссылку с этого сайта';
const fullError = 'Ссылка не является адресом статьи';
const fetchError = 'Статья не существует';

export default function ModalRecommendation({ isOpen, onClose, onSave, title }) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const recommendRef = useRef(null);
  const comment = loading
    ? 'Проверка статьи...'
    : error
    ? error
    : recommendRef.current
    ? 'Статья существует'
    : 'Введите URL';
  const colorClass = error
    ? ' span-error'
    : recommendRef.current
    ? ' span-success'
    : '';

  useEffect(() => {
    if (!inputValue || error) return;
    setLoading(true);
    const articlePath = inputValue.match(pathRegex);
    const splitPath = articlePath[0].split('/');
    authorApi
      .checkRecommend(splitPath[0], splitPath[1])
      .then(
        ({ image, title }) =>
          (recommendRef.current = { image, title, id: splitPath[1] })
      )
      .catch(() => setError(fetchError))
      .finally(() => setLoading(false));
  }, [inputValue, error]);

  function handleInput({ target }) {
    let error =
      !target.value || fullRegex.test(target.value)
        ? ''
        : baseRegex.test(target.value)
        ? fullError
        : baseError;
    recommendRef.current = null;
    setError(error);
    setInputValue(target.value);
  }

  function addRecommend() {
    onSave('recommend_from_creator', recommendRef.current);
    setInputValue('');
    recommendRef.current = null;
    onClose();
  }

  return (
    <Modal
      title={title}
      onClose={onClose}
      onConfirm={addRecommend}
      isOpen={isOpen}
      twoBtns
      isBlocked={!recommendRef.current}
    >
      <label className="modal-reccomendation__label">
        <span className={'modal-reccomendation__span' + colorClass}>
          {comment}
        </span>
        {isOpen && (
          <Input
            type={'text'}
            value={inputValue}
            placeholder={'Ссылка на статью сайта DFA'}
            onChange={handleInput}
            errors={error}
            loading={loading}
          />
        )}
      </label>
    </Modal>
  );
}
