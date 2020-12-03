import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Aux from '../../hoc/Auxilary';

class BurgerBuilder extends Component {
  render() {
    return (
      <Aux>
        <div>Burger</div>
        <div>Buidler Controls</div>
      </Aux>
    );
  }
}

BurgerBuilder.propTypes = {

};


export default BurgerBuilder;
