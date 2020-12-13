import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Aux from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  };

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
    
    this.updatePurchaseState();
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  render() {
    // determine which 'less' buttons should be disabled depending on whether or not there is 0 of an ingredient

    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing}>
          <OrderSummary 
            ingredients={this.state.ingredients}
          />
        </Modal>
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
  }
}

BurgerBuilder.propTypes = {

};


export default BurgerBuilder;
