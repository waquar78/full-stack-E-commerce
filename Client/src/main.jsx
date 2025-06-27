import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './app/store';  // persistor import
import App from './App.jsx';
import { Toaster } from './components/ui/sonner';
import { PersistGate } from 'redux-persist/integration/react';  // PersistGate import

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <Toaster />
      </PersistGate>
    </Provider>
  </StrictMode>
);
