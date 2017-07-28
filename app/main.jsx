import React from 'react'
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from "./router/index";


import {Provider} from 'react-redux';
import configureStore from '@store/index'

const store = configureStore()


ReactDOM.render((
    <BrowserRouter>
        <Provider store={store}>
            {renderRoutes(routes)}
        </Provider>
    </BrowserRouter>  
), document.getElementById("app"));