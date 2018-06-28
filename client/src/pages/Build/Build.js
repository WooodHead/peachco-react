import React, { Component } from "react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import API from "../../utils/API";
import "./Build.css";
import userSettings from "./settings.json";

class Build extends Component {
  state = {
    item: {},
    settings: {
      customId: "",
      duration: "",
      listingType: "",
      quantity: 1,
      itemDescription: "this is the where the template goes",
      condition: "",
      startPrice: "",
      categories: "",
      category: ""
    },
    templates: {},
    template: {}
  };

  componentDidMount() {
    API.getItemById(this.props.match.params.id)
      .then(res => {
          this.getCategory(res.data.type).then(categoryData => {
            this.getShippingTemplates().then(templates => {
              const settings = { ...this.state.settings };
              settings.categories = categoryData;
              settings.category = categoryData[0].Category.CategoryID;
              let template = {};
              if(res.data.packageSizeId){
                template =  templates[res.data.packageSizeId]
              }
              this.setState({
                item: res.data,
                settings: settings,
                templates: templates,
                template: template
              });
            })
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

    handleInputChangeforOptions = (event) => {
        const { settings } = this.state;
        const newSettings = {
            ...settings,
            category: event.target.value
        }
        this.setState({
            settings: newSettings
        });
    }

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

  handleInputChangeforTemplate = (event) => {
    const { item } = this.state;
    const newItem = {
      ...item,
      packageSizeId: event.target.value
    }
    this.setState({
      item: newItem
    })
  }

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

  getShippingTemplates = () => {
    let promise = new Promise(function(resolve, reject){
      API.getShippingTemplates()
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      })
    })
    return promise;
  }

  listItem = data => {
    const combined = Object.assign(
      data.item,
      data.template,
      userSettings
    );
    API.listItem(combined)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  };

  getPrice = retail => {
    this.setState({ settings: { categories: retail * 0.25 } });
  };

  render() {
    let updateItemParameters = {id: this.state.item.id, data: this.state.item};
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
              <h3>Shipping Templates</h3>
              <select value={(this.state.item.packageSizeId) ? (this.state.item.packageSizeId) : ("")} onChange={this.handleInputChangeforTemplate} size="15" style={{ width: "100%" }}>
              {
                (this.state.templates.length) ? 
                (
                  this.state.templates.map(template => 
                    <option
                    key={template.id}
                    value={template.id}
                    >
                    {template.type}
                    </option>
                  )
                ) : 
                ("")
              }

              </select>
              <h3>Category</h3>
              <select value={this.state.settings.category} onChange={this.handleInputChangeforOptions} size="15" style={{ width: "100%" }}>
              
              {
                (this.state.settings.categories) 
                ? 
                (
                  this.state.settings.categories.map(cat => (
                    <option
                    key={cat.Category.CategoryID}
                    value={cat.Category.CategoryID}
                    >
                    {cat.Category.CategoryName} - Relevance: {cat.PercentItemFound}%
                    </option>
                  )) 
                ) 
                : 
                ("")
              }
              </select>
              <h3>Listing Type</h3>
              <select>
                <option value="Auction">Auction</option>
                <option value="Fixed">Fixed</option>
              </select>
              <h3>Duration</h3>
              <select>
                <option value="">5</option>
                <option value="">7</option>
                <option value="">30</option>
                <option value="">GTC</option>
              </select>
              // <Input value="0" name="quantity">Quantity</Input>
              // <Input value="" name="duration">CustomId</Input>
              // <Input value="" name="startPrice">StartPrice</Input>
              <textarea value="the item description should go here maybe i dunno, maybe this should be a preview box"></textarea>
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
                name="AddItem" 
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Build;
