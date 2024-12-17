import { Navigate, useLocation } from 'react-router-dom';
import AccountsDecision from './AccountsDecision';
import ArticlesDecision from './ArticlesDecision';
import { adminHash } from 'utils/constants';
import { getOneRequest } from 'utils/api/admin';
import { useEffect, useState } from 'react';
import formatRecommends from 'utils/helpers/formatRecommends';
import './Decisions.css';

const Decisions = () => {
  const { state, hash } = useLocation();
  const [loading, setLoading] = useState(true);
  const [resData, setResData] = useState(null);
  const columnsClass = resData?.offered_update ? ' decision-box_two' : '';
  const endPoint =
    hash === adminHash.accountsD
      ? 'statement_author_account'
      : hash === adminHash.createsD
      ? 'create_p'
      : 'update_p';

  useEffect(() => {
    if (!state) {
      setLoading(false);
      return;
    }
    getOneRequest(endPoint, state.uuid)
      .then((data) => {
        if (state.type === 'created_account') return data;
        return formatRecommends(data);
      })
      .then(setResData)
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [state, endPoint]);
  
  if (loading) return <span className="preloader_fixed" />;

  return state ? (
    <div className={'decision-box' + columnsClass}>
      {state.type === 'created_account' ? (
        <AccountsDecision info={resData} uuid={state.uuid} />
      ) : (
        <ArticlesDecision info={resData} />
      )}
    </div>
  ) : (
    <Navigate to="/#/admin/creates" />
  );
};

export default Decisions;
