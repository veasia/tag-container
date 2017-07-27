var DocumentDBClient = require('documentdb').DocumentClient;
var docdbUtils = require('./docdbUtils');

class MerchantDao {
	constructor (documentDBClient, databaseId, collectionId) {
		this.client = documentDBClient;
		this.databaseId = databaseId;
		this.collectionId = collectionId;

		this.database = null;
		this.collection = null;

		docdbUtils.getOrCreateDatabase(this.client, this.databaseId, (err, db) => {
             if (err) {
                 callback(err);
             } else {
                 this.database = db;
                 docdbUtils.getOrCreateCollection(this.client, this.database._self, this.collectionId, (err, coll) => {
                     if (err) {
                         callback(err);

                     } else {
                         this.collection = coll;
                     }
                 });
             }
         });
	}

	find (querySpec, callback) {
		this.client.queryDocuments(this.collection._self, querySpec).toArray( (err, results) => {
			if (err) {
				callback(err);

			} else {
				callback(null, results);
			}
		});
	}

	addItem (item, callback) {

		item.date = Date.now();
		item.id = undefined;

		this.client.createDocument(this.collection._self, item, (err, doc) => {
			if (err) {
				callback(err);

			} else {
				callback(null, doc);
			}
		});
	}

	updateItem (item, callback) {
		var self = this;

		self.getItem(item.id, (err, doc) => {
			if (err) {
				callback(err);

			} else {
				self.client.replaceDocument(doc._self, item, (err, replaced) => {
					if (err) {
						callback(err);

					} else {
						callback(null, replaced);
					}
				});
			}
		});
	}

	getItem (itemId, callback) {
		var self = this;

		var querySpec = {
			query: 'SELECT * FROM root r WHERE r.id = @id',
			parameters: [{
				name: '@id',
				value: itemId
			}]
		};

		self.client.queryDocuments(self.collection._self, querySpec).toArray( (err, results) => {
			if (err) {
				callback(err);

			} else {
				callback(null, results[0]);
			}
		});
	}

};

module.exports = MerchantDao;