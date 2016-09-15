import React, { Component } from 'react';
import RateEnter from './RateEnter';
// import RateDisplay from './RateDisplay';
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
    this.state = { data: [], newData: [] };
  }

  // componentDidMount() {
  //   this.loadRatingFromServer();
  // }
  //
  // componentDidUpdate() {
  //   this.loadRatingFromServer();
  // }
  //
  // loadRatingFromServer() {
  //   const newData = JSON.stringify(this.props.formData);
  //   this.setState({ data: newData });
  // }

  handleRatingSubmit(rating) {
    const rates = this.state.data;
    const newRates = rates.concat([rating]);
    this.props.loadDataToStore(rating);
    this.setState({ data: newRates });
  }


  render() {
    return (
      <div>
        <RateEnter onRatingSubmit={this.handleRatingSubmit.bind(this)} />
        {/* <RateDisplay data={this.state.data} /> */}
      </div>
    );
  }
}
