import React, {Component} from 'react';
import $$ from 'jquery';

const Style = require('./ListRatings.scss');

export default class RateDisplay extends Component {
  static propTypes = {
    data: React.PropTypes.array,
  };
  handleDelete(event) {
    const newdata = {timestamp: event};
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
    const style = {
      width: '30px',
    };
    const itemsdata = [];
    this.props.data.map(function myfunc(ratingdata, key) {
      return (
        itemsdata.push(
          <tr key ={key}>
           <td>{ratingdata.rating}</td>
           <td>{ratingdata.email}</td>
           <td>{ratingdata.desc}</td>
           <td style={style}><button onClick={this.handleDelete.bind(this, ratingdata.timestamp)}>Delete Rating</button></td>
         </tr>
       )
     );
    }, this);
    return (
      <table id={Style.id1}>
        <thead>
          <tr>
            <th>Rating</th>
            <th>E-mail</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {itemsdata}
        </tbody>
      </table>
    );
  }
}
