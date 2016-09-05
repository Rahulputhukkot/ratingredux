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
    const style = require('./ListRatings.scss');
    return (
      <div className="DisplayList">
        <div className={style.display}>
          <table>
            <tr>
              <div className={style.sameRow} >
              <div className={style.first}>
                <h4>Email</h4>
              </div>
              <div className={style.second}>
                <h4>Rating</h4>
              </div>
              <div className={style.third}>
                <h4>Description</h4>
              </div>
            </div>
            </tr>
          </table>
        </div>
        {displayNodes}
      </div>
    );
  }
}
