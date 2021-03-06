//Components
import React, { Component } from "react";
import { AdditionalPhotos, StockPhoto } from "../../components/Photos";
import { Button } from "../../components/Button";
import { Category } from "../../components/Category";
import { ItemInfo } from "../../components/ItemInfo";
import { Modal } from "../../components/Modal/Modal";
import { ModalListingConfirmed } from "../../components/ModalBodies/ModalListingConfirmed";
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
      boMin: "",
      boAccept: "",
      categories: "",
      category: "",
      conditionDescription: "",
      condition: "1000",
      customId: "",
      duration: "Days_7",
      itemDescription: "",
      listingType: "Chinese",
      quantity: 1,
      startPrice: ""

    },
    isUpdated: false,
    listId: this.props.location.state.id,
    listState: this.props.location.state.type,
    selectedFile: null,
    templates: {},
    template: {},
    isLoggedIn: true,
    username: "",
    listingConfirmed: false,
    listingConfirmation: "",
    imageLocation: "https://www.thepeachco.com/ebay/images/"
    
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
              let newStartPrice = "", newBoMin = "", newBoAccept = "";
              if (res.data.retail !== ""){
                newStartPrice = Helpers.getPrice(parseFloat(res.data.retail), "start");
                newBoMin = Helpers.getPrice(parseFloat(res.data.retail), "boMin");
                newBoAccept = Helpers.getPrice(parseFloat(res.data.retail), "boAccept");
              } 
              let apa = [];
              if (res.data.numPics > 0){
                for(let i = 0; i < res.data.numPics; i++){
                  const p = `https://www.thepeachco.com/ebay/images/${res.data.secPic}/${i+1}.jpg`
                  apa.push(p);
                }
              }       
              const newSettings = {
                ...settings,
                categories: newCategories,
                category: newCategory,
                startPrice: newStartPrice,
                boMin: newBoMin,
                boAccept: newBoAccept
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
                template: template,
                additionalPictures: apa
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
    let newTemplate = this.state.template;
    if(event.target.name === "packageSizeId"){
        newTemplate = this.state.templates[event.target.value - 1];
    }
    this.setState({
      item: newItem,
      template: newTemplate
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

  fileSelectedHandler = (e) =>{
    const fd = new FormData();
    fd.append("image", e.target.files[0], e.target.files[0].name);
    fd.append("directory", this.state.item.secPic);
    fd.append("number", (parseInt(this.state.item.numPics, 10) + 1));
    API.uploadPic(fd).then(res => {
      console.log(res);
      if(res.data === "success"){
        this.addPic();
      }
    })

  }

  fileSelectedHandlerUpdate = (i) => (e) => {
    const fd = new FormData();
    fd.append("image", e.target.files[0], e.target.files[0].name);
    fd.append("directory", this.state.item.secPic);
    fd.append("number", (parseInt(i, 10) + 1));
    API.uploadPic(fd).then(res => {
      console.log(res);
      // let np = `https://www.thepeachco.com/ebay/images/${this.state.item.secPic}/number.jpg`;

      if(res.data === "success"){
        this.setState({
          imageLocation: "https://www.thepeachco.com/ebay/images/"
        })
      }
    })
  }

  fileSelectedHandlerStock = (e) =>{
    const fd = new FormData();
    fd.append("image", e.target.files[0], e.target.files[0].name);
    fd.append("directory", `sticky/${this.state.item.pic}/`);
    fd.append("number", 1);
    API.uploadPic(fd).then(res => {
      console.log(res);
      if(res.data === "success"){
        this.addPic();
      }
    })
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

  logout = () => {
    LoginAPI
      .logout()
      .then(() => {
        this.setState({
          isLoggedIn: false
        })
      })
  }

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
    let listingData = JSON.parse(JSON.stringify(data));
    listingData = Template.addDescription(listingData);
    const combined = Object.assign(listingData.item, listingData.settings, listingData.template, userSettings);
    let ebayObject = Template.makeObject(combined);
    API.listItem(ebayObject)
      .then(res => {
        console.log(res);
        this.setState({
          listingConfirmed: true,
          listingConfirmation: res
        })
      })
      .catch(err => console.log(err));
  };

  closeModal = () => {
    this.setState({listingConfirmed: false});
  };

  render() {

    console.log(this.state.template);

    if (!this.state.isLoggedIn) {
      return <Redirect to="/"/>
    }

    let updateItemParameters = {
      id: this.state.item.id,
      data: this.state.item
    };

    const itemInfoButtons =[
      {
        to: "/search/",
        type: "Start Over",
        name: "Start Over",
      }
    
    ];

    return (
      <div className="build-container">
        <div className="floating-logout">
          <Button
            name="Log Out"
            func={this.logout}
          />
        </div>
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
                fileSelectedHandlerStock={this.fileSelectedHandlerStock}
              />
              {(this.state.item.secPic !== "" && this.state.item.secPic !== null) ? 
                (
                  <AdditionalPhotos
                  pic={this.state.item.pic}
                  imageLocation={this.state.imageLocation}
                  secPic={this.state.item.secPic}
                  numPics={this.state.item.numPics}
                  fileSelectedHandler={this.fileSelectedHandler}
                  fileSelectedHandlerUpdate={this.fileSelectedHandlerUpdate}
                  />
                ) 
                : 
                ("")
              }
              <ShippingTemplates
                packageSizeId={this.state.item.packageSizeId}
                handleInputChangeforItem={this.handleInputChangeforItem}
                templates={this.state.templates}
                template={this.state.template}
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
                    isDisabled={true}
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
        {
          (this.state.listingConfirmed) ? 
            (
              <Modal 
                closeModal={this.closeModal}
                redirect={true}
                buttons={itemInfoButtons}
                item={this.state.item}
              >
                <ModalListingConfirmed
                  response={this.state.listingConfirmation}
                />
              </Modal>
            ) : ("")
        }
      </div>
    );
  }
}

export default Build;