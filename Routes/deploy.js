var FileCreation = require('../Services/FileCreation.js');
module.exports = function(router) {

    router.post('/live', function(req , res){
        const contentFile = {
            merchantId: req.body.merchantId || req.query.merchantId,
            script: req.body.script,
            veEnabled: req.body.veEnabled,
            veJourneycode: req.body.veJourneycode || req.query.veJourneycode,
            ttdEnabled: req.body.ttdEnabled,
            ttdConfig: req.body.ttdConfig
        };

        //TODO: Add validation on client side
        if(!contentFile.merchantId){
            return res.json( {message:'Error: Incomplete form'} );
        }
        //TODO: Promisify
        const file = new FileCreation(contentFile.merchantId);

        file.create(contentFile, (error) => {
            if(error) return res.json({type:'error', error: error})

            file.deploy((error, result) => {
                if(error) return res.json({type:'error', error: error})
                return res.json(result)

            });
        });
    });

    return router;
}
