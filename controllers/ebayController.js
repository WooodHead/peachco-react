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
                        CategoryID: req.body.categoryId
                    },
                    Country: req.body.country,
                    Currency: req.body.currency,
                    ListingDuration: req.body.duration,
                    ListingType: req.body.type,
                    Location: "<![CDATA[US]]>",
                    PaymentMethods: req.body.paymentMethods,
                    Quantity: req.body.quantity,
                    RegionID: req.body.regionId,
                    ReturnPolicy: {
                        ReturnsAcceptedOption: req.body.returnsAcceptedOption,
                        ReturnsWithinOption: req.body.returnsWithinOption,
                        ShippingCostPaidByOption: req.body.shippingCostPaidByOption,
                        RestockingFeeValueOption: req.body.restockingFee,
                        Description: req.body.returnDescription
                    },
                    DispatchTimeMax: req.body.dispatchTime,
                    StartPrice: req.body.startPrice,
                    ShippingTermsInDescription: req.body.ShippingTermsInDescription,
                    Title: `<![CDATA[${req.body.itemTitle}]`,
                    PictureDetails: {
                        PictureURL: req.body.pictureUrl
                    },
                    ItemSpecifics: {
                        NameValueList: {
                            Name: "Brand",
                            Value: `<![CDATA[${req.body.brand}]]`,
                            Name: "Size",
                            Value: `<![CDATA[${req.body.size}]]`,
                            Name: "Color",
                            Value: `<![CDATA[${req.body.color}]]`,
                            Name: "Material",
                            Value: `<![CDATA[${req.body.material}]]`,
                            Name: "Retail",
                            Value: `<![CDATA[${req.body.retail}]]`,
                        }
                    },
                    Description: req.body.itemDescription,
                    ShipToLocations: req.body.shipToLocations,
                    ShippingDetails: {
                        CalculatedShippingRate: {
                            OriginatingPostalCode: req.body.originatingPostalCode,
                            ShippingIrregular: req.body.shippingIrregular,
                            ShippingPackage: req.body.packageSize,
                            WeightMajor: req.body.lbs,
                            WeightMinor: req.body.oz
                        },
                        ShippingServiceOptions: {
                            ShippingService: req.body.shippingService,
                            ShippingServicePriority: req.body.shippingServicePriority,
                            ShippingServiceCost: req.body.shippingCost
                        },
                        InternationalShippingServiceOption: {
                            ShippingService: req.body.internationalShippingService,
                            ShippingServicePriority: req.body.internationalShippingServicePriority,
                            ShipToLocation: req.body.internationalShipToLocation,
                        },
                        ShippingType: req.body.internationalShippingType
                    },
                    PaymentMethods: req.body.paymentMethods,
                    PayPalEmailAddress: req.body.paypalEmailAddress,
                    SKU: req.body.customId
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