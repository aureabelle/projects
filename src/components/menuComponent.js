import React, { Component } from 'react';
import { Menu, Icon } from 'antd';

class MenuComponent extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(project) {
    this.props.handleMenuClick(project);
  }

  render() {
    const { menuItems } = this.props;

    return (
      <Menu mode="inline">
        {menuItems.map((project, index) => {
          return (
            <Menu.Item key={index} onClick={() => this.handleClick(project)}>
              <span className="menu-item">
                <span className="project-name">{project.name}</span>
                <span className="project-watchers" title="Watchers">
                  <Icon type="eye" /> {project.watchers_count}
                </span>
              </span>
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }
}

export default MenuComponent;
