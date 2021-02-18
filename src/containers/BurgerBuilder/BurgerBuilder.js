import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
  const dispatch = useDispatch();

  const ings = useSelector(state => state.burgerBuilder.ingredients);
  const price = useSelector(state => state.burgerBuilder.totalPrice);
  const error = useSelector(state => state.burgerBuilder.error);
  const isAuth = useSelector(state => state.auth.token !== null);

  const onIngredientAdded = ingName => dispatch(actionTypes.addIngredient(ingName));
  const onIngredientRemoved = ingName => dispatch(actionTypes.removeIngredient(ingName));
  const onInitIngredients = useCallback(() => dispatch(actionTypes.initIngredients()), [dispatch]);
  const onInitPurchase = () => dispatch(actionTypes.purchaseInit());
  const onSetRedirectPath = path => dispatch(actionTypes.setAuthRedirectPath(path));

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
    if (isAuth){
      setPurchasing(true);
    } else {
      onSetRedirectPath('/checkout')
      props.history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push('/checkout');
  };

  // determine which 'less' buttons should be disabled depending on whether or not there is 0 of an ingredient
  const disabledInfo = {
    ...ings
  };

  for (let key in disabledInfo){
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;
  
  if (ings) {
    orderSummary = <OrderSummary 
      ingredients={ings}
      price={price}
      purchaseCancelled={purchaseCancelHandler}
      purchaseContinued={purchaseContinueHandler} 
    />

    burger = (
      <Aux>
        <Burger ingredients={ings}/>    
        <BuildControls 
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabled={disabledInfo}
          price={price}
          purchasable={updatePurchaseState(ings)}
          ordered={purchaseHandler}
          isAuth={isAuth}
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

export default withErrorHandler(BurgerBuilder, axios);
