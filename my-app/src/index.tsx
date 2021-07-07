import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {HashRouter} from "react-router-dom";
import Routes from "./RoutesTodoList";
import {Provider} from "react-redux";
import {store} from "./state/store";

ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <Routes/>
            {/*<App/>*/}
        </Provider>
    </HashRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
