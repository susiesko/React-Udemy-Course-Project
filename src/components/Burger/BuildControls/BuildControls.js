import React from 'react';
import PropTypes from 'prop-types';

import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.module.css';

const buildControls = props => (
    <div className={classes.BuildControls}>
        <BuildControl label="hello!"/>
    </div>
);;

buildControls.propTypes = {

};

export default buildControls;
