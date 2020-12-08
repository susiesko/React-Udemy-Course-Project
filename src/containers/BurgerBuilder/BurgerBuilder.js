import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Aux from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
    totalPrice: 4
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type]++;

    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type]; // old price plus new price

    //console.log(updatedIngredients);

    this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
  };

  removeIngredientHandler = (type) => {

  };

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls 
          ingredientAdded={this.addIngredientHandler}
        />
      </Aux>
    );
  }
}

BurgerBuilder.propTypes = {

};


export default BurgerBuilder;
