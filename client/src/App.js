import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { LoginPage } from './LoginPage'
import { history } from './helpers';
import { alertActions } from './actions';


class App extends React.Component {
  constructor(props) {
      super(props);

      const { dispatch } = this.props;
      history.listen((location, action) => {
          // clear alert on location change
          dispatch(alertActions.clear());
      });
  }

  render() {
      return (
             <Router history={history}>
                <div>
                   <Route path="/login" component={LoginPage} />
                </div>
             </Router>
      );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
      alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 
