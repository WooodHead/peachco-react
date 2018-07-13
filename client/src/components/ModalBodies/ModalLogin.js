import React from "react";
import { Input } from "../Input/Input";
import "./ModalLogin.css";

export const ModalLogin = props => {
    return(
        <div>
            <form>
                <div className="modal-login-wrapper">
                    <div className="modal-login-title"><p>Please log in.</p></div>
                    <div className="modal-login-user">
                        <Input
                            value={props.username}
                            func={props.func}
                            name="username"
                        >Username
                        </Input>
                    </div>
                    <div className="modal-login-pass">
                        <Input
                            value={props.password}
                            func={props.func}
                            name="password"
                            password={true}
                        >
                        Password
                        </Input>
                    </div>
                    <div className="modal-login-aside">graphic</div>
                </div>
            </form>

        </div>
    )
}