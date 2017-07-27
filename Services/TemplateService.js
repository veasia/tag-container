var containerTag = require ('../Templates/containerTag.js');
var veTag = require ('../Templates/ve.js');
var theTradeDeskTag = require ('../Templates/ttd.js');

module.exports = class TemplateService {
	static getContainerTag (domainUrl, merchantId) {
		return containerTag(domainUrl, merchantId);
	}

	static getVeTag (journeycode) {
		return veTag(journeycode);
	}

	static getTheTradeDeskTag (ttdConfigJSON) {
		return theTradeDeskTag(ttdConfigJSON);
	}
};
