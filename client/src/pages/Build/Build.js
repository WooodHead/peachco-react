//Components
import axios from "axios";
import React, { Component } from "react";
import { Button } from "../../components/Button";
import { Category } from "../../components/Category";
import { ItemInfo } from "../../components/ItemInfo";
import { AdditionalPhotos, StockPhoto } from "../../components/Photos";
import { Redirect } from "react-router-dom";
import { ShippingTemplates } from "../../components/ShippingTemplates"; 
import { SpecificInfo } from "../../components/SpecificInfo";

//Functions
import API from "../../utils/API";
import LoginAPI from "../../utils/loginUtils";
import Helpers from "../../utils/Helpers";
import Template from "../../utils/Template";

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
    isUpdated: false,
    listId: this.props.location.state.id,
    listState: this.props.location.state.type,
    selectedFile: null,
    templates: {},
    template: {},
    isLoggedIn: true,
    username: ""
  };

  componentDidMount() {
    this.loginCheck();
    if(this.state.listState === "exact"){
      API.getItemByIdExact(this.state.listId)
      .then(res => {
        if (res.data.type !== ""){
          this.getCategory(res.data.type).then(categoryData => {
            this.getShippingTemplates().then(templates => {
              const { settings } =  this.state;
              let newCategories = [];
              let newCategory;
              if (categoryData.length > 1) {
                newCategories = categoryData;
                newCategory = categoryData[0].Category.CategoryID;
              } else {
                newCategories.push(categoryData);
                newCategory = categoryData.Category.CategoryID;
              }
              let template = {};
              if (res.data.packageSizeId) {
                template = templates[res.data.packageSizeId - 1];
              }
              const newSettings = {
                ...settings,
                categories: newCategories,
                category: newCategory
              }
              if (res.data.numPics === 0 || res.data.numPics === null || res.data.numPics === ""){
                if (res.data.secPic !== "" && res.data.secPic !== null){
                  res.data.numPics = 1
                } else if (res.data.secPic === "" || res.data.secPic === null){
                  res.data.numPics = 0;
                }
              }
              this.setState({
                item: res.data,
                settings: newSettings,
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
          if (res.data.numPics === 0 || res.data.numPics === null || res.data.numPics === ""){
            if (res.data.secPic !== ""){
              res.data.numPics = 1
            } else if (res.data.secPic === ""){
              res.data.numPics = 0;
            }
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
          if (res.data.numPics === 0 || res.data.numPics === null || res.data.numPics === ""){
            if (res.data.secPic !== ""){
              res.data.numPics = 1
            } else if (res.data.secPic === ""){
              res.data.numPics = 0;
            }
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

  fileSelectedHandler = (e, directive, number) =>{
    // console.log(e.target.files[0]);
    // this.setState({
    //   selectedFile: e.target.files[0]
    // })
    console.log(directive + number);
    const fd = new FormData();
    fd.append("image", e.target.files[0], e.target.files[0].name);
    fd.append("directory", this.state.item.secPic);
    if (directive === "add"){
      fd.append("number", (parseInt(this.state.item.numPics, 10) + 1));
      axios.post("/api/ftp/listdir/", fd).then(res => {
        console.log(res);
        this.addPic();
      })
    } else if (directive === "update"){
      console.log(number);
      fd.append("number", number);
      axios.post("api/ftp/listdir", fd).then(res => {
        console.log(res);
        this.updatePic();
      })


    }
  }

  loginCheck = () => {
    LoginAPI
      .loginCheck()
      .then(res => this.setState({
        isLoggedIn: res.data.isLoggedIn, username: res.data.username
      }))
      .catch(err => {
        console.log(err);
        this.setState({isLoggedIn: false})
      })
  };

  changeNumPics = num => {
    const { item } = this.state;
    const newItem = {
      ...item,
      numPics: num
    };
    this.setState({
      item: newItem
    })
  }

  addPic = () => {
    console.log("add");
    //this should change the number of pics and update state or something
    let numPics = parseInt(this.state.item.numPics, 10);
    numPics++;
    this.changeNumPics(numPics);
  }

  updatePic = () => {
    console.log("update pic");
    // this should update the state or something to re render
    let numPics = parseInt(this.state.item.numPics, 10);
    this.changeNumPics(numPics);
  }

  updateItem = obj => {
    API.updateItem(obj.id, obj.data)
      .then(res => {
        if(res.data.type){
          this.getCategory(res.data.type).then(categoryData => {
            const { settings } = this.state;
            let newCategories = [];
            let newCategory;
            if (categoryData.length > 1) {
              newCategories = categoryData;
              newCategory = categoryData[0].Category.CategoryID;
            } else {
              newCategories.push(categoryData);
              newCategory = categoryData.Category.CategoryID;
            }
            const newSettings = {
              ...settings,
              categories: newCategories,
              category: newCategory
            }
            this.setState({
              item: res.data,
              settings: newSettings
            });
          })
        }
      })
      .catch(err => console.log(err));
  };

  addToDatabase = (obj) => {
    API.addToDatabase(obj)
    .then(res => {
      if(res.data.type !== ""){
        this.getCategory(res.data.type).then(categoryData => {
          const { settings } =  this.state;
          let newCategories = [];
          let newCategory;
          if (categoryData.length > 1) {
            newCategories = categoryData;
            newCategory = categoryData[0].Category.CategoryID;
          } else {
            newCategories.push(categoryData);
            newCategory = categoryData.Category.CategoryID;
          }
          const newSettings = {
            ...settings,
            categories: newCategories,
            category: newCategory
          }
          const { item } = this.state;
          const newItem = {
            ...item,
            id: res.data.id
          }
          this.setState({
            listState: "exact",
            listId: res.data.id,
            item: newItem,
            settings: newSettings
          })
        })
      }
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

    if (!this.state.isLoggedIn) {
      return <Redirect to="/"/>
    }

    let updateItemParameters = {
      id: this.state.item.id,
      data: this.state.item
    };

    console.log(this.state);

    return (
      <div className="build-container">
        <form>
          <div className="inputs-wrapper">
            <ItemInfo
              data={this.state}
              labelize={Helpers.labelize}
              handleInputChangeforItem={this.handleInputChangeforItem}
            /> 
            <div className="item-inputs specific-info">
              <StockPhoto
                stockPic={this.state.item.pic}
                handleInputChangeforItem={this.handleInputChangeforItem}
              />
              {(this.state.item.secPic !== "" && this.state.item.secPic !== null) ? 
                (
                  <AdditionalPhotos
                  pic={this.state.item.pic}
                  secPic={this.state.item.secPic}
                  numPics={this.state.item.numPics}
                  changeNum={this.changeNumPics}
                  add={this.addPic}
                  update={this.updatePic}
                  fileSelectedHandler={this.fileSelectedHandler}
                />
                ) 
                : 
                ("")
              }
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
                getPrice={Helpers.getPrice}
              />
            </div>
          </div>
          <div>
            {(this.state.listState === "exact") ? (
              <div className="build-button-section">
                <div>
                  <Button
                    func={this.updateItem}
                    parameter={updateItemParameters}
                    name="Update"
                  />
                </div>
                <div>
                  <Button
                    func={this.listItem}
                    parameter={this.state}
                    name="List Item"
                  />
                </div>
              </div>
            ) : (
              <div className="build-button-section">
                <div>
                  <Button
                    func={this.addToDatabase}
                    parameter={this.state.item}
                    name="Add to Database"
                  />
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default Build;