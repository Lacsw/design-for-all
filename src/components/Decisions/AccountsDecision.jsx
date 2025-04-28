import { useDispatch } from 'react-redux';
import { setDecision } from 'store/slices/user';
import './AccountsDecision.css';
import { useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { ADMIN } from 'utils/translationKeys';

const AccountsDecision = ({ info, uuid }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDecision({ uuid }));
  }, [dispatch, uuid]);

  return (
    <section className="decision-account">
      <h2 className="decision-account__title">{t(ADMIN.ACCOUNT_DECISION.TITLE)}</h2>
      <h3 className="decision-account__subtitle">{t(ADMIN.ACCOUNT_DECISION.SUBTITLE)}</h3>
      <div className="decision-account__links-group">
        {info.link_projects.map((link) => {
          let url = link;
          if (!link.startsWith('http')) url = '//' + link;
          return (
            <a
              href={url}
              key={link}
              className="decision-account__link"
              target="_blank"
              rel="noreferrer"
            >
              {link}
            </a>
          );
        })}
      </div>
      <h2 className="decision-account__title">
        {t(ADMIN.ACCOUNT_DECISION.INSTRUCTION_TITLE)}
      </h2>
      <ol className="decision-account__instruction">
        <li>
          <Trans
            i18nKey={ADMIN.ACCOUNT_DECISION.INSTRUCTION_ITEM_1}
            values={{
              link: t(ADMIN.ACCOUNT_DECISION.INSTRUCTION_ITEM_1_LINK)
            }}
            components={{
              u: <u />
            }}
          />
        </li>
        <li>
          {t(ADMIN.ACCOUNT_DECISION.INSTRUCTION_ITEM_2)}
        </li>
        <li>
          {t(ADMIN.ACCOUNT_DECISION.INSTRUCTION_ITEM_3)}
        </li>
        <li>
          {t(ADMIN.ACCOUNT_DECISION.INSTRUCTION_ITEM_4)}
        </li>
        <li>
          {t(ADMIN.ACCOUNT_DECISION.INSTRUCTION_ITEM_5)}
        </li>
        <li>
          {t(ADMIN.ACCOUNT_DECISION.INSTRUCTION_ITEM_6)}
        </li>
        <li>
          {t(ADMIN.ACCOUNT_DECISION.INSTRUCTION_ITEM_7)}
        </li>
      </ol>
    </section>
  );
};

export default AccountsDecision;
