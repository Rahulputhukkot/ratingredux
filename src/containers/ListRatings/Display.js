import React, { Component } from 'react';
import $$ from 'jquery';

export default class Display extends Component {
  static propTypes = {
    email: React.PropTypes.string.isRequired,
    rating: React.PropTypes.number,
    desc: React.PropTypes.string.isRequired,
    timestamp: React.PropTypes.string,
  };
  handleDelete(e) {
    console.log(e.target.id);
    const newdata = {};
    newdata.type = 'update';
    $$.ajax({
      url: '/api/ratings',
      dataType: 'json',
      type: 'POST',
      data: newdata,
      success: (data) => {
        this.setState({ data: data });
      },

      error: (xhr, status, err) => {
        console.error('/api/ratings', status, err.toString());
      },
    });
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
