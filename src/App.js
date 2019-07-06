import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxPromise from "redux-promise";

import reducers from "./reducers";
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Sider, Footer } = Layout;


import ContentComponent from './components/contentComponent';
import './app.scss';

const App = () => {
  return (
    <Layout>
      <Header className="header">
        <h1>Facebook Projects on Github</h1>
      </Header>

      <ContentComponent />

      <Footer style={{ textAlign: 'center' }}>©2019 Created by Aureabelle Cruz</Footer>
    </Layout>
  );
};

export default App;

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
  document.getElementById('app')
);