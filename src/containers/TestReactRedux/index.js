import React, {Component} from 'react';
import FormComponent from './FormComponent';
import ListComponent from './ListComponent';

export default class TestReactRedux extends Component {
  render() {
    return (
      <div>
        <h1>TestReactRedux</h1><hr/>
        <FormComponent />
        <ListComponent />
      </div>
    );
  }
}
