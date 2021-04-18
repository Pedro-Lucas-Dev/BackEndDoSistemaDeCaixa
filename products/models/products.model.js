const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
const productSchema = new Schema({
    name: String,   
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'Category'
    },
    description: String,
    price: Number,
    image_url: {type: String, default: "https://www.odoo.com/web/image/res.users/1072846/image_1024?unique=3f33558"},
    status: { type: String, default: 'ACTIVE' }
})

productSchema.virtual('id').get(function() {
    return this._id.toHexString();
})

productSchema.virtual('url').get(function() {
    return `/products/${this._id}`;
})

productSchema.set('toJSON', {
    virtuals: true
})

const Product = mongoose.model('Product', productSchema);

exports.create = (productData) => {
    const product = new Product(productData);
    return product.save();
}

exports.findById = (id) => {
    return Product.findById(id).then((result) => {
        result = result.toJSON();
        delete result._id;
        delete result.__v;
        return result
    })
}

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Product.find()
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

exports.patchProduct = (id, productData) => {
    return Product.findOneAndUpdate({_id: id}, productData)
}

exports.removeById = (id) => {
    return new Promise((resolve, reject) => {
        Product.deleteMany({_id: id}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        })
    })
}