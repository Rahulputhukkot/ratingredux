import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import jquery from 'jquery';

export default class RatingDisplay extends Component {
  static propTypes = { data: React.PropTypes.array, onRatingEdit: React.PropTypes.func };


  handleDelete(event) {
    const newdata = { timestamp: event, type: 'update', action: 'delete' };
    jquery.ajax({
      url: '/api/ratings',
      dataType: 'json',
      type: 'POST',
      data: newdata,
      success: (data) => { this.setState({ data: data }); },
      error: (xhr, status, err) => { console.error('/api/ratings', status, err.toString()); },
    });
  }
  handleEdit(event) {
    const newdata = { timestamp: event.timestamp, type: 'update', action: 'delete',
                      email: event.email, desc: event.desc, rating: event.rating
                    };
    this.props.onRatingEdit([newdata]);
  }
  render() {
    const itemsdata = [];
    this.props.data.map(function mapFun(ratingdata, key) {
      return (
       itemsdata.push(
         <tr key = {key}>
           <td id = "rating">{ratingdata.rating}</td>
           <td id = "email">{ratingdata.email}</td>
           <td id = "desc">{ratingdata.desc}</td>
           <td><Button bsStyle="info" onClick={this.handleEdit.bind(this, ratingdata)}>Edit</Button></td>
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
