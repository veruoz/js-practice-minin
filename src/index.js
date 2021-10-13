import React from 'react';
import {render} from 'react-dom';
import AppService from './modules/app.sevice';
import {config} from './modules/config'
import App from './App';
import './modules/ts.module'
import './css/index.css'
import './scss/index.scss'


console.log(config.key);

const service = new AppService('Hello world')
service.log()

async function start() {
    return await Promise.resolve('async working')
}

start().then(console.log)

render(<App />, document.getElementById('app'))