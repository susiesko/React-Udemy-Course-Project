import React, { Component } from 'react';

import classes from './ContactData.module.css';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axiosOrders';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Mail'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: ''
      },
    },
    loading: false
  }

  orderHandler = (event) => {   
    event.preventDefault(); 

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
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

  getFormConfig = () => {

  }

  render() {
    let form = (
      <form action="">
        { Object.keys(this.state.orderForm).map(input => {
          return <Input elementType="..." elementConfig="..." value="..." />
        }) }
        <Input inputtype="input" type="text" name="name" placeholder="Your Name"/>
        <Input inputtype="input" type="email" name="email" placeholder="Your Email"/>
        <Input inputtype="input" type="text" name="street" placeholder="Your Street"/>
        <Input inputtype="input" type="text" name="postal" placeholder="Your Posta Code"/>
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
