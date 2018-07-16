import axios from "axios";

export default {
  getItemsByQuery: function(query) {
    return axios.get("/api/db/" + query);
  },
  getItemByIdExact: function(id) {
    return axios.get("/api/db/item/exact/" + id);
  },
  getItemByIdSimilar: function(id){
    return axios.get("/api/db/item/similar/" + id);
  },
  getItemByIdNew: function(id){
    return axios.get("/api/db/item/new");
  },
  addToDatabase: function(obj){
    return axios.post("/api/db/item", obj);
  },
  getShippingTemplates: function() {
    return axios.get("/api/db/shipping/templates");
  },
  updateItem: function(id, data){
    return axios.post("/api/db/item/update/" + id, data);
  },
  listItem: function(data) {
    return axios.post("/api/ebay/additem/", data);
  },
  getCategories: function(query) {
    return axios.post("/api/ebay/getcategories/", query);
  },
  uploadPic: function(data) {
    return axios.post("/api/ftp/listdir/", data);
  }


    
};