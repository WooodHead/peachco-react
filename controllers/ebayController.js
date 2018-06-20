require("dotenv").config();

const ebay = require('ebay-api');
const keys = require("../keys");

//const uri = "https://api.sandbox.ebay.com/ws/api.dll";
const dev_id = keys.ebay.dev_id;
const app_id = keys.ebay.app_id;
const cert_id = keys.ebay.cert_id;
const user_token = keys.ebay.user_token;

module.exports = {

    getCategories: function(req, res){

        ebay.xmlRequest({
            serviceName: 'Trading',
            opType: 'GetSuggestedCategories',

            // app/environment
            devId: dev_id,
            certId: cert_id,
            appId: app_id,
            sandbox: false,

            // per user
            authToken: user_token,

            params: {
                'Query': req.body.query
            }
        }, function (error, results) {
            if (error) {
                //   console.log(error);
                res.json(error);
            } else {
                //   console.log(results.SuggestedCategorys);
                res.json(results);
            }
        });
    },

    addItem: function(req, res){

        let categoryId = "20460";
        let country = "";
        let currency = "";
        let duration = "";
        let type = "";
        let paymentMethods = "";
        let quantity = "";
        let regionId = "";
        let returnsAcceptedOption = "";
        let returnsWithinOption = "";
        let shippingCostPaidByOption = "";
        let restockingFee = "";
        let returnDescription = "";
        let dispatchTime = "";
        let startPrice = "10.00";
        let ShippingTermsInDescription = "";
        let itemTitle = "TEST TEST TEST TEST";
        let pictureUrl = "";
        let brand = "";
        let size = "";
        let color = "";
        let material = "";
        let retail = "";
        let itemDescription = "";
        let shipToLocations = "";
        let originatingPostalCode = "";
        let shippingIrregular = "";
        let packageSize = "";
        let lbs = "5";
        let oz = "0";
        let shippingService = "";
        let shippingServicePriority = "";
        let shippingCost = "";
        let internationalShippingService = "";
        let internationalShippingServicePriority = "";
        let internationalShipToLocation = "";
        let internationalShippingType = "";
        let paypalEmailAddress = "";
        let customId = "";

        ebay.xmlRequest({
            serviceName: 'Trading',
            opType: 'AddItem',

            // app/environment
            devId: dev_id,
            certId: cert_id,
            appId: app_id,
            sandbox: false,

            // per user
            authToken: user_token,

            params: {
                'Item': {
                    PrimaryCategory: {
                        CategoryID: categoryId
                    },
                    Country: country,
                    Currency: currency,
                    ListingDuration: duration,
                    ListingType: type,
                    Location: "<![CDATA[US]]>",
                    PaymentMethods: paymentMethods,
                    Quantity: quantity,
                    RegionID: regionId,
                    ReturnPolicy: {
                        ReturnsAcceptedOption: returnsAcceptedOption,
                        ReturnsWithinOption: returnsWithinOption,
                        ShippingCostPaidByOption: shippingCostPaidByOption,
                        RestockingFeeValueOption: restockingFee,
                        Description: returnDescription
                    },
                    DispatchTimeMax: dispatchTime,
                    StartPrice: startPrice,
                    ShippingTermsInDescription: ShippingTermsInDescription,
                    Title: `<![CDATA[${itemTitle}]`,
                    PictureDetails: {
                        PictureURL: pictureUrl
                    },
                    ItemSpecifics: {
                        NameValueList: {
                            Name: "Brand",
                            Value: `<![CDATA[${brand}]]`,
                            Name: "Size",
                            Value: `<![CDATA[${size}]]`,
                            Name: "Color",
                            Value: `<![CDATA[${color}]]`,
                            Name: "Material",
                            Value: `<![CDATA[${material}]]`,
                            Name: "Retail",
                            Value: `<![CDATA[${retail}]]`,
                        }
                    },
                    Description: itemDescription,
                    ShipToLocations: shipToLocations,
                    ShippingDetails: {
                        CalculatedShippingRate: {
                            OriginatingPostalCode: originatingPostalCode,
                            ShippingIrregular: shippingIrregular,
                            ShippingPackage: packageSize,
                            WeightMajor: lbs,
                            WeightMinor: oz
                        },
                        ShippingServiceOptions: {
                            ShippingService: shippingService,
                            ShippingServicePriority: shippingServicePriority,
                            ShippingServiceCost: shippingCost
                        },
                        InternationalShippingServiceOption: {
                            ShippingService: internationalShippingService,
                            ShippingServicePriority: internationalShippingServicePriority,
                            ShipToLocation: internationalShipToLocation,
                        },
                        ShippingType: internationalShippingType
                    },
                    PaymentMethods: paymentMethods,
                    PayPalEmailAddress: paypalEmailAddress,
                    SKU: customId
                }
            }
        }, function (error, results) {
            if (error) {
                console.log(error);
                res.json(error);
            } else {
                console.log(results.SuggestedCategorys);
                res.json(results);
            }
        });



    }


};