import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from 'react-query';
import {createBrowserHistory} from 'history';
import {Router} from 'react-router';
import './index.module.scss';

const history = createBrowserHistory();
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Router history={history}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Router>
        </QueryClientProvider>
    </React.StrictMode>
);
