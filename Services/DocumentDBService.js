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

        self.client.queryCollections(databaseLink, querySpec).toArray(function (err, results) {
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

        self.client.queryDocuments(self.collection._self, querySpec).toArray(function (err, results) {
            if (err) {
                callback(err);

            } else {
                callback(null, results);
            }
        });
    }

    addItem(item, callback) {
        var self = this;

        item.date = new Date();

        self.client.createDocument(self.collection._self, item, function (err, doc) {
            if (err) {
                callback(err);

            } else {
                callback(null, doc);
            }
        });
    }

    updateItem(item, callback) {
        var self = this;

        self.getItem(item.id, function (err, doc) {
            if (err) {
                callback(err);

            } else {
                self.client.replaceDocument(doc._self, item, function (err, replaced) {
                    if (err) {
                        callback(err);

                    } else {
                        callback(null, replaced);
                    }
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

        self.client.queryDocuments(self.collection._self, querySpec).toArray(function (err, results) {
            if (err) {
                callback(err);
            } else {
                callback(null, results[0]);
            }
        });
    }
}

module.exports = DocumentDBService;