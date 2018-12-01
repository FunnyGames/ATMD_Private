import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../css/login2.scss'


import { userActions } from '../actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            password: '',
            submitted: false,
            error: false
            
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
           // this.setState({error: true});
        }
        
    }

    render() {
        const { loggedIn } = this.props;
        const { id, password, submitted } = this.state;
        let checkLogin = (<div>
                { loggedIn ? <Redirect to='/' /> : null }
            </div>);
        
        return (
            <div class="limiter">
                { checkLogin }

                <div className="book">
                    <div className="book-form">
                        <form method="post" className="form">
                            <h1>Wolcome To AMTD</h1>
                            <h4>Please Log In</h4>

                            <div class="form-group" >
                                <input className="form-input" type="text" name="id" placeholder="ID" value={id} onChange={this.handleChange}/>
                                <label className="form-label" htmlFor="id">ID</label>
                                 {submitted && !id &&
                                     <div id="empty-fields" className="help-block">ID is required</div>
                                 }
                            </div>  
                            <div className="form-group" >
                                <input className="form-input" type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange}/>
                                   <label className="form-label" htmlFor="passwords">Password</label>
                                    {submitted && !password &&
                                      <div id="empty-fields" className="help-block">password is required</div>
                                     }
                            </div>
                            <button className="btn btn-black" onClick={this.handleSubmit}>Log-In</button>
                        </form>
                    </div>
                    <Link to="/reset">Reset Password</Link>
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

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 