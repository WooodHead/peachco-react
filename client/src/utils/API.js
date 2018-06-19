import axios from "axios";

export default {
  getItemsByQuery: function(query) {
    return axios.get("/api/db/" + query);
  }
};