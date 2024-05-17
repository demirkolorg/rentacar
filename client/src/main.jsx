import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import MainRoutes from './routes';
import { ConfigProvider } from 'antd';

import 'simplebar-react/dist/simplebar.min.css';
import 'flatpickr/dist/themes/light.css';
import '../src/assets/scss/app.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider>
    <BrowserRouter>
      <Provider store={store}>
        <main className="App relative">
          <MainRoutes />
        </main>
      </Provider>
    </BrowserRouter>
  </ConfigProvider>
);
