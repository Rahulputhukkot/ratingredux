import React, { Component } from 'react';
import RateEnter from './RateEnter';
import RateDisplay from './RateDisplay';
import $$ from 'jquery';

export default class ListRatings extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.loadRatingFromServer();
  }

  componentDidUpdate() {
    this.loadRatingFromServer();
  }

  loadRatingFromServer() {
    const newdata = {};
    newdata.type = 'read';
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

  handleRatingSubmit(rating) {
    const rates = this.state.data;
    rating.id = Date.now();
    rating.type = 'write';
    const newRates = rates.concat([rating]);
    this.setState({ data: newRates });
    $$.ajax({
      url: '/api/ratings',
      dataType: 'json',
      type: 'POST',
      data: rating,
      success: (data) => {
        this.setState({ data: data });
      },

      error: (xhr, status, err) => {
        console.error('/api/ratings', status, err.toString());
      },
    });
  }

  render() {
    return (
      <div>
        <RateEnter onRatingSubmit={this.handleRatingSubmit.bind(this)} />
        <RateDisplay data={this.state.data} />
      </div>
    );
  }
}
