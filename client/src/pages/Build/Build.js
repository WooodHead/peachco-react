import React, { Component } from "react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Redirect } from 'react-router-dom'
import API from "../../utils/API";
import "./Build.css";
import userSettings from "./settings.json";

class Build extends Component {
  state = {
    item: {},
    settings: {
      conditionDescription: "",
      condition: "",
      customId: "",
      duration: "Days_7",
      listingType: "Chinese",
      quantity: 1,
      itemDescription: "this is the where the template goes",
      startPrice: "",
      categories: "",
      category: ""
    },
    templates: {},
    template: {},
    isUpdated: false,
    redirect: false
  };

  componentDidMount() {
    if(this.props.match.params.type === "exact"){
      API.getItemByIdExact(this.props.match.params.id)
      .then(res => {
        if (res.data.type !== ""){
          this.getCategory(res.data.type).then(categoryData => {
            this.getShippingTemplates().then(templates => {
              const settings = { ...this.state.settings };
              settings.categories = categoryData;
              settings.category = categoryData[0].Category.CategoryID;
              let template = {};
              if (res.data.packageSizeId) {
                template = templates[res.data.packageSizeId - 1];
              }
              this.setState({
                item: res.data,
                settings: settings,
                templates: templates,
                template: template
              });
            });
          });
        }
      })
      .catch(err => console.log(err));

    } else if (this.props.match.params.type === "similar"){
      API.getItemByIdSimilar(this.props.match.params.id)
      .then(res => {
        this.getShippingTemplates().then(templates => {
          const settings = { ...this.state.settings };
          let template = {};
          if (res.data.packageSizeId) {
            template = templates[res.data.packageSizeId - 1];
          }
          this.setState({
            item: res.data,
            settings: settings,
            templates: templates,
            template: template
          });
        });
      })
      .catch(err => console.log(err));

    } else if (this.props.match.params.type === "new"){
      API.getItemByIdNew()
      .then(res => {
        this.getShippingTemplates().then(templates => {
          const settings = { ...this.state.settings };
          let template = {};
          if (res.data.packageSizeId) {
            template = templates[res.data.packageSizeId - 1];
          }
          this.setState({
            item: res.data,
            settings: settings,
            templates: templates,
            template: template
          });
        });
      })
      .catch(err => console.log(err));
    }
  }

  handleInputChangeforItem = event => {
    const { item } = this.state;
    const newItem = {
      ...item,
      [event.target.name]: event.target.value
    };
    let template = {};
    if(event.target.name === "packageSizeId"){
      template = this.state.templates[event.target.value - 1];
    }
    this.setState({
      item: newItem,
      template: template
    });
  };

  handleInputChangeforSettings = event => {
    const { settings } = this.state;
    const newSettings = {
      ...settings,
      [ event.target.name ]: event.target.value
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
      case "si":
        label = "Includes";
        break;
      default:
        break;
    }
    label = label[0].toUpperCase() + label.substring(1);
    return label;
  };

  updateItem = obj => {
    API.updateItem(obj.id, obj.data)
      .then(function(res) {
        return res;
      })
      .catch(err => console.log(err));
  };

  addToDatabase = (obj) => {
    API.addToDatabase(obj)
    .then(res => {
      this.setState(
        {
          redirect: true,
          newID: res.data.id
        });
    })
    .catch(err => {
      console.log(err);
    })
  }

  getCategory = query => {
    let promise = new Promise(function(resolve, reject) {
      API.getCategories({ query: query }).then(res => {
        if (res.data.Ack === "Success") {
          resolve(res.data.SuggestedCategorys);
        } else if (res.data.severityCode === "Error") {
          resolve("error");
        } else {
          reject("error");
        }
      });
    });
    return promise;
  };

