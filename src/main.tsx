import ReactDOM from 'react-dom/client';

import {router} from './App';
import {RouterProvider} from "react-router-dom";
import {Provider as ReduxProvider} from 'react-redux';
import {store} from './store';
import './index.scss';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ReduxProvider store={store}>
        <RouterProvider router={router}/>
    </ReduxProvider>
);

