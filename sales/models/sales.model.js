const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
const saleSchema = new Schema({
    total: Number,   
    products: Array,
    saleDate: {type: Date, default: new Date()},
    status: { type: String, default: 'PENDENTE' }
})

saleSchema.virtual('id').get(function() {
    return this._id.toHexString();
})

saleSchema.virtual('url').get(function() {
    return `/sales/${this._id}`;
})

saleSchema.set('toJSON', {
    virtuals: true
})

const Sale = mongoose.model('Sale', saleSchema);

exports.create = (saleData) => {
    const sale = new Sale(saleData);
    return sale.save();
}

exports.findById = (id) => {
    return new Promise((resolve, reject) => {
        Sale
        .findOne({_id: id})
        .exec((err,result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Sale.find()
        .limit(perPage)
        .skip(perPage * page)
        .exec((err, products) => {
            if (err) {
                reject(err);
            } else {
                resolve(products);
            }
        })

    })
}

exports.patchSale = (id, saleData) => {
    return Sale.findOneAndUpdate({_id: id}, saleData)
}

exports.removeById = (id) => {
    return new Promise((resolve, reject) => {
        Sale.deleteMany({_id: id}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        })
    })
}