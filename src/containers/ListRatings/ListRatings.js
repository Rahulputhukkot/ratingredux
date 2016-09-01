import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class ListRatings extends Component {
  render() {
    return (<div className="container">
      <h1> Ratings Page </h1>
      <Helmet title="Ratings page"/>
      <form className="formdetails">
      Time Stamp: <input type="text" name="timestamp" /><br/>
      Rating:<input type="number" name="rating" value="Rating"/><br/>
      Description:<br/><textarea name="description" rows="10" cols="30"></textarea><br/>
      Email:<input type="email" name="Email" /><br/>
      <input type="submit"/>
      </form>
      </div>);
  }
}
