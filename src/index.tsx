// TODO: eslint with eslint-plugin-react-hooks
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'page/App';

import 'assets/scss/_index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);