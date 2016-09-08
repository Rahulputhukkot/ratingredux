import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Form, Col } from 'react-bootstrap';
import Helmet from 'react-helmet';
const hStyle = { paddingLeft: '20%' };

export default class RatingForm extends Component {
  static propTypes = { onRatingSubmit: React.PropTypes.func };
  constructor() {
    super();
    this.state = { email: '', rating: '', desc: '', descleng: 256 };
  }
  getValidationStateEmail() {
    const regmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regmail.test(this.state.email)) return 'success';
    else if (this.state.email !== '') return 'error';
  }

  getValidationStateRate() {
    const regrate = /^[1-5]$/;
    if (regrate.test(this.state.rating)) return 'success';
    else if (this.state.rating !== '') return 'error';
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleChangeRate(event) {
    this.setState({ rating: event.target.value });
  }

  handleChangeText(event) {
    this.setState({ desc: event.target.value });
    this.setState({ descleng: (256 - (event.target.value.length)) });
  }

  handleSubmit(obj) {
    obj.preventDefault();
    const ratingdata = { email: this.state.email, rating: this.state.rating, desc: this.state.desc };
    this.props.onRatingSubmit(ratingdata);
    document.getElementById('form').reset();
  }

  render() {
    return (<div>
      <Helmet title="Ratings page"/>
      <h1 style ={hStyle} >Ratings Page</h1>
      <Form horizontal onSubmit={this.handleSubmit.bind(this)} id="form">
        <FormGroup controlId="formHorizontalEmail" validationState={this.getValidationStateEmail()}>
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={5}>
            <FormControl type="text" email={this.state.email} placeholder="Email" onChange={this.handleChangeEmail.bind(this)} />
          <FormControl.Feedback />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalRating" validationState={this.getValidationStateRate()}>
          <Col componentClass={ControlLabel} sm={2}>
            Rating
          </Col>
          <Col sm={5}>
            <FormControl type="text" rating={this.state.rating} placeholder="Rating" onChange={this.handleChangeRate.bind(this)} />
           <FormControl.Feedback />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Description
          </Col>
          <Col sm={10}>
            <textarea rows="4" cols="62" maxLength="256" onChange={this.handleChangeText.bind(this)} placeholder="Description" />
            {this.state.descleng}
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button bsStyle="primary" type="submit">
              Rate
            </Button>
          </Col>
        </FormGroup>
      </Form>
      </div>
    );
  }
}
