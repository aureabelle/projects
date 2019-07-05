import React, { Component } from 'react';
import {
  Layout,
  // Menu,
  Icon,
  Divider,
  Empty,
  Input
} from 'antd';

const { Content, Sider } = Layout;

import MenuComponent from './menuComponent';
import Contributors from './contributors';
import ProjectDetails from './projectDetails';

import '../scss/menu.scss';

class ContentComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      contributors: [],
      projectDetails: {},
      hasSelected: false,
      keyword: ''
    };

    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.getContributors = this.getContributors.bind(this);
  }

  componentDidMount() {
    fetch('https://api.github.com/orgs/facebook/repos?per_page=500', {
      headers: {
        "Accept": "application/vnd.github.inertia-preview+json"
      }
    })
      .then(response => response.json())
      .then(result => {
        this.setState({
          projects: result
        });
      }, error => {
        console.log(error);
        this.setState({
          error
        });
      });
  }

  getContributors(url) {
    fetch(url, {
      headers: {
        "Accept": "application/vnd.github.inertia-preview+json"
      }
    })
      .then(response => response.json())
      .then(result => {
        this.setState({
          contributors: result
        });
      }, error => {
        console.log(error);
      });

  }

  handleMenuClick(item) {
    const contributorsUrl = item.contributors_url;
    this.getContributors(contributorsUrl);
    this.setState({
      projectDetails: item,
      hasSelected: true
    });
  }

  handleSearch(event) {
    this.setState({
      keyword: event.target.value
    });
  }

  render() {
    const {
      projects,
      contributors,
      projectDetails,
      hasSelected,
      keyword
    } = this.state;

    const menuItems = projects.sort((a, b) => b.watchers - a.watchers).filter(item => item.name.includes(keyword));

    return (
      <Content style={{ padding: '50px' }}>
        <Layout style={{ background: '#fff', padding: '25px' }}>
          <Sider width={350} style={{ background: '#fff' }}>
            <Input
              placeholder="Enter a keyword"
              prefix={<Icon type="project" style={{ color: 'rgba(0,0,0,.25)' }} />}
              suffix={<Icon type="search" />}
              onChange={this.handleSearch}
            />

            <Divider />

            <MenuComponent
              menuItems={menuItems}
              handleMenuClick={this.handleMenuClick}
            />
          </Sider>

          <Content style={{ padding: '25px', minHeight: 280 }}>
            {hasSelected ?
              <React.Fragment>
                <ProjectDetails
                  projectDetails={projectDetails}
                />

                <Divider />

                <Contributors
                  contributors={contributors}
                />
              </React.Fragment>
            :
              <React.Fragment>
                <Empty style={{ minHeight: 300 }} description="Select a project on the left." />
              </React.Fragment>
            }
          </Content>
        </Layout>
      </Content>
    );
  }
}

export default ContentComponent;
