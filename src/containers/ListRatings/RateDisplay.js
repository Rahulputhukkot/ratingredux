import React, {Component} from 'react';
import Display from './Display.js';

export default class RateDisplay extends Component {
  static propTypes = {
    data: React.PropTypes.array.isRequired,
  };
  render() {
    const displayNodes = this.props.data.map((rates) => {
      return (<Display rating={rates.rating} description={rates.description} email ={rates.email} key={rates.id} timestamp={rates.id}/>);
    });
    return (
      <div className="DisplayList">
        {displayNodes}
      </div>
    );
  }
}