  getShippingTemplates = () => {
    let promise = new Promise(function(resolve, reject) {
      API.getShippingTemplates()
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
    return promise;
  };

  listItem = data => {
    const combined = Object.assign(data.item, data.settings, data.template, userSettings);
    console.log(combined);
    API.listItem(combined)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  getPrice = retail => {
     let startPrice =  (retail * .25);
     return parseFloat(startPrice).toFixed(2);
  };

  render() {
    let updateItemParameters = {
      id: this.state.item.id,
      data: this.state.item
    };
    const { redirect } = this.state;
    if(redirect) {
      this.setState({redirect: false});
      return <Redirect to={"/build/exact/" + this.state.newID}/>;
    }
    return (
      <div className="build-container">
        <form>
          <div className="inputs-wrapper">
            <div className="item-inputs db-info">
              {Object.entries(this.state.item)
                .filter(n => n[0] !== "id")
                .filter(n => n[0] !== "packageSizeId")
                .filter(n => n[0] !== "createdAt")
                .filter(n => n[0] !== "updatedAt")
                .map(property => (
                  <Input
                    key={property[0]}
                    value={property[1] ? property[1] : ""}
                    name={property[0]}
                    func={this.handleInputChangeforItem}
                    parameter={property[0]}
                  >
                    {this.labelize(property[0])}
                  </Input>
                ))}
            </div>
            <div className="item-inputs specific-info">
              <h3>Shipping Templates</h3>
              <select
                value={
                  (this.state.item.packageSizeId)
                    ? (this.state.item.packageSizeId)
                    : ("")
                }
                name="packageSizeId"
                onChange={this.handleInputChangeforItem}
                size="15"
                style={{ width: "100%" }}
              >
                {this.state.templates.length
                  ? this.state.templates.map(template => (
                      <option key={template.id} value={template.id}>
                        {template.type}
                      </option>
                    ))
                  : ""}
              </select>
              <h3>Category</h3>
              <select
                value={this.state.settings.category}
                onChange={this.handleInputChangeforSettings}
                name="category"
                size="15"
                style={{ width: "100%" }}
              >
                {this.state.settings.categories
                  ? this.state.settings.categories.map(cat => (
                      <option
                        key={cat.Category.CategoryID}
                        value={cat.Category.CategoryID}
                      >
                        {cat.Category.CategoryName} - Relevance:{" "}
                        {cat.PercentItemFound}%
                      </option>
                    ))
                  : ""}
              </select>
              <h3>Listing Type</h3>
              <select
                value={this.state.settings.listingType}
                onChange={this.handleInputChangeforSettings}
                name="listingType"
              >
                <option value="Chinese">Auction</option>
                <option value="FixedPriceItem">Fixed</option>
              </select>
              <h3>Duration</h3>
              <select
                value={this.state.settings.duration}
                onChange={this.handleInputChangeforSettings}
                name="duration"
              >
                <option value="Days_5">5</option>
                <option value="Days_7">7</option>
                <option value="Days_30">30</option>
                <option value="GTC">GTC</option>
              </select>
              <h3>Condition</h3>
              <select
                size="8"
                style={{width: "100%"}}
                value={this.state.settings.condition}
                onChange={this.handleInputChangeforSettings}
                name="condition"
              >
                  <option value="1000">New</option>
                  <option value="1750">Open, No Packaging, or Display</option>
                  <option value="3000">Washed or Used</option>
              </select>
              <h3>Condition Description</h3>
              <textarea rows="4" style={{width: "100%"}}
                  value={this.state.settings.conditionDescription}
                  onChange={this.handleInputChangeforSettings}
                  name="conditionDescription"
              />
              <Input
                value={this.state.settings.quantity}
                func={this.handleInputChangeforSettings}
                parameter="quantity"
                name="quantity"
              >
                Quantity
              </Input>
              <Input
                value={(this.state.item.retail !== "") ? (this.getPrice(parseFloat(this.state.item.retail))) : ("0")}
                func={this.handleInputChangeforSettings}
                parameter="startPrice"
                name="startPrice"
              >
                StartPrice
              </Input>
              <Input
                value={this.state.settings.customId}
                func={this.handleInputChangeforSettings}
                parameter="customId"
                name="customId"
              >
                CustomID
              </Input>
            </div>
            <div className="build-button-section">
              <Button
                func={this.updateItem}
                parameter={updateItemParameters}
                name="Update"
              />
              <Button
                func={this.listItem}
                parameter={this.state}
                name="List Item"
              />
              <Button
              func={this.addToDatabase}
              parameter={this.state.item}
              name="Add to Database"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Build;
