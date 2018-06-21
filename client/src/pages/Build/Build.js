import React, { Component } from "react";
import { Input, FormBtn } from "../../components/Form";
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

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };

    render() {
        return (
            <div className="build-container">
                <form>
                    <div className="item-inputs">
                        <Input
                            defaultValue={this.state.item.sku}
                            name="sku"
                            onChange={this.handleInputChange}
                        />
                        <Input
                            defaultValue={this.state.item.brand}
                            name="brand"
                            onChange={this.handleInputChange}
                        />
                        <Input
                            defaultValue={this.state.item.collection}
                            name="collection"
                            onChange={this.handleInputChange}
                        />
                        <Input
                            defaultValue={this.state.item.type}
                            name="type"
                            onChange={this.handleInputChange}
                        />
                        <Input
                            defaultValue={this.state.item.color}
                            name="color"
                            onChange={this.handleInputChange}
                        />
                        <Input
                            defaultValue={this.state.item.f_1}
                            name="f_1"
                            onChange={this.handleInputChange}
                        />
                        <Input
                            defaultValue={this.state.item.f_2}
                            name="f_2"
                            onChange={this.handleInputChange}
                        />
                        <Input
                            defaultValue={this.state.item.f_3}
                            name="f_3"
                            onChange={this.handleInputChange}
                        />
                        <Input
                            defaultValue={this.state.item.f_4}
                            name="f_4"
                            onChange={this.handleInputChange}
                        />
                        <Input
                            defaultValue={this.state.item.f_5}
                            name="f_5"
                            onChange={this.handleInputChange}
                        />
                        <Input
                            defaultValue={this.state.item.f_6}
                            name="f_6"
                            onChange={this.handleInputChange}
                        />
                        <Input
                            defaultValue={this.state.item.f_7}
                            name="f_7"
                            onChange={this.handleInputChange}
                        />
                        <Input
                            defaultValue={this.state.item.f_8}
                            name="f-8"
                            onChange={this.handleInputChange}
                        />
                        <Input
                            defaultValue={this.state.item.f_9}
                            name="f_9"
                            onChange={this.handleInputChange}
                        />
                        <Input
                            defaultValue={this.state.item.pic}
                            name="pic"
                            onChange={this.handleInputChange}
                        />
                        <Input
                            defaultValue={this.state.item.s_1}
                            name="s_1"
                            onChange={this.handleInputChange}
                        />
                        <Input
                            defaultValue={this.state.item.s_2}
                            name="s_2"
                            onChange={this.handleInputChange}
                        />
                        <Input
                            defaultValue={this.state.item.s_3}
                            name="s_3"
                            onChange={this.handleInputChange}
                        />
                        <Input
                            defaultValue={this.state.item.s_4}
                            name="s_4"
                            onChange={this.handleInputChange}
                        />
                        <Input
                            defaultValue={this.state.item.s_5}
                            name="s_5"
                            onChange={this.handleInputChange}
                        />
                        <Input
                            defaultValue={this.state.item.s_6}
                            name="s_6"
                            onChange={this.handleInputChange}
                        />
                        <Input
                            defaultValue={this.state.item.s_7}
                            name="s_7"
                            onChange={this.handleInputChange}
                        />
                        <Input
                            defaultValue={this.state.item.s_8}
                            name="s_8"
                            onChange={this.handleInputChange}
                        />
                        <Input
                            defaultValue={this.state.item.m_1}
                            name="m_1"
                            onChange={this.handleInputChange}
                        />
                        <Input
                            defaultValue={this.state.item.m_2}
                            name="m_2"
                            onChange={this.handleInputChange}
                        />
                        <Input
                            defaultValue={this.state.item.retail}
                            name="retail"
                            onChange={this.handleInputChange}
                        />
                        <Input
                            defaultValue={this.state.item.itemTitle}
                            name="itemTitle"
                            onChange={this.handleInputChange}
                        />
                        <Input
                            defaultValue={this.state.item.secPic}
                            name="secPic"
                            onChange={this.handleInputChange}
                        />
                        
                    </div>
                    <div>
                    <FormBtn>Next</FormBtn>
                    </div>
                </form>
            
            </div>

        )
        
    }




}

export default Build;