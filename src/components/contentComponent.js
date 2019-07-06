import React, { Component } from 'react';

import { connect } from "react-redux";
import { fetchProjects, fetchContributors } from "../actions/index";

import {
  Layout,
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
      projectDetails: {},
      hasSelected: false,
      keyword: ''
    };

    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchProjects());
  }

  handleMenuClick(item) {
    const contributorsUrl = item.contributors_url;
    this.props.dispatch(fetchContributors(contributorsUrl));

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
      projectDetails,
      hasSelected,
      keyword
    } = this.state;

    if (this.props.projects) {
      const projects = this.props.projects;

      const menuItems = projects.sort((a, b) => b.watchers - a.watchers).filter(item => item.name.includes(keyword));

      const contributors = this.props.contributors;

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
                    contributors={contributors}
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

    return (
      <div>Loading ...</div>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects[0],
    contributors: state.contributors[0]
  }
}

export default connect(mapStateToProps)(ContentComponent);
