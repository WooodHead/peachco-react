import React, { Component } from "react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import API from "../../utils/API";
import "./Build.css";
import settings from "./settings.json";


class Build extends Component {

    state =  {
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
            startPrice: ""
        }
    }

    componentDidMount() {
        API.getItemById(this.props.match.params.id)
        .then(res => this.setState(
            { 
              item: res.data
            }
          ))
          .catch(err => console.log(err));
    }

    handleInputChange = (propertyName) => event => {
        const { item } = this.state;
        const newItem = {
            ...item,
            [propertyName]: event.target.value
        };
        this.setState({
          item: newItem
        });
      };

      handleInputChangeForSettings = (propertyName) => event => {
        const { settings } = this.state;
        console.log(propertyName);
        const newSettings = {
            ...settings,
            [propertyName]: event.target.value
        };
        // console.log(newSettings);
        this.setState({
          settings: newSettings
        });
      };

    labelize = (label) => {
        let expr = label.substring(0,2);
        switch(expr) {
            case "f_":
                label = "features"
                break;
            case "s_":
                label = "size"
                break;
            case "m_":
                label = "materials"
                break;
            case "pi":
                label = "stock"
                break;
            case "sk":
                label = "SKU"
                break;
            case "it":
                label = "Title"
                break;
            case "se":
                label = "Photo"
                break;
            default: break;
        }
        label = label[0].toUpperCase() + label.substring(1);
        return label;
    };

    updateItem = (id, data) => event => {
        event.preventDefault();
        API.updateItem(id, data)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    getCategory = (query) => event => {
        event.preventDefault();
        API.getCategories({query: query})
        .then(res => console.log(res.data.SuggestedCategorys))
        .catch(err => console.log(err));
    }

    listItem = (data) => event => {
        event.preventDefault();
        const combined = Object.assign(settings, this.state.item, this.state.settings);
        console.log(combined);
        // API.listItem({data})
        // .then(res => console.log(res))
        // .catch(err => console.log(err));
    }

    getPrice = (retail) => event =>{
        event.preventDefault();
        return retail * .25;
    }

    render() {
        return (
            <div className="build-container">
                <form>
                    <div className="inputs-wrapper">
                        <div className="item-inputs db-info">
                        {
                            Object.entries(this.state.item)
                            .filter(n => n[0]!== "id")
                            .filter(n => n[0] !== "createdAt")
                            .filter(n => n[0] !== "updatedAt")
                            .map(property => (
                            <Input
                            key={property[0]}
                            value={(property[1]) ? (property[1]) : ("")}
                            name={property[0]}
                            labelname={this.labelize(property[0])}
                            onChange={this.handleInputChange(property[0])}
                        />
                        )
                        )}
                        </div>
                        <div className="item-inputs specific-info">
                            <Input labelname="Item #" name="Item #" />
                            <Input labelname="StartPrice" name="StartPrice" value={this.state.settings.startPrice} onChange={this.handleInputChangeForSettings("startPrice")}/>
                            <Input labelname="Condition" name="Condition" value={this.state.settings.condition} onChange={this.handleInputChangeForSettings("condition")}/>
                            <Input labelname="Condition" name="Condition" value={this.state.settings.condition} onChange={this.handleInputChangeForSettings("condition")}/>
                            <Input labelname="Template" name="Template"/>
                            <Input labelname="Duration" name="Duration" value={this.state.settings.duration} onChange={this.handleInputChangeForSettings("duration")}/>
                            <Input labelname="ListType" name="ListType" value={this.state.settings.listingType} onChange={this.handleInputChangeForSettings("listingType")}/> {/* this should change the start price dynamically*/}
                            <Input labelname="Quantity" name="Quantity" value={this.state.settings.quantity} onChange={this.handleInputChangeForSettings("quantity")}/>
                        </div>
                        <div className="build-button-section">
                            <Button onClick={this.updateItem(this.state.item.id, this.state.item)} name="Update"/>
                            <Button onClick={this.getCategory(this.state.item.type)} name="Get Category"/>
                            <Button onClick={this.listItem()} name="AddItem"/>
                        </div>
                    
                    </div>
 
                </form>
            
            </div>

        )
        
    }


}

export default Build;