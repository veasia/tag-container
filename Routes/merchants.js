
var DocumentDBClient = require('documentdb').DocumentClient;
var DocumentDBService = require('../Services/DocumentDBService');
var MerchantService = require('../Services/MerchantService');
var config = require('../config').db;

var docDbClient = new DocumentDBClient(config.endpoint, {
    masterKey: config.primaryKey
});
var docDBService = new DocumentDBService(docDbClient);
docDBService.init(config.database.id, config.collection.id);
var merchantService = new MerchantService(docDBService);

module.exports = function(router){

  /* GET merchants. */
  router.get('/:id?', function(req, res, next) {
    var allMerchants = merchantService.getMerchants(req.params.id, 
      (err, result) => {
        res.json(defaultCallBack(err, result))
    });
  });

  /* POST merchant by id. */
  router.post('/', function(req, res, next) {
    merchantService.addMerchant(req.body, 
      (err, result) => {
        res.json(defaultCallBack(err, result))
    });
  });

  /* PUT merchant by id. */
  router.put('/', function(req, res, next) {
    merchantService.updateMerchant(req.body,
      (err, result) => {
        res.json(defaultCallBack(err, result))
    });
  });

  /* GET tag by id. */
  router.get('/:id/tags/:tagId', function(req, res, next) {
    //TODO
    res.json({ title: 'Express' });
  });

  /* POST tag by id. */
  router.post('/:id/tags/:tagId', function(req, res, next) {
    //TODO
    res.json({ title: 'Express' });
  });

  /* PUT tag by id. */
  router.put('/:id/tags/:tagId', function(req, res, next) {
    //TODO
    res.json({ title: 'Express' });
  });

  /* DELETE tag by id. */
  router.delete('/:id/tags/:tagId', function(req, res, next) {
    //TODO
    res.json({ title: 'Express' });
  });

  function defaultCallBack(err, result){
    if (err) {
      let obj = {Error: err};
      console.log(obj)
      return obj;
    }
    return { merchants: result };
  }

  return router;
}
