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
      }


}