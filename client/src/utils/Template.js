import Template from "./Template";

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
        let itemDescription = Template.makeTemplate(data);
        const { settings } = data;
        let newSettings = {
          ...settings,
          itemDescription: itemDescription
        };
        data.settings = newSettings;
        return data;
    },

    makeObject : (data) => {
        let pictureArray = [];

        if(data.pic !== ""){
            pictureArray.push(`http://www.thepeachco.com/ebay/images/sticky/${data.pic}/1.jpg`);
        }
        if (data.numPics > 0){
            for (let i = 1; i < parseInt(data.numPics, 10)+1; i++){
                pictureArray.push(`http://www.thepeachco.com/ebay/images/${data.secPic}/${i}.jpg`);
            }
        }
        
        let EbayObject = {
            'Item': {
                ConditionDescription: data.conditionDescription,
                ConditionID: data.condition,
                Country: data.country,
                Currency: data.currency,
                Description: data.itemDescription,
                DispatchTimeMax: data.dispatchTime,
                ItemSpecifics: {
                    NameValueList: [
                        {
                            Name: "Brand",
                            Value: [data.brand]
                        },
                        {
                            Name: "Size",
                            Value: data.s_1
                        },
                        {
                            Name: "Color",
                            Value: data.color
                        },
                        {
                            Name: "Material",
                            Value: data.m_1
                        },
                        {
                            Name: "Retail",
                            Value: data.retail
                        }
                    ]
                },
                ListingDuration: data.duration,
                ListingType: data.listingType,
                Location: "<![CDATA[US]]>",
                PaymentMethods: data.paymentMethods,
                PayPalEmailAddress: data.paypalEmailAddress,
                PictureDetails:{
                        PictureURL: pictureArray
                },
                PrimaryCategory: {
                    CategoryID: data.category
                },
                ProductListingDetails: {
                    UPC: data.sku
                },
                Quantity: data.quantity,
                RegionID: data.regionId,
                ReturnPolicy: {
                    ReturnsAcceptedOption: data.returnsAcceptedOption,
                    ReturnsWithinOption: data.returnsWithinOption,
                    RefundOption: data.refundOption,
                    ShippingCostPaidByOption: data.shippingCostPaidByOption,
                    RestockingFeeValueOption: data.restockingFee
                    
                },
                ShippingDetails: {
                    CalculatedShippingRate: {
                        OriginatingPostalCode: data.originatingPostalCode,
                        ShippingIrregular: data.shippingIrregular,
                        WeightMajor: data.shippingWeight + ".0",
                        WeightMinor: 0
                    },
                    ShippingServiceOptions: {
                        ShippingService: data.shippingService,
                        ShippingServicePriority: data.shippingServicePriority,
                        ShippingServiceCost: data.shippingCost
                    },
                    InternationalShippingServiceOption: {
                        ShippingService: data.internationalShippingService,
                        ShippingServicePriority: data.internationalShippingServicePriority,
                        ShipToLocation: data.internationalShipToLocation,
                    },
                    ShippingType: data.internationalShippingType
                },
                ShipToLocations: data.shipToLocations,
                SKU: data.customId,
                StartPrice: data.startPrice,
                ShippingTermsInDescription: data.ShippingTermsInDescription,
                Title: data.itemTitle
            }

        }
        return EbayObject;

    }


}