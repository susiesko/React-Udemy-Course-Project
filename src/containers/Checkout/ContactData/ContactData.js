import React, { Component } from 'react';

import classes from './ContactData.module.css';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axiosOrders';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {   
    event.preventDefault(); 

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Susie R',
        address: {
          street: 'Teststreet 1',
          zipCode: '12345',
          country: 'Germany'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };

    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
        this.props.history.push('');
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
      });
  }

  render() {
    let form = (
      <form action="">
        <input className={classes.input} type="text" name="name" placeholder="Your Name"/>
        <input className={classes.input} type="email" name="email" placeholder="Your Email"/>
        <input className={classes.input} type="text" name="street" placeholder="Your Street"/>
        <input className={classes.input} type="text" name="postal" placeholder="Your Posta Code"/>
        <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
      </form>      
    );

    if (this.state.loading){
      form = <Spinner/>;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        { form }
      </div>
    );
  }
}

export default ContactData;
