import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';

import { App } from './app';

import './styles.less';

import { configureFakeBackend } from './_helpers';
configureFakeBackend();

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('app')
);