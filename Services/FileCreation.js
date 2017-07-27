var BlobService = require('./BlobService.js');
var TemplateService = require('./TemplateService.js');
var UglifyJS = require('uglify-js');
var config = require('../config.js');

function isProductionEnv() {
	return true;
}

module.exports = class FileCreation {
	constructor (merchantId) {
		this.merchantId = merchantId;
		this.fileName = merchantId + '/container.js';
		this.content = ''; //TODO: add comments with the date and time
	}

	_appendContent (content) {
		this.content = `${this.content};${content}`;
	}


	create (content, callback) {
		if (content.veEnabled && content.veJourneycode) {
	    	this._appendContent(TemplateService.getVeTag(content.veJourneycode));
	    }

		if(content.ttdEnabled && content.ttdConfig){
			var ttdConfigJSON, ttdConfigJSONStr;
			try{
				ttdConfigJSON = JSON.parse(content.ttdConfig);
				ttdConfigJSONStr = JSON.stringify(ttdConfigJSON);
			}catch(ex){
				return callback("Error: cannot parse setting JSON")
			}
			this._appendContent(TemplateService.getTheTradeDeskTag(ttdConfigJSONStr));
		}
	    //TODO: For TTD
		// if (content.ttdEnable) {
	 	//    	this._appendContent(TemplateService.getVeTag(content.veJourneycode));
	 	//    }

	 	if (content.script) {
	 		const contentSanitized = FileCreation.minify(content.script);
	 		if (!contentSanitized) {
				return callback(`Error creating the TAG, please check the content`);
			}
			this._appendContent(contentSanitized);
	 	}
	 	return callback(null, this.content);
	}

	deploy(callback) {
		const merchantId = this.merchantId;

	    BlobService.createOrUpdateFile(this.fileName, this.content, (error, result, response) => {
	    	if (error) {
	    		return callback(error);
	    	}
			else{
				console.log(`${new Date()} Container tag ${result.name} has been created`);
				return callback(null, TemplateService.getContainerTag(config.blob.live.url, merchantId));
			}
	    });

	}

	static minify (code) {
		const options = {};
		let result = UglifyJS.minify(code, options)

		if (result.error) {
			console.error(`${new Date()} Error deploying container: ${result.error}`)
			return false;
		} else {
			if(result.warnings) console.warn(`${new Date()} Warnings: ${result.warnings}`);

			if (isProductionEnv()) {
				return result.code
			} else {
				return code;
			}
		}
	}
}

