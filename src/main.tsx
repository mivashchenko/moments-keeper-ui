import ReactDOM from 'react-dom/client';

import {router} from './App';
import {RouterProvider} from "react-router-dom";
import {Provider as ReduxProvider} from 'react-redux';
import {store} from './store';
import './index.scss';
import {CssBaseline} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {LocalizationProvider} from "@mui/x-date-pickers";


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <ReduxProvider store={store}>
        <CssBaseline>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <RouterProvider router={router}/>
            </LocalizationProvider>
        </CssBaseline>
    </ReduxProvider>
);

