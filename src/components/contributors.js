import React, { Component } from 'react';
import { Card } from 'antd';
const { Meta } = Card;

import '../scss/contributors.scss';

class Contributors extends Component {
  render() {
    const { contributors } = this.props;

    if (contributors.length !== 0) {
      return (
        <div className="contributors">
          <h3>Contributors</h3>
          <div className="contributors-list">
            {contributors.map((contributor, index) => {
              return (
                <div className="contributor" key={`contributor-${index}`}>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt={contributor.login} src={contributor.avatar_url} />}
                  >
                    <Meta title={contributor.login} description={contributor.html_url} />
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <div className="contributors">
        <p>This project has no contributors.</p>
      </div>
    );
  }
}

export default Contributors;
