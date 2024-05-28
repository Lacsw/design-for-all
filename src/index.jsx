import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Providers from 'components/Providers/Providers';
import './styles/index.css';
import { store, persistor } from 'store';
import { App } from 'components';
import { CssBaseline } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ReduxProvider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <Providers>
          <CssBaseline />
          <App />
        </Providers>
      </BrowserRouter>
    </PersistGate>
  </ReduxProvider>
);
