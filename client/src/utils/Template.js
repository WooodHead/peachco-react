export default {
    makeTemplate : (data) =>  {
        let features = "";
        let materials = "";
        let sizes = "";
        let conditions = "";
        let setIncludes = "";

        let template = `
        <h3>${data.item.brand} - ${data.item.collection}</h3>
        <p>${data.item.type}</p>
        <p>${data.item.color}</p>
        <p>${data.item.retail}</p>
        <p>${features}</p>
        <p>${materials}</p>
        <p>${sizes}</p>
        <p>${conditions}</p>
        <p>${setIncludes}</p>
        <p>${data.item.shippingCost}</p>
        <p>${data.item.secPic}</p>
        `;
        return template;
    },

    addDescription : (data) => {
        let itemDescription = this.makeTemplate(data);
        const { settings } = data;
        let newSettings = {
          ...settings,
          itemDescription: itemDescription
        };
        data.settings = newSettings;
        return data;
      },

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
          label = "Photo";
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