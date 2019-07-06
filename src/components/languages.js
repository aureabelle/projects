import React, { Component } from 'react';
import { Icon } from 'antd';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class Languages extends Component {
  render() {
    const { languages } = this.props;

    if (languages) {
      let data = [];
      let categories = [];
      let values = [];
      for (let [key, value] of Object.entries(languages)) {
          const item ={};
          item.y = value;
          item.name = key;
          data.push(item);
          categories.push(key);
          values.push(value);
      }

      const options = {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Languages'
        },
        xAxis: {
            categories: categories
        },
        plotOptions: {
            series: {
                allowPointSelect: true
            }
        },
        series: [{
          name: 'Language',
          data: data
        }]
      }

      if (Object.entries(languages).length !== 0 && languages.constructor === Object) {
        return (
          <div className="languages">

            <HighchartsReact
              highcharts={Highcharts}
              options={options}
            />
          </div>
        );
      }

      return (
        <div className="contributors">
          <p>This project has no languages.</p>
        </div>
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

export default Languages;
