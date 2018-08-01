export default {

    getPrice : (retail, type) => {

      let i = (retail * .03);
      i = (Math.round(i) * 10) - 2;

      if (type === "start"){
        return parseFloat(i).toFixed(2);
      }
      else if (type === "boMin"){
        if (i > 50 && i < 100){
          return parseFloat((i - 10).toFixed(2));
        } else {
          return parseFloat((i * .88)).toFixed(2);
        }
      } else if (type === "boAccept"){
        if (i > 50 && i < 100){
          return parseFloat((i-3).toFixed(2));
        } else {
          return parseFloat((i * .95).toFixed(2));
        }
        
      }

     },

     labelize : (label) => {
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
            label = "Item#";
            break;
          case "si":
            label = "Includes";
            break;
          default:
            break;
        }
        label = label[0].toUpperCase() + label.substring(1);
        return label;
      }

}