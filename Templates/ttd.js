module.exports = (ttdConfigJSON) => {
	
	var script = `!function(){var a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src="//idev1blob.blob.core.windows.net/scripts/ads_tool_script.js";var b=document.getElementsByTagName("head")[0];if(b)b.appendChild(a,b);else{var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)}}();`;
	script += `(function(){if(!window.iTagContainer){window.iTagContainer = {}}window.iTagContainer.settings = ${ttdConfigJSON};})();`
	return script;
};
