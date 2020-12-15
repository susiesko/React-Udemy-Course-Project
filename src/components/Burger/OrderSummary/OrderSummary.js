import React from 'react'
import PropTypes from 'prop-types'

import Aux from '../../../hoc/Auxilary';

const orderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
        return (<li key={igKey}>
            <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
        </li>);
    });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout</p>
            <button onClick={props.cancelClicked}>CANCEL</button>
            <button>CONTINUE</button>
        </Aux>
    )
};

orderSummary.propTypes = {

};

export default orderSummary;