import React from "react";
import { Input } from "../Input/Input";

export const ModalLogin = props => {
    return(
        <div>
            <form>
                <div><p>Please log in.</p></div>
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
            </form>

        </div>
    )
}