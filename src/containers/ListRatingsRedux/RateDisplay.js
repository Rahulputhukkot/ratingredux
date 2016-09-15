import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';

export default class RatingDisplay extends Component {
  static propTypes = { data: React.PropTypes.array };
  render() {
    const itemsdata = [];
    this.props.data.map(function mapFun(ratingdata, key) {
      return (
       itemsdata.push(
         <tr key = {key}>
           <td id = "rating">{ratingdata.rating}</td>
           <td id = "email">{ratingdata.email}</td>
           <td id = "desc">{ratingdata.desc}</td>
           <td><Button bsStyle="info" >Edit</Button></td>
           <td><Button bsStyle="danger" >Delete</Button></td>
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
