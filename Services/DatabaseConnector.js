var documentClient = require("documentdb").DocumentClient;
var config = require("../config").db;
console.log(JSON.stringify(config))
var url = require('url');

var client = new documentClient(config.endpoint, { "masterKey": config.primaryKey });

var HttpStatusCodes = { NOTFOUND: 404 };
var databaseUrl = `dbs/${config.database.id}`;
var collectionUrl = `${databaseUrl}/colls/${config.collection.id}`;

function getDatabase() {
    console.log(`Getting database:\n${config.database.id}\n`);

    return new Promise((resolve, reject) => {
        client.readDatabase(databaseUrl, (err, result) => {
            if (err) {
                if (err.code == HttpStatusCodes.NOTFOUND) {
                    client.createDatabase(config.database, (err, created) => {
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
}

/**
 * Get the collection by ID, or create if it doesn't exist.
 */
function getCollection() {
    console.log(`Getting collection:\n${config.collection.id}\n`);

    return new Promise((resolve, reject) => {
        client.readCollection(collectionUrl, (err, result) => {
            if (err) {
                if (err.code == HttpStatusCodes.NOTFOUND) {
                    client.createCollection(databaseUrl, config.collection, { offerThroughput: 400 }, (err, created) => {
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
}

/**
 * Get the document by ID, or create if it doesn't exist.
 * @param {function} callback - The callback function on completion
 */
function getFamilyDocument(document) {
    let documentUrl = `${collectionUrl}/docs/${document.id}`;
    console.log(`Getting document:\n${document.id}\n`);

    return new Promise((resolve, reject) => {
        client.readDocument(documentUrl, (err, result) => {
            if (err) {
                if (err.code == HttpStatusCodes.NOTFOUND) {
                    client.createDocument(collectionUrl, document, (err, created) => {
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

/**
 * Query the collection using SQL
 */
function queryCollection() {
    console.log(`Querying collection through index:\n${config.collection.id}`);

    return new Promise((resolve, reject) => {
        client.queryDocuments(
            collectionUrl,
            'SELECT VALUE r.children FROM root r WHERE r.lastName = "Andersen"'
        ).toArray((err, results) => {
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

/**
 * Replace the document by ID.
 */
function replaceFamilyDocument(document) {
    let documentUrl = `${collectionUrl}/docs/${document.id}`;
    console.log(`Replacing document:\n${document.id}\n`);
    document.children[0].grade = 6;

    return new Promise((resolve, reject) => {
        client.replaceDocument(documentUrl, document, (err, result) => {
            if (err) reject(err);
            else {
                resolve(result);
            }
        });
    });
};

/**
 * Delete the document by ID.
 */
function deleteFamilyDocument(document) {
    let documentUrl = `${collectionUrl}/docs/${document.id}`;
    console.log(`Deleting document:\n${document.id}\n`);

    return new Promise((resolve, reject) => {
        client.deleteDocument(documentUrl, (err, result) => {
            if (err) reject(err);
            else {
                resolve(result);
            }
        });
    });
};



/**
 * Cleanup the database and collection on completion
 */
function cleanup() {
    console.log(`Cleaning up by deleting database ${config.database.id}`);

    return new Promise((resolve, reject) => {
        client.deleteDatabase(databaseUrl, (err) => {
            if (err) reject(err)
            else resolve(null);
        });
    });
}

/**
 * Exit the app with a prompt
 * @param {message} message - The message to display
 */
function exit(message) {
    console.log(message);
    console.log('Press any key to exit');
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', process.exit.bind(process, 0));
}

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
		return getDatabase();
	    // console.log(`Getting database: ${this.database.id}\n`);
	    // const client = this.client;

	    // return new Promise((resolve, reject) => {
	    // 	console.log(`this.databaseUrl  = ${this.databaseUrl}\n`)
	    //     client.readDatabase(this.databaseUrl, (err, result) => {
	    //         if (err) {
	    //         	console.log(`Error readDatabase ${err}`)
	    //             if (err.code == HttpStatusCodes.NOTFOUND) {
	    //             	console.log(`this.database  = ${this.database}\n`)
	    //                 client.createDatabase(this.database, (err, created) => {
	    //                     if (err) reject(err)
	    //                     else resolve(created);
	    //                 });
	    //             } else {
	    //                 reject(err);
	    //             }
	    //         } else {
	    //         	console.log(`RESULT readDatabase ${JSON.stringify(result)}`)
	    //             resolve(result);
	    //         }
	    //     });
	    // });
	}

	getCollection() {
		return getCollection()
	 //    console.log(`Getting collection:${this.collection.id}\n`);
		// const client = this.client

	 //    return new Promise((resolve, reject) => {
	 //        client.readCollection(this.collectionUrl, (err, result) => {
	 //        	console.log(`client.readCollection(this.collectionUrl, ${this.collectionUrl}\n`)
	 //            if (err) {
	 //            	console.log(`Error readCollection ${err}`)
	 //                if (err.code == HttpStatusCodes.NOTFOUND) {
	 //                    client.createCollection(this.databaseUrl, this.collection, { offerThroughput: 400 }, (err, created) => {
	 //                        if (err) reject(err)
	 //                        else resolve(created);
	 //                    });
	 //                } else {
	 //                    reject(err);
	 //                }
	 //            } else {
	 //            	console.log(`RESULT readCollection ${JSON.stringify(result)}\n`)
	 //                resolve(result);
	 //            }
	 //        });
	 //    });
	}

	getFamilyDocument(document) {
	    // let documentUrl = `${this.collectionUrl}/docs/${document.id}`;
	    // console.log(`Getting document:${document.id}\n`);
	    // const client = this.client;

	    // return new Promise((resolve, reject) => {
	    //     client.readDocument(this.documentUrl, { partitionKey: document.district }, (err, result) => {
	    //         if (err) {
	    //             if (err.code == HttpStatusCodes.NOTFOUND) {
	    //                 client.createDocument(this.collectionUrl, document, (err, created) => {
	    //                     if (err) reject(err)
	    //                     else resolve(created);
	    //                 });
	    //             } else {
	    //                 reject(err);
	    //             }
	    //         } else {
	    //             resolve(result);
	    //         }
	    //     });
	    // });

	    return getFamilyDocument(document);
	};

	queryCollection() {
	 //    console.log(`Querying collection through index:${this.collection.id}`);
		// const client = this.client;

	 //    return new Promise((resolve, reject) => {
	 //        client.queryDocuments(
	 //            this.collectionUrl,
	 //            'SELECT VALUE r.children FROM root r WHERE r.lastName = "Andersen"'
	 //        ).then((err, results) => {
	 //            if (err) reject(err)
	 //            else {
	 //                for (var queryResult of results) {
	 //                    let resultString = JSON.stringify(queryResult);
	 //                    console.log(`\tQuery returned ${resultString}`);
	 //                }
	 //                console.log();
	 //                resolve(results);
	 //            }
	 //        });
	 //    });
	 return queryCollection();
	};

}