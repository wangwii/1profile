import './index.less';
import 'babel-polyfill';

import dva from 'dva';
import router from './router';
import { message } from 'antd';
import createLoading from 'dva-loading';
import { createHistory } from 'history';
import { createLogger } from 'redux-logger';

// import appModel from './models/app';

const loading = createLoading();
const opts = {
  history: createHistory(),
  onError: (e) => message.error(e.message, 3),
  onAction: createLogger({ level: 'info', duration: true})
};


const app = dva(opts);
app.use(loading);
app.router(router);
// app.model(appModel);

app.start('#root');
