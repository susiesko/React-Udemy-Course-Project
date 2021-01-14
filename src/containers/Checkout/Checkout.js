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

  componentWillMount() {
    const ingredients = this.props.location.search.slice(1)
      .split('&')
      .reduce((prev, cur) => {
        const [key, val] = cur.split('=');

        return {
          ...prev,
          [key]: +val
        }
      }, {});

    this.setState({ ingredients });
    //this.setState()
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} onCheckoutCancelled={this.checkoutCancelledHandler} onCheckoutContinued={this.checkoutContinuedHandler} />
      </div>
    );
  }
}

export default Checkout;
