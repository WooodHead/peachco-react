//Components
import React, { Component } from "react";
import { Button } from "../../components/Button";
import { Category } from "../../components/Category";
import { ItemInfo } from "../../components/ItemInfo";
import { Input } from "../../components/Input";
import { ShippingTemplates } from "../../components/ShippingTemplates"; 
import { SpecificInfo } from "../../components/SpecificInfo";

//Functions
import Template from "../../utils/Template";
import API from "../../utils/API";

//CSS
import "./Build.css";

//Other
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
      itemDescription: "",
      startPrice: "",
      categories: "",
      category: ""
    },
    templates: {},
    template: {},
    isUpdated: false,
    listState: this.props.location.state.type,
    listId: this.props.location.state.id
  };

  componentDidMount() {
    if(this.state.listState === "exact"){
      API.getItemByIdExact(this.state.listId)
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

    } else if (this.state.listState === "similar"){
      API.getItemByIdSimilar(this.state.listId)
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

    } else if (this.state.listState === "new"){
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
      const { item } = this.state;
      const newItem = {
        ...item,
        id: res.data.id

      }
      this.setState({
        listState: "exact",
        listId: res.data.id,
        item: newItem
      })
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
    data = Template.addDescription(data);
    const combined = Object.assign(data.item, data.settings, data.template, userSettings);
    console.log(combined);
    // API.listItem(combined)
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
  };

  render() {
    let updateItemParameters = {
      id: this.state.item.id,
      data: this.state.item
    };
    return (
      <div className="build-container">
        <form>
          <div className="inputs-wrapper">
            <ItemInfo
              data={this.state}
              labelize={Template.labelize}
              handleInputChangeforItem={this.handleInputChangeforItem}
            /> 
            <div className="item-inputs specific-info">
            <ShippingTemplates
              packageSizeId={this.state.item.packageSizeId}
              handleInputChangeforItem={this.handleInputChangeforItem}
              templates={this.state.templates}
            >
              Shipping Templates
            </ShippingTemplates>
            <Category
              category={this.state.settings.category}
              categories={this.state.settings.categories}
              handleInputChangeforSettings={this.handleInputChangeforSettings}
            >
              Category
            </Category>
            <SpecificInfo 
              settings={this.state.settings}
              handleInputChangeforSettings={this.handleInputChangeforSettings}
              retail={this.state.item.retail}
              getPrice={Template.getPrice}
            />
          </div>
          </div>
          <div>
            {(this.state.listState === "exact") ? (
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
              </div>
            ) : (
              <div className="build-button-section">
              <Button
              func={this.addToDatabase}
              parameter={this.state.item}
              name="Add to Database"
              />
              </div>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default Build;