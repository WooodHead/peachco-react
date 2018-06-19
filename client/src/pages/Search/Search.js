import React, { Component } from "react";
import API from "../../utils/API";
import { List, ListItem } from "../../components/List";

class ItemList extends Component {
  state = {
    items: []
  };

  componentDidMount() {
    this.loadItems();
  }

  loadItems = () => {
    API.getItemsByQuery("charter")
      .then(res => this.setState({ items: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    return (
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
    );
  }
}

export default ItemList;
