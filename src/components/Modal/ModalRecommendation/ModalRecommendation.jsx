import { useEffect, useRef, useState } from 'react';
import './ModalRecommendation.css';
import { Input, Modal } from 'components';
import authorApi from 'utils/api/author';
import { useSelector } from 'react-redux';
import { getDraft } from 'store/slices/user';
import { domain } from 'utils/config';
import { useTranslation } from 'react-i18next';
import { CREATION } from 'utils/translationKeys';

const dfaUrl = new URL(domain);
const hostname = dfaUrl.hostname; // "dev.design-for-all.net" или "design-for-all.net"

export const baseRegex = new RegExp(`^https:\\/\\/${hostname}`, 'i');
export const fullRegex = new RegExp(
  `^https:\\/\\/${hostname}\\/(en|es|ru|zh)\\/[a-z0-9]{32}$`
);
const pathRegex = /[a-z]{2}\/[a-z0-9]{32}/;

const ERROR_KEYS = {
  BASE: CREATION.RECOMMENDATION.BASE_ERROR,
  FULL: CREATION.RECOMMENDATION.FULL_ERROR,
  FETCH: CREATION.RECOMMENDATION.FETCH_ERROR,
  DOUBLE: CREATION.RECOMMENDATION.DOUBLE_ERROR,
  LANG: CREATION.RECOMMENDATION.LANG_ERROR,
  SELF: CREATION.RECOMMENDATION.SELF_ERROR,
  CHECKING: CREATION.RECOMMENDATION.CHECKING,
  EXISTS: CREATION.RECOMMENDATION.EXISTS,
  ENTER_URL: CREATION.RECOMMENDATION.ENTER_URL,
  PLACEHOLDER: CREATION.RECOMMENDATION.PLACEHOLDER
};

export default function ModalRecommendation({
  isOpen,
  onClose,
  onSave,
  title,
  editId,
}) {
  const { t } = useTranslation();
  const draft = useSelector(getDraft);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const recommendRef = useRef(null);

  const comment = loading
    ? t(ERROR_KEYS.CHECKING)
    : error
    ? error
    : recommendRef.current
    ? t(ERROR_KEYS.EXISTS)
    : t(ERROR_KEYS.ENTER_URL);
    
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
      setError(t(ERROR_KEYS.DOUBLE));
      return;
    }
    if (splitPath[0] !== draft.lang) {
      setError(t(ERROR_KEYS.LANG));
      return;
    }
    if (splitPath[1] === draft.what_update) {
      setError(t(ERROR_KEYS.SELF));
      return;
    }
    setLoading(true);
    authorApi
      .checkRecommend(splitPath[0], splitPath[1])
      .then(({ image, title }) => {
        recommendRef.current = { image, title, uuid: splitPath[1] };
      })
      .catch(() => setError(t(ERROR_KEYS.FETCH)))
      .finally(() => setLoading(false));
  }, [inputValue, error, draft, t]);

  function handleInput({ target }) {
    let error =
      !target.value || fullRegex.test(target.value)
        ? ''
        : baseRegex.test(target.value)
        ? t(ERROR_KEYS.FULL)
        : t(ERROR_KEYS.BASE);
    recommendRef.current = null;
    setError(error);
    setInputValue(target.value);
  }

  function addRecommend() {
    let recommends;
    if (editId) {
      recommends = draft.recommend_from_creator.map((item) => {
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
            placeholder={t(ERROR_KEYS.PLACEHOLDER)}
            onChange={handleInput}
            errors={error}
            disabled={loading}
          />
        )}
      </label>
    </Modal>
  );
}
