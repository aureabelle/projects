import React, { Component } from 'react';

import { connect } from "react-redux";
import { fetchProjects, fetchContributors, fetchLanguages } from "../actions/index";

import {
  Layout,
  Icon,
  Divider,
  Empty,
  Input,
  Select
} from 'antd';

const { Content, Sider } = Layout;
const { Option } = Select;

import MenuComponent from './menuComponent';
import Contributors from './contributors';
import ProjectDetails from './projectDetails';
import Languages from './languages';

import '../scss/menu.scss';

class ContentComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectDetails: {},
      hasSelected: false,
      keyword: '',
      sortBy: 'descending'
    };

    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchProjects());
  }

  handleMenuClick(item) {
    const contributorsUrl = item.contributors_url;
    const languagesUrl = item.languages_url;
    this.props.dispatch(fetchContributors(contributorsUrl));
    this.props.dispatch(fetchLanguages(languagesUrl));

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

  handleSort(value) {
    if (value === 'ascending') {
      this.setState({
        sortBy: 'ascending'
      });
    } else if (value === 'descending') {
      this.setState({
        sortBy: 'descending'
      });
    } else {
      this.setState({
        sortBy: 'alphabetical'
      });
    }
  }

  render() {
    const {
      projectDetails,
      hasSelected,
      keyword,
      sortBy
    } = this.state;

    if (this.props.projects) {
      const projects = this.props.projects;
      let menuItems = [];

      if (sortBy === 'ascending') {
        menuItems = projects.sort((a, b) => a.watchers - b.watchers).filter(item => item.name.includes(keyword));
      } else if (sortBy === 'descending') {
        menuItems = projects.sort((a, b) => b.watchers - a.watchers).filter(item => item.name.includes(keyword));
      } else {
        menuItems = projects.sort((a, b) => {
          if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
          if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
          return 0;
        }).filter(item => item.name.includes(keyword));
      }

      const contributors = this.props.contributors;
      const languages = this.props.languages;

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

              <Select
                style={{ marginBottom: '20px', width: '100%' }}
                defaultValue={sortBy}
                placeholder="Sort projects"
                onChange={this.handleSort}
              >
                <Option value="">Sort by</Option>
                <Option value="descending"><Icon type="eye" /> Highest Watchers</Option>
                <Option value="ascending"><Icon type="eye" /> Lowest Watchers</Option>
                <Option value="alphabetical"><Icon type="sort-ascending" /> Alphabetical</Option>
              </Select>


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

                  <Languages
                    languages={languages}
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
      <div className="loading">
        <Icon type="loading" />
        <span>Loading ...</span>
      </div>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects[0],
    contributors: state.contributors[0],
    languages: state.languages[0]
  }
}

export default connect(mapStateToProps)(ContentComponent);
