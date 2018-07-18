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
                res.json(error);
            } else {
                res.json(results);
            }
        });
    },

    addItem: function(req, res){
        console.log(req.body);

        // ebay.xmlRequest({
        //     serviceName: 'Trading',
        //     opType: 'AddItem',

        //     // app/environment
        //     devId: dev_id,
        //     certId: cert_id,
        //     appId: app_id,
        //     sandbox: false,

        //     // per user
        //     authToken: user_token,

        //     params: req.body,

        //     reqOptions: {
        //         headers: {
        //           'X-Extra': 'um'
        //         }
        //     }
            
        // }, function (error, results) {
        //     if (error) {
        //         console.log("error sent");
        //         res.json(results);
        //     } else {
        //         console.log("result sent");
        //         res.send(results);
        //     }
        // });

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