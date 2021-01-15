import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Aux from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axiosOrders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: null
  };

  componentDidMount () {
    axios.get('/ingredients.json').then(res => {      
      this.setState({ ingredients: res.data });
    }).catch(error => {
      this.setState({ error: true });
    });
  }

  updatePurchaseState(ingredients) {
    let sum = 0;

    for (let idx in ingredients){
      sum += ingredients[idx];
    }

    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type]++;

    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type]; // old price plus new price

    this.setState({ingredients: updatedIngredients, totalPrice: newPrice});

    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    // don't continue if there are already 0 of this ingredient type.
    if (this.state.ingredients[type] <= 0){
      return;
    }

    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type]--;

    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type]; // old price plus new price

    this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
    
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    let queryParams = Object.keys(this.state.ingredients).map(key => {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(this.state.ingredients[key])
      return `${encodedKey}=${encodedValue}`
    });

    queryParams.push(`price=${this.state.totalPrice}`);
    
    const queryString = queryParams.join('&');
    
    this.props.history.push({
      pathname: '/checkout',
      search: `?${queryString}`
    });
  };

  render() {
    // determine which 'less' buttons should be disabled depending on whether or not there is 0 of an ingredient
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;
    
    if (this.state.ingredients) {
      orderSummary = <OrderSummary 
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler} 
      />

      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>    
          <BuildControls 
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />    
        </Aux>      
      );

      if (this.state.loading) {
        orderSummary = <Spinner/>;
      }
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          { orderSummary }
        </Modal>
        { burger }
      </Aux>
    );
  }
}

BurgerBuilder.propTypes = {

};


export default withErrorHandler(BurgerBuilder, axios);
