import React from 'react'

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'

import classes from './Toolbar.module.css';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
   {/*  <button onClick={props.sideDrawerOpened}>MENU</button> */}
    <a href="javascript:;" onClick={props.sideDrawerOpened}>MENU</a>
    <div className={classes.Logo}>
      <Logo/>
    </div>    
    <nav className={classes.DesktopOnly}><NavigationItems/></nav>
  </header>
);

export default toolbar;
