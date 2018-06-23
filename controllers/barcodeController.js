var Quagga = require('quagga').default;
const path = require("path");

module.exports = {

    decode: function(req, res){

        console.log("barcode route hit");

        let fileInput = req.file;
    
        Quagga.decodeSingle({
            src: path.join(__dirname, "./IMG_0630.jpg"),
            numOfWorkers: 0,  // Needs to be 0 when used within node
            locate: true,
            inputStream: {
                size: 800  // restrict input-size to be 800px in width (long-side)
            },
            decoder: {
                readers: ["code_128_reader"] // List of active readers
            },
        }, function(result) {
            if(result.codeResult) {
                res.json(result.codeResult.code);
            } else {
                res.json(result);
            }
        });

    }

}




