module.exports = {
    blob: {
		sandbox: {
			account:process.env.ITLT_BLOB_SANDBOX_ACCOUNT,
			key:process.env.ITLT_BLOB_SANDBOX_KEY,
			container: process.env.ITLT_BLOB_SANDBOX_CONTAINER,
			url: process.env.ITLT_BLOB_SANDBOX_DOMAINRUL
		},
		live: {
			account: process.env.ITLT_BLOB_LIVE_ACCOUNT,
        	key: process.env.ITLT_BLOB_LIVE_KEY,
			container: process.env.ITLT_BLOB_LIVE_CONTAINER,
			url: process.env.ITLT_BLOB_LIVE_DOMAINRUL
		}
    },
    db: {
    	database: {
    		id: 'merchant'
    	},
    	collection: {
    		id: 'merchant'
    	},
    	endpoint: process.env.ITLT_DB_ENDPOINT,
    	primaryKey: process.env.ITLT_DB_PRIMARYKEY
	},
	api: {
		version : `1.0`
	},
	authentication: {
		disable: process.env.ITLT_USER_AUTHENTICATION_DISABLE,
		secret: process.env.ITLT_USER_AUTHENTICATION_SECRET || 'do not hack me please',
		users: [
			{ id: 1, username: process.env.ITLT_USER_AUTHENTICATION_NAME, password: process.env.ITLT_USER_AUTHENTICATION_PASSWORD }
		]
	}
}