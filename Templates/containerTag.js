module.exports = (containerDomain, merchantId) => {
	return `(function(i,n,t,e,l,a){
		i._intlt=i._intlt||[];
		i._intlt.push(['timestamp',Date.now()]);
	    l=n.createElement('script');l.type='text/javascript';l.async=true;
	    l.src='//'+t+'/cont/'+e+'/container.js';
	    a=n.getElementsByTagName('script')[0];a.parentNode.insertBefore(l,a);
	})(window,document,'${containerDomain}','${merchantId}');`
};

