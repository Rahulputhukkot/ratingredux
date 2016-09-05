import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Display extends Component {
  static propTypes = {
    email: React.PropTypes.string.isRequired,
    rating: React.PropTypes.number,
    description: React.PropTypes.string.isRequired,
  };
  render() {
    const style = require('./ListRatings.scss');
    return (
      <div className={style.display}>
        <table>
          <tr>
            <div className={style.sameRow} >
            <div className={style.first}>
              {this.props.email}
            </div>
            <div className={style.second}>
              {this.props.rating}
            </div>
            <div className={style.third}>
              {this.props.description}
            </div>
            <div className={style.buttonStyle}>
              <Link to ="/listRatings"><button >Delete</button></Link>
            </div>
          </div>
          </tr>
        </table>
      </div>
    );
  }
}
