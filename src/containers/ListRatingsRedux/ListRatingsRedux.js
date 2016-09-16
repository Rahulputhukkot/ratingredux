import React, { Component } from 'react';
import RateEnter from './RateEnter';
import RateDisplay from './RateDisplay';
import { connect } from 'react-redux';
import { load } from 'redux/modules/ListRateRedux.js';

@connect((globalState) => ({
  formData: globalState.ListRateRedux
}), {
  loadDataToStore: load
})

export default class ListRatings extends Component {
  static propTypes = {
    formData: React.PropTypes.object,
    loadDataToStore: React.PropTypes.func
  };
  constructor() {
    super();
    this.state = { data: [] };
  }

  componentWillMount() {
    this.loadRatingFromServer();
  }

  componentDidUpdate() {
    this.loadRatingFromServer();
  }

  loadRatingFromServer() {
    const newData = this.props.formData.ratings;
    console.log(newData);
    this.setState({ data: newData });
  }

  handleRatingSubmit(rating) {
    this.props.loadDataToStore(rating);
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
