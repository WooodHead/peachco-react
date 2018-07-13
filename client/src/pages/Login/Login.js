import React, { Component } from "react";
import { Button } from "../../components/Button/Button";
import { Modal } from "../../components/Modal/Modal";
import { ModalLogin } from "../../components/ModalBodies/ModalLogin";

import "./Login.css";

class Login extends Component {

    state= {
        showModal: false
    }

    LoginButtons =[
        {
          func: this.doSomething,
          parameter: "hello",
          name: "Login"
        }
    ];

    showModal = () => {
        this.setState({
            showModal: true
        })
    }

    closeModal = () => {
        this.setState({
            showModal: false
        })
    }

    render() {

        return(
            <div className="login-wrapper">
                <div className="button-div">
                    <Button
                        func={this.showModal}

                        name="Log In"
                    >
                    </Button>
                </div>
                <div className="background-div">
                </div>
                {
                    (this.state.showModal) ? 
                      (
                        <Modal 
                          closeModal={this.closeModal}
                          redirect={false}
                          buttons={this.LoginButtons}
                          item={this.state.item}
                        >
                          <ModalLogin/>
                        </Modal>
                      ) : ("")
                  }
            </div>
        )
        
    }
}

export default Login;