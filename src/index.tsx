// TODO: eslint with eslint-plugin-react-hooks
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// dayjs
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import App from 'page/App';
import { store } from 'store';

import 'assets/scss/_index.scss';

// days plugins initialization
dayjs.extend(isSameOrBefore)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);