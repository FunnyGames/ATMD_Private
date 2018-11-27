import React, { Component } from "react";
import MManager from '../components/MManager'
import Mworker from "../components/Mworker";
import Mclient from "../components/Mclient";

class Home extends Component {
 //   constructor(props) {
   //     super(props);
     //   this.getData();
   // }
    state = {
        id: undefined,
        role: "",
        token: "",
        role: "",
        firstName: "",
        lastName: "",
        auth: false,
        error: false
    };
    getData() {
        fetch("/users/userInfo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            response.json().then(j => {
                alert(JSON.stringify(j));
                this.setState({ id: j.id });
            })
        })
    }
    render() {
        return (
            <div>
                <h1>
                Welcome {this.state.firstName} {this.state.lastName}
                </h1>
                <h4>Your id is : {this.state.id}</h4>
                <h4>Your role is : {this.state.role}</h4>
                {this.state.role == "admin" ? <MManager /> : null}
                {this.state.role == "customer" ? <Mclient /> : null}
                {this.state.role == "worker" ? <Mworker /> : null}
                <button onClick={this.logout}>Log out</button>
            </div>
        );
    }
}
export default Home;