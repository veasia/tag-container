var documentClient = require("documentdb").DocumentClient;
var HttpStatusCodes = { NOTFOUND: 404 };

// var client = new documentClient(config.endpoint, { "masterKey": config.primaryKey });
// var databaseUrl = `dbs/${config.database.id}`;
// var collectionUrl = `${databaseUrl}/colls/${config.collection.id}`;



module.exports = class DbConnector {
	constructor (endpoint, primaryKey, database, collection) {
		// console.log('DBCONNECTOR constructor', endpoint, primaryKey, database, collection)
		this.endpoint = endpoint;
		this.primaryKey = primaryKey;
		this.collection = collection;
		this.database = database;
		this.client = new documentClient(this.endpoint, { "masterKey": this.primaryKey });
		this.databaseUrl = `dbs/${this.database.id}`;
		this.collectionUrl = `${this.databaseUrl}/colls/${this.collection.id}`;
		console.log(`endpoint ${this.endpoint}`)
		console.log(`primaryKey ${this.primaryKey}`)
		console.log(`collection ${JSON.stringify(this.collection)}`)
		console.log(`database ${JSON.stringify(this.database)}`)
		console.log(`databaseUrl ${this.databaseUrl}`)
		console.log(`collectionUrl ${this.collectionUrl}`)
	}

	getDatabase() {
	    console.log(`Getting database: ${this.database.id}\n`);
	    const client = this.client;

	    return new Promise((resolve, reject) => {
	    	console.log(`this.databaseUrl  = ${this.databaseUrl}\n`)
	        client.readDatabase(this.databaseUrl, (err, result) => {
	            if (err) {
	            	console.log(`Error readDatabase ${err}`)
	                if (err.code == HttpStatusCodes.NOTFOUND) {
	                	console.log(`this.database  = ${this.database}\n`)
	                    client.createDatabase(this.database, (err, created) => {
	                        if (err) reject(err)
	                        else resolve(created);
	                    });
	                } else {
	                    reject(err);
	                }
	            } else {
	            	console.log(`RESULT readDatabase ${JSON.stringify(result)}`)
	                resolve(result);
	            }
	        });
	    });
	}

	getCollection() {
	    console.log(`Getting collection:${this.collection.id}\n`);
		const client = this.client

	    return new Promise((resolve, reject) => {
	        client.readCollection(this.collectionUrl, (err, result) => {
	        	console.log(`client.readCollection(this.collectionUrl, ${this.collectionUrl}\n`)
	            if (err) {
	            	console.log(`Error readCollection ${err}`)
	                if (err.code == HttpStatusCodes.NOTFOUND) {
	                    client.createCollection(this.databaseUrl, this.collection, { offerThroughput: 400 }, (err, created) => {
	                        if (err) reject(err)
	                        else resolve(created);
	                    });
	                } else {
	                    reject(err);
	                }
	            } else {
	            	console.log(`RESULT readCollection ${JSON.stringify(result)}\n`)
	                resolve(result);
	            }
	        });
	    });
	}

	getFamilyDocument(document) {
	    let documentUrl = `${this.collectionUrl}/docs/${document.id}`;
	    console.log(`Getting document:${document.id}\n`);
	    const client = this.client;

	    return new Promise((resolve, reject) => {
	        client.readDocument(this.documentUrl, { partitionKey: document.district }, (err, result) => {
	            if (err) {
	                if (err.code == HttpStatusCodes.NOTFOUND) {
	                    client.createDocument(this.collectionUrl, document, (err, created) => {
	                        if (err) reject(err)
	                        else resolve(created);
	                    });
	                } else {
	                    reject(err);
	                }
	            } else {
	                resolve(result);
	            }
	        });
	    });
	};

	queryCollection() {
	    console.log(`Querying collection through index:${this.collection.id}`);
		const client = this.client;

	    return new Promise((resolve, reject) => {
	        client.queryDocuments(
	            this.collectionUrl,
	            'SELECT VALUE r.children FROM root r WHERE r.lastName = "Andersen"'
	        ).then((err, results) => {
	            if (err) reject(err)
	            else {
	                for (var queryResult of results) {
	                    let resultString = JSON.stringify(queryResult);
	                    console.log(`\tQuery returned ${resultString}`);
	                }
	                console.log();
	                resolve(results);
	            }
	        });
	    });
	};

}