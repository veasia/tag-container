function Merchant(id, MerchantId, MerchantName, VeTagEnabled, VeJourneyCode, TTDEnabled, TTDParameters, ContainerURL, Migrated){
    this.id = id;
    this.MerchantId = MerchantId;
    this.MerchantName = MerchantName;
    this.VeTagEnabled = VeTagEnabled;
    this.VeJourneyCode = VeJourneyCode;
    this.TTDEnabled = TTDEnabled;
    this.TTDParameters = TTDParameters;
    this.ContainerURL = ContainerURL;
    this.Migrated = Migrated;
}

module.exports = Merchant