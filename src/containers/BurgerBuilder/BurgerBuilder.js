import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Aux from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    }
  };

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <div>Builder Controls</div>
      </Aux>
    );
  }
}

BurgerBuilder.propTypes = {

};


export default BurgerBuilder;
