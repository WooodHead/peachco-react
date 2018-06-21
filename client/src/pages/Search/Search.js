import React, { Component } from "react";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import { Modal } from "../../components/Modal";
import API from "../../utils/API";
import "./Search.css";

class Search extends Component {
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

  buildItem = (id) => {
    window.location = "./build/" + id;
  }

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
                  onClick={this.loadItem(item.id)}
                />
              ))}
            </List>
        </div>
        {
          (this.state.showModal) ? 
            (
              <Modal 
                item={this.state.item}
                build={() => this.buildItem(this.state.item.id)}
                closeModal={() => this.closeModal()}
              >
              </Modal>
            ) : ("")
        }
      </section>
    );
  }
}

export default Search;
