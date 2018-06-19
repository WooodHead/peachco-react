var Quagga = require('quagga');

module.exports = function (app) {

    app.get("/barcode/", function(req, res) {

        console.log("barcode route hit");

        // let fileInput = req.body.data;
    
        // Quagga.decodeSingle({
        //     src: fileInput,
        //     numOfWorkers: 0,  // Needs to be 0 when used within node
        //     inputStream: {
        //         size: 800  // restrict input-size to be 800px in width (long-side)
        //     },
        //     decoder: {
        //         readers: ["code_128_reader"] // List of active readers
        //     },
        // }, function(result) {
        //     if(result.codeResult) {
        //         console.log("result", result.codeResult.code);
        //     } else {
        //         console.log("not detected");
        //     }
        // });
    
    
    })
    
    
    // Quagga.init({
    //     inputStream : {
    //       name : "Live",
    //       type : "LiveStream",
    //       target: document.querySelector('#file-input')    // Or '#yourElement' (optional)
    //     },
    //     decoder : {
    //       readers : ["code_128_reader"]
    //     }
    //   }, function(err) {
    //       if (err) {
    //           console.log(err);
    //           return
    //       }
    //       console.log("Initialization finished. Ready to start");
    //       Quagga.start();
    //   });
}


