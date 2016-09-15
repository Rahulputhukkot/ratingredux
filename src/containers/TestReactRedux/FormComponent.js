import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { load } from 'redux/modules/testReactRedux.js';

@connect(() => ({}), {
  loadDataToStore: load
})
export default class FormComponent extends Component {
  static propTypes = {
    formData: PropTypes.object,
    loadDataToStore: PropTypes.function
  };

  clickHandler = () => {
    this.props.loadDataToStore(this.inputFieldRef.value);
  };

  render() {
    return (
      <div>
        <h4>FormComponent</h4><hr/>
        <input type="text" ref={ (field) => (this.inputFieldRef = field) }/>
        <input type="button" value="save" onClick={this.clickHandler}/>
      </div>
    );
  }
}
