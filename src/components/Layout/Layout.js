import React from 'react';

import Aux from '../../hoc/Auxilary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import classes from './Layout.module.css';

const Layout = (props) => (
  <Aux>
    <div>
      <Toolbar/>
      {/* Toolbar, SideDrawer, Backdrop */}
      <SideDrawer/>
    </div>
    <main className={classes.Content}>
      {props.children}
    </main>
  </Aux>
);

export default Layout;