export default {

    getPrice : (retail) => {
        let startPrice =  (retail * .25);
        return parseFloat(startPrice).toFixed(2);
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