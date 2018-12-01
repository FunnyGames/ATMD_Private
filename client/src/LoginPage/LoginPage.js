import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../css/LoginPage.css'

import { userActions } from '../actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            id: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { id, password } = this.state;
        const { dispatch } = this.props;
        if (id && password) {
            dispatch(userActions.login(id, password));
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { id, password, submitted } = this.state;
        return (
            <div class="limiter">
                <div class="container-login100">
                 <div class="wrap-login100">
                    <div class="login100-form-title">
                        <span class="login100-form-title-1">
                            Sign In
                        </span>
                    </div>
                    <form class="login100-form validate form">
                        <div class="wrap-input100 validate-input m-b-26" data-validate="Username is required">
                            <span class="label-input100">ID</span>
                            <input class="input100" type="text" name="id" placeholder="Enter ID" value={id} onChange={this.handleChange}></input>
                            <span class="focus-input100"></span>
                        </div>

                        <div class="wrap-input100 validate-input m-b-18" data-validate = "Password is required">
                            <span class="label-input100">Password</span>
                            <input class="input100" type="password" name="pass" placeholder="Enter Password" value={password} onChange={this.handleChange}></input>
                            <span class="focus-input100"></span>
                        </div>

                        <div class="flex-sb-m w-full p-b-30"> 
                            <div class="contact100-form-checkbox">
                                <input class="input-checkbox100" id="ckb1" type="checkbox" name="remember-me"></input>
                                <label class="label-checkbox100" for="ckb1">
								Remember me
							    </label>
                            </div>

                            <div>
                            <Link to="/reset" class="txt1">Reset Password</Link>
                            </div>
                            
                            <div class="container-login100-form-btn">
                                <button class="login100-form-btn" onSubmit={this.handleSubmit}>
                                    Login
                                </button>

                            </div>
                        </div>
                    </form>
                 </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 