import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../css/LoginPage.css'
import '../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import { Link } from 'react-router-dom';
import { userActions } from '../actions';

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            id: '',
            password: '',
            newPass: '',
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
        const { id, password, newPassword } = this.state;
        const { dispatch } = this.props;
        if (id && password && newPassword) {
            dispatch(userActions.resetPass(id, password, newPassword));
        }
    }

    render() {
        const { loggedIn } = this.props;
        const { id, password, submitted, newPassword } = this.state;
        let checkLogin = (<div>
            { loggedIn ? <Redirect to='/' /> : null }
        </div>);

        return (
            <div class="limiter">
            { checkLogin }
                <div class="container-login100">
                    <div class="wrap-login100">
                        <form method="post" class="login100-form validate-form"/>
                        <span class="login100-form-logo">
                            <i class="fa fa-address-card"></i>
                        </span>
                        <span class="login100-form-title p-b-34 p-t-27">
                         Reset Password
                        </span>

                        <div class="wrap-input100 validate-input" data-validate="Enter User ID">
                        <input class="input100" type="text" name="id" placeholder="ID" value={id} onChange={this.handleChange}/>
                        {submitted && !id &&
                            <div id="empty-fields" className="help-block">ID is required</div>
                        }
                        <span class="focus-input100" ><i id="icon" class="fa fa-address-book"/></span>
                        </div>

                        <div class="wrap-input100 validate-input" data-validate="Enter Password">
                        <input class="input100" type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange}/>
                        {submitted && !password &&
                            <div id="empty-fields" className="help-block">password is required</div>
                        }
                        <span class="focus-input100" ><i id="icon" class="fa fa-key "/></span>
                        </div>

                        <div class="wrap-input100 validate-input" data-validate="Enter A New Password">
                        <input class="input100" type="password" name="newPassword" placeholder="New Password" value={newPassword} onChange={this.handleChange}/>
                        {submitted && !newPassword &&
                            <div id="empty-fields" className="help-block">password is required</div>
                        }
                        <span class="focus-input100" ><i id="icon" class="fa fa-key "/></span>
                        </div>

                        <div class="container-login100-form-btn">
                            <button class="login100-form-btn" onClick={this.handleSubmit}>
                            Submit
                            </button>
                        </div>
                        <Link to="/login" >Cancel</Link>
                    </div>
                </div>

            </div>

        );
    }
}

function mapStateToProps(state) {
    const { loggedIn } = state.authentication;
    return {
        loggedIn
    };
}

const connectedResetPasswordpage = connect(mapStateToProps)(ResetPassword);
export { connectedResetPasswordpage as ResetPassword }; 