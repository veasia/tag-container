class DocumentDBService{
    constructor(client) {
        this.client = client;
        this.database = null;
        this.collection = null;
    }

    init(databaseId, collectionId, callback) {
        var self = this;
        self.getDatabase(databaseId, function (err, db) {
            if (err) {
                callback(err);
            } else {
                self.database = db;
                self.getCollection(self.database._self, collectionId, function (err, coll) {
                    if (err) {
                        callback(err);
                    } else {
                        self.collection = coll;
                    }
                });
            }
        });
    }

    getDatabase(databaseId, callback){
        var self = this;
        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.id= @id',
            parameters: [{
                name: '@id',
                value: databaseId
            }]
        };

        self.client.queryDatabases(querySpec).toArray(function (err, results) {
            if (err) {
                callback(err);

            } else {
                if (results.length === 0) {
                    console.error("DB not found!");
                } else {
                    callback(null, results[0]);
                }
            }
        });
    }

    getCollection(databaseLink, collectionId, callback) {
        var self = this;
        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.id=@id',
            parameters: [{
                name: '@id',
                value: collectionId
            }]
        };               

        self.client.queryCollections(databaseLink, querySpec).toArray((err, results) => {
            if (err) {
                callback(err);

            } else {        
                if (results.length === 0) {
                    console.error("collection not found!");
                } else {
                    callback(null, results[0]);
                }
            }
        });
    }

    find(querySpec, callback) {
        var self = this;

        self.client.queryDocuments(self.collection._self, querySpec).toArray(function (err, result) {
            self.handleError(err, result, callback)
        });
    }

    addItem(item, callback) {
        var self = this;

        item.date = new Date();
        self.getItemByName(item.MerchantName, (err, result)=>{
            if(result.length == 0){
                self.client.createDocument(self.collection._self, item, (err2, result) => {
                    self.handleError(err2, result, callback)
                });
            }
            else{
                var err = {body: "Merchant existed!"}
                self.handleError(err, result, callback)
            }
        })
    }

    updateItem(item, callback) {
        var self = this;

        self.getItem(item.id, (err, doc) => {
            if (err) {
                callback(err);

            } else {
                self.client.replaceDocument(doc[0]._self, item, (err2, result) => {
                    self.handleError(err2, result, callback)
                });
            }
        });
    }

    getItem(itemId, callback) {
        var self = this;

        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.id = @id',
            parameters: [{
                name: '@id',
                value: itemId
            }]
        };

        self.find(querySpec, callback);
    }

    getItemByName(itemName, callback) {
        var self = this;

        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.MerchantName = @name',
            parameters: [{
                name: '@name',
                value: itemName
            }]
        };

        self.find(querySpec, callback);
    }

    handleError(err, result, callback){
        if (err) {
            callback(err);

        } else {
            callback(null, result);
        }
    }
}

module.exports = DocumentDBService;