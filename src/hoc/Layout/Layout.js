import React, { useState } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.module.css';

const Layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);  

  const sideDrawerClosedHandler = () => setShowSideDrawer(false);

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(prevVal => !prevVal)
  };

  return (
    <React.Fragment>
      <div>
        <Toolbar 
          isAuth={props.isAuthenticated} 
          drawerToggleClicked={sideDrawerToggleHandler}/>
        {/* Toolbar, SideDrawer, Backdrop */}
        <SideDrawer 
          isAuth={props.isAuthenticated} 
          open={showSideDrawer} 
          closed={sideDrawerClosedHandler}/>
      </div>
      <main className={classes.Content}>
        {props.children}
      </main>    
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
}

export default connect(mapStateToProps)(Layout);