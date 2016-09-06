import React, {Component} from 'react';
const Style = require('./ListRatings.scss');

export default class RateDisplay extends Component {
  static propTypes = {
    data: React.PropTypes.array,
  };
  render() {
    const style = {
      width: '30px',
    };
    const itemsdata = [];
    this.props.data.map(function myfunc(ratingdata, obj) {
      return (
        itemsdata.push(
          <tr>
           <td>{ratingdata.rating}</td>
           <td>{ratingdata.email}</td>
           <td key={obj}>{ratingdata.desc}</td>
           <td style={style}><button>Delete Rating</button></td>
         </tr>
       )
     );
    });
    return (
      <table id={Style.id1}>
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
      </table>
    );
  }
}
