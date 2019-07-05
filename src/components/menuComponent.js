import React, { Component } from 'react';
import { Menu, Icon } from 'antd';

class MenuComponent extends Component {
  render() {
    const { menuItems, handleMenuClick } = this.props;

    return (
      <Menu mode="inline">
        {menuItems.map((project, index) => {
          return (
            <Menu.Item key={index} onClick={() => handleMenuClick(project)}>
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
