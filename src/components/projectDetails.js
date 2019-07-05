import React, { Component } from 'react';
import { Statistic, Row, Col, Icon, Divider } from 'antd';

class ProjectDetails extends Component {
  render() {
    const { projectDetails, contributors } = this.props;

    return(
      <div className="project-details">
        <h2>
          <a href={projectDetails.homepage} target="_blank">
            {projectDetails.name}
          </a>
        </h2>

        <p>{projectDetails.description}</p>

        <Divider dashed />

        <Row>
          <Col span={6}>
            <Statistic
              title="Contributors"
              value={contributors.length}
              prefix={<Icon type="smile" />}
            />
          </Col>

          <Col span={6}>
            <Statistic
              title="Watchers"
              value={projectDetails.watchers_count}
              prefix={<Icon type="eye" />}
            />
          </Col>

          <Col span={6}>
            <Statistic
              title="Forks"
              value={projectDetails.forks_count}
              prefix={<Icon type="fork" />}
            />
          </Col>

          <Col span={6}>
            <Statistic
              title="Open Issues"
              value={projectDetails.open_issues_count}
              prefix={<Icon type="exclamation-circle" />}
            />
          </Col>
        </Row>

      </div>
    );
  }
}

export default ProjectDetails;
