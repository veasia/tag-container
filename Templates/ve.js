module.exports = (journeycode) => {
	const journeycodeTransformed = journeycode.replace(/-/g,'/');
	const configSubdomain = 'configch2';
	
	return `!function(){var a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src="//${configSubdomain}.veinteractive.com/tags/${journeycodeTransformed}/tag.js";var b=document.getElementsByTagName("head")[0];if(b)b.appendChild(a,b);else{var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)}}();`;
};
