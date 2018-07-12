import React, { Component } from "react";
import { Button } from "../../components/Button/Button";
import background from "./login-background.jpeg";

import "./Login.css";

class Login extends Component {

    state= {
        loginModal: false
    }

    render() {
        return(
            <div className="login-wrapper">
                <div className="button-div">
                    <Button
                        name="Log In"
                    >
                    </Button>
                </div>
                <div className="background-div">
                </div>
            </div>
        )
    }
}

export default Login;