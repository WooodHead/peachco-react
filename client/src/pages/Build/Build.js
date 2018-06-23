import React, { Component } from "react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import API from "../../utils/API";
import "./Build.css";


class Build extends Component {

    state =  {
        item: {}
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
        }
        label = label[0].toUpperCase() + label.substring(1);
        return label;
    };

    cleanLabels = (label) => {
        if(label[0] !== "id" || label[0] !== "createdAt" || label[0] !== "updatedAt"){
            return label;
        }
    }

    updateItem = (id, data) => {
        API.updateItem(id, data)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="build-container">
                <form>
                    <div className="item-inputs">
                        {
                            ((Object.entries(this.state.item)).filter(n => n[0]!== "id").filter(n => n[0] !== "createdAt").filter(n => n[0] !== "updatedAt"))
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
                    <div className="build-button-section">
                    <Button onClick={() => this.updateItem(this.state.item.id, this.state.item)} name="Update"/>
                    </div>
                </form>
            
            </div>

        )
        
    }


}

export default Build;