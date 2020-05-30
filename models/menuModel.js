import pricesModel from './pricesModel.js';

class menuModel {
    constructor (id, pubId, title, description, classification, prices) {
        this.id = id;
        this.pubId = pubId;
        this.title = title;
        this.description = description;
        this.classification = classification;
        this.prices = prices;
    }
}

export default menuModel;