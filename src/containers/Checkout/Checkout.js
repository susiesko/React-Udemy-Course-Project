import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    },
    checkingOut: false
  }

  continueHandler = () => {
    this.setState({ checkingOut: true });
  }

  cancelHandler = () => {
    this.props.history.push('/');
  }

  render() {
    let checkoutDOM = <CheckoutSummary ingredients={this.state.ingredients} cancelled={this.cancelHandler} continued={this.continueHandler} />;

    if (this.state.checkingOut){
      checkoutDOM = <div>Here is my form.</div>;
    }

    return (
      <div>
        {checkoutDOM}
      </div>
    );
  }
}

export default Checkout;
