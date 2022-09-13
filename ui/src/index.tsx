import React from 'react';
import ReactDOM from 'react-dom/client';
import {StoreProvider, rootStores} from "./stores/store";
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
    <QueryClientProvider client={queryClient}>
        <Router history={history}>
            <BrowserRouter>
                <StoreProvider value={rootStores}>
                    <App/>
                </StoreProvider>
            </BrowserRouter>
        </Router>
    </QueryClientProvider>
);
