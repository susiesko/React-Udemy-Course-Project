import React, { useEffect, useState } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilary/Auxilary';

const withErrorHandler = ( WrappedComponent, axios ) => {
  return props =>  {
    const [error, setError] = useState(null);

    const reqInterceptor = axios.interceptors.request.use(req => {
      setError(null);
      return req;
    });

    const resInterceptor = axios.interceptors.response.use(res => res, err => {
      setError(err);
      return Promise.reject(err);
    });

    useEffect(() => {
      return () => { // clean up requests and responses on unmount
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);        
      }
    }, [reqInterceptor, resInterceptor]);    

    const errorConfirmedHandler = () => setError(null);

    return (
      <Aux>
        <Modal 
          show={error}
          modalClosed={errorConfirmedHandler}>
          { error ? error.message : null }
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  }
};

export default withErrorHandler;
