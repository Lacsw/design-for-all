import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { CssBaseline } from '@mui/material';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import GlobalCssPriority from 'styles/mui/GlobalCssPriority';

import './prepare'; // должен идти до импорта App
import './styles/index.css';
import { store, persistor } from 'store';
import { App } from 'components';
import { InteractiveManagerProvider } from 'utils/contexts/InteractiveManagerContext';
import 'utils/modals/appHeaderHandler';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ReduxProvider store={store}>
    <PersistGate persistor={persistor}>
      <I18nextProvider i18n={i18n}>
        <HashRouter>
          <GlobalCssPriority>
            <CssBaseline />
            <InteractiveManagerProvider>
              <App />
            </InteractiveManagerProvider>
          </GlobalCssPriority>
        </HashRouter>
      </I18nextProvider>
    </PersistGate>
  </ReduxProvider>
);
