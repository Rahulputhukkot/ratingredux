import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Display extends Component {
  static propTypes = {
    rating: React.PropTypes.number,
    description: React.PropTypes.string.isRequired,
  };
  render() {
    const style = require('./ListRatings.scss');
    return (
      <div className={style.display}>
        <table>
          <tr>
            <th>{this.props.rating}</th>
            <th>{this.props.description}</th>
            <th><Link to ="/#"><button>Delete</button></Link></th>
          </tr>
        </table>
      </div>
    );
  }
}
