import React, { Component } from 'react';
import Helmet from 'react-helmet';
export default class RateEnter extends Component {
  static propTypes= {
    onRatingSubmit: React.PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      rating: '',
      description: '',
      email: '',
    };
  }
  handleDescChange(descr) {
    if (descr.target.value.length > 256) { return false;}
    this.setState({description: descr.target.value});
  }
  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }
  handleRatingChange(event) {
    this.setState({rating: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    const rating = this.state.rating;
    const description = this.state.description.trim();
    const email = this.state.email.trim();
    console.log(rating);
    console.log(description);
    console.log(email);
    this.props.onRatingSubmit({rating: rating, description: description, email: email});
    this.setState({rating: '', description: '', email: ''});
  }
  render() {
    const style = require('./ListRatings.scss');
    return (
      <div className={style.loginPage + ' container'}>
        <Helmet title="Ratings page"/>
        <h1>Ratings Page</h1>
        <div>
          <form className="login-form" onSubmit={this.handleSubmit.bind(this)} id="ratebox">
            <div className="ratingArea">
              <input type="number" placeholder="Enter Rating" value={this.state.rating} onChange={this.handleRatingChange.bind(this)}/>
            </div><br/>
            <div className="textarea">
              <textarea id="description" rows="3" cols="30" value={this.state.description} onChange={this.handleDescChange.bind(this)} />
            </div>
            <div className="form-group">
              <input type="email" ref="email" placeholder="Enter email-id" value={this.state.email} onChange={this.handleEmailChange.bind(this)}/>
            </div>
            <button className="btn btn-success">Add Rating</button>
          </form>
        </div>
      </div>
    );
  }
}
