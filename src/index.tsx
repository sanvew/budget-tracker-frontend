// TODO: eslint with eslint-plugin-react-hooks
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createHashRouter, RouterProvider } from 'react-router-dom';
// dayjs
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween'

import { store } from 'store';

import Root from 'ui/Root';

import 'assets/scss/_index.scss';
import 'react-datepicker/dist/react-datepicker.css'

import ExpensesPage from 'ui/ExpensesPage';

// days plugins initialization
dayjs.extend(customParseFormat)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(isBetween)


const router = createHashRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: '/',
                element: <ExpensesPage />
            }
        ]
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);