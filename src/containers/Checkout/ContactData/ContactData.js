import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';

import classes from './ContactData.module.css';


class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  }

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        <form action="">
          <input className={classes.input} type="text" name="name" placeholder="Your Name"/>
          <input className={classes.input} type="email" name="email" placeholder="Your Email"/>
          <input className={classes.input} type="text" name="street" placeholder="Your Street"/>
          <input className={classes.input} type="text" name="postal" placeholder="Your Posta Code"/>
          <Button btnType="Success">Order</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
