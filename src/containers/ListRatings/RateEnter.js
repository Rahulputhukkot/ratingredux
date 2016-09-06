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
      desc: '',
      email: '',
    };
  }
  handleDescChange(descr) {
    if (descr.target.value.length > 256) { return false;}
    this.setState({desc: descr.target.value});
  }
  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handleRatingChange(event) {
    this.setState({ rating: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const regrate = /^[1-5]$/;
    if (!regrate.test(this.state.rating)) {
      document.getElementsByClassName('err_rating')[0].style.display = 'block';
      document.getElementsByClassName('err_rating')[0].innerHTML = 'Invalid Rating';
      return false;
    }
    document.getElementsByClassName('err_rating')[0].style.display = 'none';
    const regmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regmail.test(this.state.email)) {
      document.getElementsByClassName('err_email')[0].style.display = 'block';
      document.getElementsByClassName('err_email')[0].innerHTML = 'Invalid Email ID';
      return false;
    }
    document.getElementsByClassName('err_email')[0].style.display = 'none';
    const rating = this.state.rating;
    const desc = this.state.desc.trim();
    const email = this.state.email.trim();
    this.props.onRatingSubmit({rating: rating, desc: desc, email: email});
    document.getElementById('ratebox').reset();
    this.setState({rating: '', desc: '', email: ''});
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
              <b>Rating: </b>
              <input type="text" placeholder="Enter Rating" value={this.state.rating} onChange={this.handleRatingChange.bind(this)}/>
              <div className="err_rating" ></div>
            </div><br/>
            <div className="form-group">
              <b>Email ID: </b>
              <input type="text" placeholder="Enter email-id" value={this.state.email} onChange={this.handleEmailChange.bind(this)}/>
                <div className="err_email"></div>
            </div>
            <div className="textarea">
              <label><b>Enter a description: </b></label><br/>
              <textarea id="description" rows="3" cols="30" value={this.state.desc} onChange={this.handleDescChange.bind(this)} />
            </div>
            <button className="btn btn-success">Add Rating</button>
          </form>
        </div>
      </div>
    );
  }
}
