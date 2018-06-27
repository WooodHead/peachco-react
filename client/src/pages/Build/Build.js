import React, { Component } from "react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import API from "../../utils/API";
import "./Build.css";
//import userSettings from "./settings.json";

class Build extends Component {
  state = {
    item: {},
    settings: {
      customId: "",
      categoryId: "",
      duration: "",
      listingType: "",
      quantity: 1,
      itemDescription: "this is the where the template goes",
      packageSize: "",
      lbs: "",
      oz: "",
      shippingCost: "",
      condition: "",
      startPrice: "",
      categories: ""
    }
  };

  componentDidMount() {
    API.getItemById(this.props.match.params.id)
      .then(res => {
          this.getCategory(res.data.type).then(categoryData => {
          const settings = { ...this.state.settings };
          settings.categories = categoryData;
          this.setState({
            item: res.data,
            settings: settings
          });
        });
      })
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    const { item } = this.state;
    const newItem = {
      ...item,
      [event.target.name]: event.target.value
    };
    this.setState({
      item: newItem
    });
  };

  handleInputChangeForSettings = propertyName => event => {
    const { settings } = this.state;
    const newSettings = {
      ...settings,
      [propertyName]: event.target.value
    };
    this.setState({
      settings: newSettings
    });
  };

  labelize = label => {
    let expr = label.substring(0, 2);
    switch (expr) {
      case "f_":
        label = "features";
        break;
      case "s_":
        label = "size";
        break;
      case "m_":
        label = "materials";
        break;
      case "pi":
        label = "stock";
        break;
      case "sk":
        label = "SKU";
        break;
      case "it":
        label = "Title";
        break;
      case "se":
        label = "Photo";
        break;
      default:
        break;
    }
    label = label[0].toUpperCase() + label.substring(1);
    return label;
  };
  
  updateItem = obj => {
      console.log("obj");
    API.updateItem(obj.id, obj.data)
      .then(function(res) {
        return res;
      })
      .catch(err => console.log(err));
  };

  getCategory = query => {
      let promise = new Promise(function(resolve, reject) {
        API.getCategories({ query: query })
        .then(res => {
            if (res.data.Ack === "Success") {
                resolve(res.data.SuggestedCategorys);
            }
            else if (res.data.severityCode === "Error"){
                resolve("error");
            }
            else {
                reject("error");
            }
        })
      })
      return promise;
    

  };

  listItem = data => event => {
    event.preventDefault();
    const combined = Object.assign(

      this.state.item
    );
    console.log(combined);
    // API.listItem({data})
    // .then(res => console.log(res))
    // .catch(err => console.log(err));
  };

  getPrice = retail => {
    this.setState({ settings: { categories: retail * 0.25 } });
  };

  render() {
    let updateItemParameters = {id: this.state.item.id, data: this.state.item};
    console.log(updateItemParameters);
    return (
      <div className="build-container">
        <form>
          <div className="inputs-wrapper">
            <div className="item-inputs db-info">
              {Object.entries(this.state.item)
                .filter(n => n[0] !== "id")
                .filter(n => n[0] !== "createdAt")
                .filter(n => n[0] !== "updatedAt")
                .map(property => (
                  <Input
                    key={property[0]}
                    value={property[1] ? property[1] : ""}
                    name={property[0]}
                    func={this.handleInputChange}
                    parameter={property[0]}
                  >
                  {this.labelize(property[0])}
                  </Input>
                ))}
            </div>
            <div className="item-inputs specific-info">
              <h3>Template</h3>
              <select size="10" style={{ width: "100%" }}>
                <option>2</option>
                <option>1</option>
                <option>4</option>
                <option>6</option>
                <option>9</option>
              </select>
              <h3>Category</h3>
              <select size="10" style={{ width: "100%" }}>
                <option>1</option>
                <option>4</option>
                <option>6</option>
                <option>9</option>
              </select>
              {/*<Input labelname="Item #" name="Item #" />
              <Input
                labelname="StartPrice"
                name="StartPrice"
                value={
                  this.state.settings.startPrice
                    ? this.state.settings.startPrice
                    : ""
                }
                onChange={this.handleInputChangeForSettings("startPrice")}
              />
              <Input
                labelname="Condition"
                name="Condition"
                value={
                  this.state.settings.condition
                    ? this.state.settings.condition
                    : ""
                }
                onChange={this.handleInputChangeForSettings("condition")}
              />
              <Input
                labelname="Condition"
                name="Condition"
                value={
                  this.state.settings.condition
                    ? this.state.settings.condition
                    : ""
                }
                onChange={this.handleInputChangeForSettings("condition")}
              />
              <Input
                labelname="Duration"
                name="Duration"
                value={
                  this.state.settings.duration
                    ? this.state.settings.duration
                    : ""
                }
                onChange={this.handleInputChangeForSettings("duration")}
              />
              <Input
                labelname="ListType"
                name="ListType"
                value={
                  this.state.settings.listingType
                    ? this.state.settings.listingType
                    : ""
                }
                onChange={this.handleInputChangeForSettings("listingType")}
              />{" "}
              {/* this should change the start price dynamically
              <Input
                labelname="Quantity"
                name="Quantity"
                value={
                  this.state.settings.quantity
                    ? this.state.settings.quantity
                    : ""
                }
                onChange={this.handleInputChangeForSettings("quantity")}
            />*/}
            </div>
            <div className="build-button-section">
              <Button
                func={this.updateItem}
                parameter={updateItemParameters}
                name="Update"
              />
              <Button onClick={this.listItem()} name="AddItem" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Build;
