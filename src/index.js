import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Admin from './router'
import 'antd/dist/antd.css'

import './style/common.less'
import './style/base.less'
// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Admin />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
