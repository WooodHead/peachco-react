import axios from "axios";

export default {
  getItemsByQuery: function(query) {
    return axios.get("/api/db/" + query);
  },
  getItemById: function(id) {
    return axios.get("/api/db/item/" + id);
  },
  updateItem: function(id, data){
    return axios.post("/api/db/item/update/" + id, data);
  }
    
};