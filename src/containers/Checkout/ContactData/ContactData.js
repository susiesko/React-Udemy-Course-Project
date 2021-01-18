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

  getFormConfig = (elementType, elementConfig, value) => {
    return { elementType, elementType, value };
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

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };

    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    this.setState( { orderForm: updatedOrderForm } );
  }

  render() {
    let formElementsArray = [];

    for (let key in this.state.orderForm){
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let form = (
      <form action="">
        { formElementsArray.map(formElement => (
          <Input 
            key={formElement.id} 
            {...formElement.config} 
            changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
        )) }
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
