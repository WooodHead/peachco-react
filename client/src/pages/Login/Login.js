import React, { Component } from "react";
import { Button } from "../../components/Button/Button";
import { Modal } from "../../components/Modal/Modal";
import { ModalLogin } from "../../components/ModalBodies/ModalLogin";
import {Redirect} from "react-router-dom";


import loginUtils from "../../utils/loginUtils";

import "./Login.css";

import backgroundImage from "../../images/login-background.jpeg";

class Login extends Component {

    state= {
        showModal: false,
        username: "",
        password: "",
        isLoggedIn: false
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };

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

    login = () => {
        loginUtils
          .login({username: this.state.username, password: this.state.password})
          .then(res => {
            console.log(res.data);
            this.setState({isLoggedIn: res.data})
    
          })
          .catch(err => console.log(err.response));
      }

    render() {

        if (this.state.isLoggedIn) {
            return <Redirect to="/Search"/>
          }

        const LoginButtons = [
            {
              func: this.login,
              name: "Login"
            }
        ];

        return(
            <div className="login-wrapper">
                <div className="button-div">
                    <Button
                        func={this.showModal}
                        name="Log In"
                    >
                    </Button>
                </div>
                <div className="background-div" style={{background: `url(${backgroundImage})`}}>
                </div>
                {
                    (this.state.showModal) ? 
                      (
                        <Modal 
                          closeModal={this.closeModal}
                          redirect={false}
                          buttons={LoginButtons}
                          item={this.state.item}
                        >
                          <ModalLogin
                            username={this.state.username}
                            password={this.state.password}
                            func={this.handleInputChange}
                          />
                        </Modal>
                      ) : ("")
                  }
            </div>
        )
        
    }
}

export default Login;