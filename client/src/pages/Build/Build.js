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

      test = (event) => {
          event.preventDefault();
          console.log(this.state.item);
          
      }

    render() {
        return (
            <div className="build-container">
                <form>
                    <div className="item-inputs">
                        <Input
                            value={(this.state.item.sku) ? (this.state.item.sku) : ("")}
                            name="Sku"
                            labelname="SKU"
                            onChange={this.handleInputChange('sku')}
                        />
                        <Input
                            value={(this.state.item.brand) ? (this.state.item.brand) : ("")}
                            name="brand"
                            labelname="Brand"
                            onChange={this.handleInputChange('brand')}
                        />
                        <Input
                            value={(this.state.item.collection) ? (this.state.item.collection) : ("")}
                            name="collection"
                            labelname="Collection"
                            onChange={this.handleInputChange('collection')}
                        />
                        <Input
                            value={(this.state.item.type) ? (this.state.item.type) : ("")}
                            name="type"
                            labelname="Type"
                            onChange={this.handleInputChange('type')}
                        />
                        <Input
                            value={(this.state.item.color) ? (this.state.item.color) : ("")}
                            name="color"
                            labelname="Color"
                            onChange={this.handleInputChange('color')}
                        />
                        <Input
                            value={(this.state.item.f_1) ? (this.state.item.f_1) : ("")}
                            name="f_1"
                            labelname="Features"
                            onChange={this.handleInputChange('f_1')}
                        />
                        <Input
                            value={(this.state.item.f_2) ? (this.state.item.f_2) : ("")}
                            name="f_2"
                            labelname="Features"
                            onChange={this.handleInputChange('f_2')}
                        />
                        <Input
                            value={(this.state.item.f_3) ? (this.state.item.f_3) : ("")}
                            name="f_3"
                            labelname="Features"
                            onChange={this.handleInputChange('f_3')}
                        />
                        <Input
                            value={(this.state.item.f_4) ? (this.state.item.f_4) : ("")}
                            name="f_4"
                            labelname="Features"
                            onChange={this.handleInputChange('f_4')}
                        />
                        <Input
                            value={(this.state.item.f_5) ? (this.state.item.f_5) : ("")}
                            name="f_5"
                            labelname="Features"
                            onChange={this.handleInputChange('f_5')}
                        />
                        <Input
                            value={(this.state.item.f_6) ? (this.state.item.f_6) : ("")}
                            name="f_6"
                            labelname="Features"
                            onChange={this.handleInputChange('f_6')}
                        />
                        <Input
                            value={(this.state.item.f_7) ? (this.state.item.f_7) : ("")}
                            name="f_7"
                            labelname="Features"
                            onChange={this.handleInputChange('f_7')}
                        />
                        <Input
                            value={(this.state.item.f_8) ? (this.state.item.f_8) : ("")}
                            name="f_8"
                            labelname="Features"
                            onChange={this.handleInputChange('f_8')}
                        />
                        <Input
                            value={(this.state.item.f_9) ? (this.state.item.f_9) : ("")}
                            name="f_9"
                            labelname="Features"
                            onChange={this.handleInputChange('f_9')}
                        />
                        <Input
                            value={(this.state.item.pic) ? (this.state.item.pic) : ("")}
                            name="pic"
                            labelname="Stock Pic"
                            onChange={this.handleInputChange('pic')}
                        />
                        <Input
                            value={(this.state.item.s_1) ? (this.state.item.s_1) : ("")}
                            name="s_1"
                            labelname="Sizes"
                            onChange={this.handleInputChange('s_1')}
                        />
                        <Input
                            value={(this.state.item.s_2) ? (this.state.item.s_2) : ("")}
                            name="s_2"
                            labelname="Sizes"
                            onChange={this.handleInputChange('s_2')}
                        />
                        <Input
                            value={(this.state.item.s_3) ? (this.state.item.s_3) : ("")}
                            name="s_3"
                            labelname="Sizes"
                            onChange={this.handleInputChange('s_3')}
                        />
                        <Input
                            value={(this.state.item.s_4) ? (this.state.item.s_4) : ("")}
                            name="s_4"
                            labelname="Sizes"
                            onChange={this.handleInputChange('s_4')}
                        />
                        <Input
                            value={(this.state.item.s_5) ? (this.state.item.s_5) : ("")}
                            name="s_5"
                            labelname="Sizes"
                            onChange={this.handleInputChange('s_5')}
                        />
                        <Input
                            value={(this.state.item.s_6) ? (this.state.item.s_6) : ("")}
                            name="s_6"
                            labelname="Sizes"
                            onChange={this.handleInputChange('s_6')}
                        />
                        <Input
                            value={(this.state.item.s_7) ? (this.state.item.s_7) : ("")}
                            name="s_7"
                            labelname="Sizes"
                            onChange={this.handleInputChange('s_7')}
                        />
                        <Input
                            value={(this.state.item.s_8) ? (this.state.item.s_8) : ("")}
                            name="s_8"
                            labelname="Sizes"
                            onChange={this.handleInputChange('s_8')}
                        />
                        <Input
                            value={(this.state.item.m_1) ? (this.state.item.m_1) : ("")}
                            name="m_1"
                            labelname="Sizes"
                            onChange={this.handleInputChange('m_1')}
                        />
                        <Input
                            value={(this.state.item.m_2) ? (this.state.item.m_2) : ("")}
                            name="m_2"
                            labelname="Sizes"
                            onChange={this.handleInputChange('m_2')}
                        />
                        <Input
                            value={(this.state.item.retail) ? (this.state.item.retail) : ("")}
                            name="retail"
                            labelname="Retail"
                            onChange={this.handleInputChange('retail')}
                        />
                        <Input
                            value={(this.state.item.itemTitle) ? (this.state.item.itemTitle) : ("")}
                            name="itemTitle"
                            labelname="Title"
                            onChange={this.handleInputChange('itemTitle')}
                        />
                        <Input
                            value={(this.state.item.secPic) ? (this.state.item.secPic) : ("")}
                            name="secPic"
                            labelname="Pic"
                            onChange={this.handleInputChange('secPic')}
                        />
                        
                    </div>
                    <div className="build-button-section">
                    <Button onClick={this.test} name="Next"/>
                    </div>
                </form>
            
            </div>

        )
        
    }




}

export default Build;