import React from 'react';
import PropTypes from 'prop-types';

import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.module.css';

const controls = [
    {label: 'Meat', type: 'meat'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
];

const buildControls = props => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
        { controls.map((ctrl) => (
            <BuildControl 
                key={ctrl.type} 
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        )) }
        <button 
            className={classes.OrderButton} 
            onClick={props.checkout} 
            disabled={!props.purchasable}>ORDER NOW</button>
    </div>
);

buildControls.propTypes = {

};

export default buildControls;
