//Components
import React, { Component } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { List, ListItem } from "../../components/List";
import LinkButton from "../../components/Button/LinkButton";
import { Modal } from "../../components/Modal";
import { ModalItemInfo }  from "../../components/ModalBodies/ModalItemInfo";
import { Redirect } from "react-router-dom";

//Functions
import API from "../../utils/API";
import LoginAPI from "../../utils/loginUtils";
//CSS
import "./Search.css";

class Search extends Component {

  state = {
    items: [],
    item: [],
    query: "",
    showModal: false,
    username: "",
    isLoggedIn: true,
  };

  componentDidMount() {
    this.loginCheck();
  }

  loadItems = () => {
    API.getItemsByQuery(this.state.query)
      .then(res => this.setState({ items: res.data }))
      .catch(err => console.log(err));
  };

  loadItem = id => {
    API.getItemByIdExact(id)
      .then(res => this.setState(
        { 
          item: res.data, 
          showModal: true
        }
      ))
      .catch(err => console.log(err));
  };

  closeModal = () => {
    this.setState({showModal: false});
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = () => {
    if (this.state.query) {
      API.getItemsByQuery({
        query: this.state.query
      })
        .then(res => this.loadItems())
        .catch(err => console.log(err));
    }
  };

  loginCheck = () => {
    LoginAPI
      .loginCheck()
      .then(res => this.setState({
        isLoggedIn: res.data.isLoggedIn, username: res.data.username
      }))
      .catch(err => {
        console.log(err);
        this.setState({isLoggedIn: false})
      })
  };

  logout = () => {
    LoginAPI
      .logout()
      .then(() => {
        this.setState({
          isLoggedIn: false
        })
      })
  }

  render() {

    if (!this.state.isLoggedIn) {
      return <Redirect to="/"/>
    }

    const itemInfoButtons =[
      {
        to: "/build/",
        type: "similar",
        name: "Similar",
      },
      {
        to: "/build/",
        type: "exact",
        name: "Exact",
      }
    
    ];

    return (
      <section>
        <div className="search-form-container">
          <div className="floating-logout">
            <Button
              name="Log Out"
              func={this.logout}
            />
          </div>
          <form>
            <div className="search-form-wrapper">
              <div className="search-input-wrapper">
                <Input
                  key="search"
                  value={this.state.query}
                  name="query"
                  func={this.handleInputChange}
                  label="search-label"
                  input="search-input"
                  labelWrapper="search-label-wrapper"
                >
                Search
                </Input>
              </div>
              <div className="search-button-wrapper">
                <Button
                  name="Search"
                  func={this.handleFormSubmit}
              />
              </div>
              <div className="new-button-wrapper">
                <LinkButton
                  to="/build/"
                  id="60"
                  type="new"
                  name="New"
                >
                New Listing
                </LinkButton>
              </div>
            </div>
          </form>
        </div>
        <div className="search-results-container">
            <List>
              {this.state.items.map(item => (
                <ListItem
                  key={item.id}
                  id={item.id}
                  brand={item.brand}
                  collection={item.collection}
                  type={item.type}
                  color={item.color}
                  pic={item.pic}
                  secpic={item.secPic}
                  onClick={() => this.loadItem(item.id)}
                />
              ))}
            </List>
        </div>
        {
          (this.state.showModal) ? 
            (
              <Modal 
                closeModal={this.closeModal}
                redirect={true}
                buttons={itemInfoButtons}
                item={this.state.item}

              >
                <ModalItemInfo
                  item={this.state.item}
                />
              </Modal>
            ) : ("")
        }
      </section>
    );
  }
}

export default Search;
