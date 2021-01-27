import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axiosOrders';
import * as actionTypes from '../../store/actions/index';

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount () {
    this.props.onInitIngredients();
  }

  updatePurchaseState(ingredients) {
    let sum = 0;

    for (let idx in ingredients){
      sum += ingredients[idx];
    }

    return sum > 0;
    //this.setState({ purchasable: sum > 0 });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {    
    this.props.history.push('/checkout');
  };

  render() {
    // determine which 'less' buttons should be disabled depending on whether or not there is 0 of an ingredient
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;
    
    if (this.props.ings) {
      orderSummary = <OrderSummary 
        ingredients={this.props.ings}
        price={this.props.price}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler} 
      />

      burger = (
        <Aux>
          <Burger ingredients={this.props.ings}/>    
          <BuildControls 
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />    
        </Aux>      
      );
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

// i added my own implementation for calculating price with redux during lecture 277.

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actionTypes.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actionTypes.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actionTypes.initIngredients())
  }
}

export default connect( mapStateToProps,  mapDispatchToProps )( withErrorHandler(BurgerBuilder, axios) );
