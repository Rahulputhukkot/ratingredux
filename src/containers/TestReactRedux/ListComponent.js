import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

@connect((globalState) => ({
  formData: globalState.testReactRedux
}))
export default class ListComponent extends Component {
  static propTypes = {
    formData: PropTypes.object
  };

  render() {
    return (
      <div>
        <h4>ListComponent</h4><hr/>
        <div>{JSON.stringify(this.props.formData)}</div>
      </div>
    );
  }
}
