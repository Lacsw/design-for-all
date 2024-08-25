import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './styles/index.css';
import { store, persistor } from 'store';
import { App } from 'components';
import { CssBaseline } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ReduxProvider store={store}>
    <PersistGate persistor={persistor}>
      <HashRouter>
        <CssBaseline />
        <App />
      </HashRouter>
    </PersistGate>
  </ReduxProvider>
);
