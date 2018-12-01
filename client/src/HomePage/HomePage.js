
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions/index';

class HomePage extends React.Component {


    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }


    render() {
        const { user, users } = this.props;
        if (!user) {
            window.location.reload();
        }
        return (
            <div>
                <h1>Home Page</h1>
                <h2>User token: {user.token}</h2>
                <h2>User id: {user.id}</h2>
                <h2>User firstName: {user.firstName}</h2>
                <h2>User lastName: {user.lastName}</h2>
                <h2>User role: {user.role}</h2>
                <Link to="/login">Log Out</Link>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };