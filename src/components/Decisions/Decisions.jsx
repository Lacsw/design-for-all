import { Navigate, useLocation } from 'react-router-dom';
import AccountsDecision from './AccountsDecision';
import UpdatesDecision from './UpdatesDecision';
import CreatesDecision from './CreatesDecision';
import { adminHash } from 'utils/constants';
import { getOneRequest } from 'utils/api/admin';
import { useEffect, useState } from 'react';
import './Decisions.css';

const Decisions = () => {
  const { state, hash } = useLocation();
  const [loading, setLoading] = useState(true);
  const [resData, setResData] = useState(null);
  const columnsClass = hash.includes('updates') ? ' decision-box_two' : '';
  const endPoint =
    hash === adminHash.accountsD
      ? 'statement_author_account'
      : hash === adminHash.createsD
      ? 'create_p'
      : 'update_p';

  useEffect(() => {
    if (!state || hash !== adminHash.accountsD) {
      setLoading(false);
      return;
    }
    getOneRequest(endPoint, state.uuid)
      .then(setResData)
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [state, endPoint]);

  if (loading) return <span className="preloader_fixed" />; 

  return state ? (
    <div className={'decision-box' + columnsClass}>
      {state.type === 'created' && <CreatesDecision info={resData} />}
      {state.type === 'updated' && <UpdatesDecision info={resData} />}
      {state.type === 'created_lang' && <UpdatesDecision info={resData} />}
      {state.type === 'created_account' && <AccountsDecision info={resData} uuid={state.uuid} />}
    </div>
  ) : (
    <Navigate to="/#/admin/creates" />
  );
};

export default Decisions;
