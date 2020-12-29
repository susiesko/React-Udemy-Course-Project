import React, { Component } from 'react';

import Aux from '../../hoc/Auxilary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import classes from './Layout.module.css';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  }

  sideDrawerOpenHandler = () => {
    this.setState({ showSideDrawer: true });
  }

  render() {
    return (
      <Aux>
        <div>
          <Toolbar sideDrawerOpened={this.sideDrawerOpenHandler}/>
          {/* Toolbar, SideDrawer, Backdrop */}
          <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
        </div>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

export default Layout;