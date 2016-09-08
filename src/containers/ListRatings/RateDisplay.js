import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import jquery from 'jquery';

export default class RatingDisplay extends Component {
  static propTypes = { data: React.PropTypes.array };
  handleDelete(event) {
    const newdata = { timestamp: event };
    newdata.type = 'update';
    jquery.ajax({
      url: '/api/ratings',
      dataType: 'json',
      type: 'POST',
      data: newdata,
      success: (data) => { this.setState({ data: data }); },
      error: (xhr, status, err) => { console.error('/api/ratings', status, err.toString()); },
    });
  }
  render() {
    const itemsdata = [];
    this.props.data.map(function mapFun(ratingdata, key) {
      return (
       itemsdata.push(
         <tr key = {key}>
           <td>{ratingdata.rating}</td>
           <td>{ratingdata.email}</td>
           <td>{ratingdata.desc}</td>
           <td><Button bsStyle="danger" onClick={this.handleDelete.bind(this, ratingdata.timestamp)}>Delete</Button></td>
         </tr>
      )
     );
    }, this);
    return (
    <Table>
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
      </Table>
   );
  }
}
