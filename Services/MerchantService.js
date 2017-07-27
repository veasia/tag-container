class MerchantService{
    constructor(docDBService) {
        this.docDBService = docDBService
    }
    
    getMerchants(merchantId, callback) {
        var self = this;
        
        var querySpec;

        if(!merchantId || merchantId.length<1){
            querySpec = {
                query: 'SELECT * FROM root r'
            };
        }
        else{
            querySpec = {
                query: 'SELECT * FROM root r WHERE r.id = @id',
                parameters: [{
                    name: '@id',
                    value: merchantId
                }]
            };
        }
        self.docDBService.find(querySpec, callback);
    }

    addMerchant(body, callback) {
        var self = this;
        
        var item = body;

        self.docDBService.addItem(item, callback);
    }

    updateMerchant(body, callback) {
        var self = this;

        var item = body;

        self.docDBService.updateItem(item, callback);
    }
}

module.exports = MerchantService;