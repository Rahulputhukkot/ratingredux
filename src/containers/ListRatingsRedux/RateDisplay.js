import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { remove } from 'redux/modules/ListRateRedux.js';

@connect((globalState) => ({
  formData: globalState.ListRateRedux
}), {
  removeDataFromStore: remove,
})

export default class RatingDisplay extends Component {
  static propTypes = {
    data: React.PropTypes.array,
    formData: React.PropTypes.object,
    removeDataFromStore: React.PropTypes.func,
    onRatingEdit: React.PropTypes.func
  };

  handleDelete(event) {
    this.props.removeDataFromStore(event);
    const newData = this.props.formData.ratings;
    this.setState({ data: newData });
  }
  handleEdit(event) {
    const newdata = { timestamp: event.timestamp, type: 'edit',
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
