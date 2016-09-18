import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Form, Col } from 'react-bootstrap';
import Helmet from 'react-helmet';
const hStyle = { paddingLeft: '20%' };
let status = 'Rate';

export default class RatingForm extends Component {
  static propTypes = { onRatingSubmit: React.PropTypes.func, newData: React.PropTypes.array};
  constructor() {
    super();
    this.state = { timestamp: '', email: '', rating: '', desc: '', descleng: 256, type: 'write' };
  }
  componentWillReceiveProps(nextprops) {
    if (this.props.newData !== nextprops.newData) {
      nextprops.newData[0].type = 'edit';
      this.setState({ timestamp: nextprops.newData[0].timestamp,
                      email: nextprops.newData[0].email,
                      rating: nextprops.newData[0].rating,
                      desc: nextprops.newData[0].desc,
                      type: 'edit',
                      descleng: 256 - (nextprops.newData[0].desc.length)
                    });
      status = 'Save';
      document.getElementsByClassName('idrating')[0].value = nextprops.newData[0].rating;
      document.getElementsByClassName('idemail')[0].value = nextprops.newData[0].email;
      document.getElementsByClassName('iddesc')[0].value = nextprops.newData[0].desc;
      document.getElementsByClassName('buttonboot')[0].innerHTML = status;
    }
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
    if (this.getValidationStateEmail() === 'error') { return false; }
    if (this.getValidationStateRate() === 'error') { return false; }
    const presentDate = new Date();
    const dateParts = [
      presentDate.getFullYear(),
      presentDate.getMonth(),
      presentDate.getDate(),
      presentDate.getHours(),
      presentDate.getMinutes(),
      presentDate.getSeconds()
    ];
    const ratingdata = { timestamp: `${dateParts[0]}-${dateParts[1]}-${dateParts[2]} ${dateParts[3]}:${dateParts[4]}:${dateParts[5]}`, email: this.state.email, rating: this.state.rating, desc: this.state.desc, type: this.state.type };
    if (this.state.type === 'edit') {
      ratingdata.oldtimestamp = this.state.timestamp;
    }
    this.props.onRatingSubmit(ratingdata);
    document.getElementById('form').reset();
    this.setState({ timestamp: '', email: '', rating: '', desc: '', descleng: 256, type: 'write' });
    status = 'Rate';
    document.getElementsByClassName('buttonboot')[0].innerHTML = status;
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
            <FormControl type="text" className="idemail" email={this.state.email} placeholder="Email" onChange={this.handleChangeEmail.bind(this)} />
          <FormControl.Feedback />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalRating" validationState={this.getValidationStateRate()}>
          <Col componentClass={ControlLabel} sm={2}>
            Rating
          </Col>
          <Col sm={5}>
            <FormControl type="text" className="idrating" rating={this.state.rating} placeholder="Rating" onChange={this.handleChangeRate.bind(this)} />
           <FormControl.Feedback />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Description
          </Col>
          <Col sm={10}>
            <textarea rows="4" cols="62" maxLength="256" className="iddesc" onChange={this.handleChangeText.bind(this)} placeholder="Description" />
            {this.state.descleng}
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button className="buttonboot" bsStyle="primary" type="submit">
              Rate
            </Button>
          </Col>
        </FormGroup>
      </Form>
      </div>
    );
  }
}
