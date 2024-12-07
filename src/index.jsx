import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { CssBaseline } from '@mui/material';
import GlobalCssPriority from 'styles/mui/GlobalCssPriority';

import './styles/index.css';
import { store, persistor } from 'store';
import { App } from 'components';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ReduxProvider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <GlobalCssPriority>
          <CssBaseline />
          <App />
        </GlobalCssPriority>
      </BrowserRouter>
    </PersistGate>
  </ReduxProvider>
);
