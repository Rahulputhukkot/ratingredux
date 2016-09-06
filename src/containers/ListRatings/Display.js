import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Display extends Component {
  static propTypes = {
    email: React.PropTypes.string.isRequired,
    rating: React.PropTypes.number,
    desc: React.PropTypes.string.isRequired,
    timestamp: React.PropTypes.string,
  };
  handleDelete(e) {
    console.log(e.target.id);
  }
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
              {this.props.desc}
            </div>
            <div className={style.buttonStyle}>
              <button id={this.props.timestamp} onClick={this.handleDelete.bind(this)}>Delete</button>
            </div>
          </div>
          </tr>
        </table>
      </div>
    );
  }
}
