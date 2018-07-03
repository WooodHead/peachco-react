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
                        CategoryID: req.body.category
                    },
                    Country: req.body.country,
                    Condition: "new",
                    conditionID: 1000,
                    Currency: req.body.currency,
                    ListingDuration: req.body.duration,
                    ListingType: req.body.listingType,
                    Location: "<![CDATA[US]]>",
                    PaymentMethods: req.body.paymentMethods,
                    ProductListingDetails: {
                        UPC: req.body.sku
                    },
                    Quantity: req.body.quantity,
                    RegionID: req.body.regionId,
                    ReturnPolicy: {
                        ReturnsAcceptedOption: req.body.returnsAcceptedOption,
                        ReturnsWithinOption: req.body.returnsWithinOption,
                        RefundOption: req.body.refundOption,
                        ShippingCostPaidByOption: req.body.shippingCostPaidByOption,
                        RestockingFeeValueOption: req.body.restockingFee
                        
                    },
                    DispatchTimeMax: req.body.dispatchTime,
                    StartPrice: req.body.startPrice,
                    ShippingTermsInDescription: req.body.ShippingTermsInDescription,
                    Title: req.body.itemTitle,
                    PictureDetails: {
                        PictureURL: "http://www.thepeachco.com/ebay/images/" + req.body.pic + ".jpg"
                    },
                    ItemSpecifics: {
                        NameValueList: [
                            {
                                Name: "Brand",
                                Value: [req.body.brand]
                            },
                            {
                                Name: "Size",
                                Value: req.body.s_1
                            },
                            {
                                Name: "Color",
                                Value: req.body.color
                            },
                            {
                                Name: "Material",
                                Value: req.body.m_1
                            },
                            {
                                Name: "Retail",
                                Value: req.body.retail
                            }
                        ]
                    },
                    Description: "this is a test",
                    ShipToLocations: req.body.shipToLocations,
                    ShippingDetails: {
                        CalculatedShippingRate: {
                            OriginatingPostalCode: req.body.originatingPostalCode,
                            ShippingIrregular: req.body.shippingIrregular,
                            WeightMajor: req.body.weight+ ".0",
                            WeightMinor: 0
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



    },

    addImage: function(req, res) {

        ebay.xmlRequest({
            serviceName: 'Trading',
            opType: 'UploadSiteHostedPictures',

            // app/environment
            devId: dev_id,
            certId: cert_id,
            appId: app_id,
            sandbox: false,

            // per user
            authToken: user_token,

            params: {
                'PictureName': req.body.query,
                'PictureSet': sdfsdf,
                // 'ExtensionInDays' 30
                // 'ExternalPictureURL': "",
                'PictureName': req.body.secPic
            },

            reqOptions: {
                url: 'http://example.com',
                method: 'POST',
                formData: {
                  'regularField': 'someValue',
                  'regularFile': someFileStream,
                  'customBufferFile': {
                    value: fileBufferData,
                    options: {
                      filename: 'myfile.bin'
                    }
                  }
                }

            }
        }, function(err, results){
            if(err){
                res.json(err);
            } else {
                res.json(results);
            }
        }
        )

    }


};