var azure = require('azure-storage');
var config = require('../config.js').blob;

module.exports = {
    createOrUpdateFile: function(blobname, text, callback){
        const blobSvc = azure.createBlobService(config.live.account, config.live.key);
        const options = {
        	contentSettings: {
        		contentType: 'application/javascript'
        	}
        };
        blobSvc.createBlockBlobFromText(config.live.container, blobname, text, options, callback);
    }

    //TODO: create the SANDBOX HERE
}