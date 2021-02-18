import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import axios from '../../axiosOrders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../shared/utility';

const Auth = props => {
  const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;
  const [isSignup, setIsSignup] = useState(false);
  const [controls, setControls] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email Address'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },      
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  });

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/'){
      onSetAuthRedirectPath();
    }
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

  const inputChangedHandler = (ev, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: ev.target.value,
        valid: checkValidity(ev.target.value, controls[controlName].validation),
        touched: true
      })
    });

    setControls(updatedControls);
  }

  const submitHandler = (ev) => {
    ev.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignup);
  }

  const switchAuthModeHandler = () => {
    setIsSignup(prevVal => !prevVal);
  }

  let formElementsArray = [];

  for (let key in controls){
    formElementsArray.push({
      id: key,
      config: controls[key]
    })
  };

  let form = formElementsArray.map(formElement => (
    <Input 
      key={formElement.id} 
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={(event) => inputChangedHandler(event, formElement.id)}/>
  ));
  
  let errorMessage = null;

  if(props.error){
    errorMessage = <p>{props.error.message}</p>;
  }

  if (props.loading && !props.error){
    form = <Spinner/>;
  }

  if (props.isAuth){
    return <Redirect to={props.authRedirectPath}/>;
  }

  return(
    <div className={classes.Auth}>
      { errorMessage }
      <form onSubmit={submitHandler}>
        { form }
        <Button btnType="Success">SUBMIT</Button>
      </form>
      <Button 
        btnType="Danger"
        clicked={switchAuthModeHandler} 
        >SWITCH TO {isSignup ? 'SIGN IN' : 'SIGN UP'}
      </Button>
    </div>
  );
}

const mapStateToProps = state => ({
  error: state.auth.error,
  loading: state.auth.loading,
  isAuth: state.auth.token !== null,
  buildingBurger: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath,
})

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
  onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));