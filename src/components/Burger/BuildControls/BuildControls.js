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
        { controls.map((ctrl) => (
            <BuildControl 
                key={ctrl.type} 
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
            />
        )) }
    </div>
);

buildControls.propTypes = {

};

export default buildControls;
