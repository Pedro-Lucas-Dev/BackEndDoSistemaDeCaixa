const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: String,   
})

categorySchema.virtual('id').get(function() {
    return this._id.toHexString();
})

categorySchema.set('toJSON', {
    virtuals: true
})

const Category = mongoose.model('Category', categorySchema);

exports.createCategory = (categoryData) => {
    const category = new Category(categoryData);
    return category.save();
}

exports.findById = (id) => {
    return Category.findById(id).then((result) => {
        result = result.toJSON();
        delete result._id;
        delete result.__v;
        return result
    })
}

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Category.find()
        .limit(perPage)
        .skip(perPage * page)
        .exec((err, categories) => {
            if (err) {
                reject(err);
            } else {
                resolve(categories);
            }
        })
    })
}

exports.patchCategory = (id, categoryData) => {
    return Category.findOneAndUpdate({_id: id}, categoryData)
}

exports.removeById = (id) => {
    return new Promise((resolve, reject) => {
        Category.deleteMany({_id: id}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        })
    })
}