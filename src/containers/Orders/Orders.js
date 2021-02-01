import React, { Component } from 'react'
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import * as actionTypes from '../../store/actions';
import axios from '../../axiosOrders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let ordersBody = <Spinner/>;
    
    if (!this.props.loading){
      ordersBody = this.props.orders.map(order => 
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price} />);
    }

    return (
      <div>
        { ordersBody }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.orders.orders,
  loading: state.orders.loading,
  token: state.auth.token,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: (token, userId) => dispatch(actionTypes.fetchOrders(token, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
