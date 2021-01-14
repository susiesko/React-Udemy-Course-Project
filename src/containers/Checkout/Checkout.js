import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    }
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    let checkoutDOM = <CheckoutSummary ingredients={this.state.ingredients} onCheckoutCancelled={this.checkoutCancelledHandler} onCheckoutContinued={this.checkoutContinuedHandler} />;

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
