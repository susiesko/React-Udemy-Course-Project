import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxilary/Auxilary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.module.css';

class Layout extends Component {
  state = {
    showSideDrawer: false,

  }

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };      
    });
  }

  render() {
    return (
      <Aux>
        <div>
          <Toolbar 
            isAuth={this.props.isAuthenticated} 
            drawerToggleClicked={this.sideDrawerToggleHandler}/>
          {/* Toolbar, SideDrawer, Backdrop */}
          <SideDrawer 
            isAuth={this.props.isAuthenticated} 
            open={this.state.showSideDrawer} 
            closed={this.sideDrawerClosedHandler}/>
        </div>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
}

export default connect(mapStateToProps)(Layout);