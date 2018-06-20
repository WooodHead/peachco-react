import React, { Component } from "react";
import API from "../../utils/API";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class ItemList extends Component {
  state = {
    items: [],
    query: ""
  };

  componentDidMount() {
    this.loadItems();
  }

  loadItems = () => {
    API.getItemsByQuery(this.state.query)
      .then(res => this.setState({ items: res.data }))
      .catch(err => console.log(err));
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
        <form>
          <Input
          value={this.state.query}
          onChange={this.handleInputChange}
          name="query"
          placeholder="search for something (required)"
          />
          <FormBtn
            disabled={!(this.state.query)}
            onClick={this.handleFormSubmit}
            >
            Search
          </FormBtn>
        </form>
        <List>
          {this.state.items.map(item => (
            <ListItem
              key={item.id}
              brand={item.brand}
              collection={item.collection}
              type={item.type}
              color={item.color}
            />
          ))}
        </List>
      </section>
    );
  }
}

export default ItemList;
