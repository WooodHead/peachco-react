import React, { Component } from "react";
import API from "../../utils/API";
import { List, ListItem } from "../../components/List";
import { Item } from "../../components/Item";
import { Input, FormBtn } from "../../components/Form";
import { Container } from "../../components/Container";
import { Modal } from "../../components/Modal";
import "./Search.css";

class ItemList extends Component {
  state = {
    items: [],
    item: [],
    query: "",
    showModal: false
  };

  componentDidMount() {
  }

  loadItems = () => {
    API.getItemsByQuery(this.state.query)
      .then(res => this.setState({ items: res.data }))
      .catch(err => console.log(err));
  };

  loadItem = id => {
    API.getItemById(id)
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

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.query) {
      API.getItemsByQuery({
        query: this.state.query
      })
        .then(res => this.loadItems())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <section>
        <div className="search-form-container">
          <form>
            <div className="search-form-wrapper">
              <Input
              value={this.state.query}
              onChange={this.handleInputChange}
              name="query"
              placeholder="search (required)"
              />
              <FormBtn
                disabled={!(this.state.query)}
                onClick={this.handleFormSubmit}
                >
                Search
              </FormBtn>
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
                  onClick={() => this.loadItem(item.id)}
                />
              ))}
            </List>
        </div>
        {
          (this.state.showModal) ? 
            (
              <Modal 
                onClick={this.closeModal}
                item={this.state.item}
              >
              </Modal>
            ) : ("")
        }
      </section>
    );
  }
}

export default ItemList;
