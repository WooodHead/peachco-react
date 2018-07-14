import React from "react";
import { Input } from "../Input/Input";
import "./ModalLogin.css";
import logo from "../../images/logo.jpg";

export const ModalLogin = props => {
    return(
        <div>
            <form>
                <div className="modal-login-wrapper">
                    <div className="modal-login-title"><p>Please log in.</p></div>
                    <div className="modal-login-inputs">
                        <Input
                            value={props.username}
                            func={props.func}
                            name="username"
                        >Username
                        </Input>
                        <Input
                            value={props.password}
                            func={props.func}
                            name="password"
                            password={true}
                        >
                        Password
                        </Input>
                    </div>
                    <div className="modal-login-aside">
                        <img src={logo} height="150"/>
                    </div>
                </div>
            </form>

        </div>
    )
}