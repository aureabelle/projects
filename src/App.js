import React from 'react';
import ReactDOM from 'react-dom';

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
  <App />,
  document.getElementById('app')
);