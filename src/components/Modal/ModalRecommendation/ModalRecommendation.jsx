import { useEffect, useRef, useState } from 'react';
import './ModalRecommendation.css';
import { Input, Modal } from 'components';
import authorApi from 'utils/api/author';
import { useSelector } from 'react-redux';
import { getDraft } from 'store/selectors';

const baseRegex = /^https:\/\/design-for-all\.net/i;
const fullRegex =
  /^https:\/\/design-for-all\.net\/(en|es|ru|zh)\/[a-z0-9]{32}$/;
const pathRegex = /[a-z]{2}\/[a-z0-9]{32}/;
const baseError = 'Вставьте ссылку с этого сайта';
const fullError = 'Ссылка не является адресом статьи';
const fetchError = 'Статья не существует';
const doubleError = 'Статья уже добавлена';
const langError = 'Нельзя добавить статью на другом языке';

export default function ModalRecommendation({
  isOpen,
  onClose,
  onSave,
  title,
  editId
}) {
  const draft = useSelector(getDraft);
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
    const articlePath = inputValue.match(pathRegex);
    const splitPath = articlePath[0].split('/');
    const isDouble = draft.recommend_from_creator.some(
      (item) => item.uuid === splitPath[1]
    );
    if (isDouble) {
      setError(doubleError);
      return;
    }
    if (splitPath[0] !== draft.lang) {
      setError(langError);
      return;
    }
    setLoading(true);
    authorApi
      .checkRecommend(splitPath[0], splitPath[1])
      .then(({ image, title }) => {
        recommendRef.current = { image, title, uuid: splitPath[1] };
      })
      .catch(() => setError(fetchError))
      .finally(() => setLoading(false));
  }, [inputValue, error, draft]);

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
    let recommends;
    if (editId) {
      recommends = draft.recommend_from_creator.map(item => {
        if (item.uuid === editId) return recommendRef.current;
        return item;
      });
    } else recommends = [...draft.recommend_from_creator, recommendRef.current];
    onSave('recommend_from_creator', recommends);
    handleClose();
  }

  function handleClose() {
    recommendRef.current = null;
    setInputValue('');
    setError('');
    onClose();
  }

  return (
    <Modal
      title={title}
      onClose={handleClose}
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
