import React, { Component } from 'react';
import RateEnter from './RateEnter';
import RateDisplay from './RateDisplay';
import { connect } from 'react-redux';
import { load } from 'redux/modules/ListRateRedux.js';
import { edit } from 'redux/modules/ListRateRedux.js';

@connect((globalState) => ({
  formData: globalState.ListRateRedux
}), {
  loadDataToStore: load,
  editDataInStore: edit
})

export default class ListRatings extends Component {
  static propTypes = {
    formData: React.PropTypes.object,
    loadDataToStore: React.PropTypes.func,
    editDataInStore: React.PropTypes.func
  };
  constructor() {
    super();
    this.state = { data: [], newData: [] };
  }

  componentDidMount() {
    this.loadRatingFromServer();
  }

  componentDidUpdate() {
    this.loadRatingFromServer();
  }

  loadRatingFromServer() {
    const newData = this.props.formData.ratings;
    if (newData !== this.state.data) {
      this.setState({ data: newData });
    }
  }

  handleRatingSubmit(rating) {
    if (rating.type === 'write') {
      this.props.loadDataToStore(rating);
    } else {
      this.props.editDataInStore(rating);
    }
    const newData = this.props.formData.ratings;
    this.setState({ data: newData });
  }

  handleRatingEdit(rating) {
    this.setState({ newData: rating });
  }

  render() {
    return (
      <div>
        <RateEnter newData={this.state.newData} onRatingSubmit={this.handleRatingSubmit.bind(this)} />
        <RateDisplay data={this.state.data} onRatingEdit={this.handleRatingEdit.bind(this)}/>
      </div>
    );
  }
}
