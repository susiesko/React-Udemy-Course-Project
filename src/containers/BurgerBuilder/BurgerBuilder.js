import React, { useEffect, useState } from 'react';
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

const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);
  const { onInitIngredients } = props;

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = (ingredients) => {
    let sum = 0;

    for (let idx in ingredients){
      sum += ingredients[idx];
    }
  
    return sum > 0;
  }

  const purchaseHandler = () => {
    if (props.isAuth){
      setPurchasing(true);
    } else {
      props.onSetRedirectPath('/checkout')
      props.history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push('/checkout');
  };

  // determine which 'less' buttons should be disabled depending on whether or not there is 0 of an ingredient
  const disabledInfo = {
    ...props.ings
  };

  for (let key in disabledInfo){
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;
  
  if (props.ings) {
    orderSummary = <OrderSummary 
      ingredients={props.ings}
      price={props.price}
      purchaseCancelled={purchaseCancelHandler}
      purchaseContinued={purchaseContinueHandler} 
    />

    burger = (
      <Aux>
        <Burger ingredients={props.ings}/>    
        <BuildControls 
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemoved}
          disabled={disabledInfo}
          price={props.price}
          purchasable={updatePurchaseState(props.ings)}
          ordered={purchaseHandler}
          isAuth={props.isAuth}
        />    
      </Aux>      
    );
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        { orderSummary }
      </Modal>
      { burger }
    </Aux>
  );
}

// i added my own implementation for calculating price with redux during lecture 277.
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch(actionTypes.addIngredient(ingName)),
    onIngredientRemoved: ingName => dispatch(actionTypes.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actionTypes.initIngredients()),
    onInitPurchase: () => { dispatch(actionTypes.purchaseInit()) },
    onSetRedirectPath: path => { dispatch(actionTypes.setAuthRedirectPath(path)) }
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler(BurgerBuilder, axios) );
