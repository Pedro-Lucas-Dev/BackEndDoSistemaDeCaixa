const os = require("os");
const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    permissionLevel: Number
})

userSchema.virtual('id').get(function() {
    return this._id.toHexString();
})

userSchema.virtual('url').get(function() {
    return `/users/${this._id}`;
})

userSchema.set('toJSON', {
    virtuals: true
})

userSchema.findById = (cb) => {
    return this.model('Users').find({id: this.id}, cb)
}

const User = mongoose.model('Users', userSchema);

exports.findByEmail = (email) => {
    return User.find({email})
}

exports.findById = (id) => {
    return User.findById(id).then((result) => {
        result = result.toJSON();
        delete result._id;
        delete result.__v;
        return result
    })
}

exports.createUser = (userData) => {
    const user = new User(userData);
    return user.save();
}

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        User.find()
        .limit(perPage)
        .skip(perPage * page)
        .exec((err, users) => {
            if (err) {
                reject(err);
            } else {
                resolve(users);
            }
        })
    })
}

exports.patchUser = (id, userData) => {
    return User.findOneAndUpdate({_id: id}, userData)
}

exports.removeById = (userId) => {
    return new Promise((resolve, reject) => {
        User.deleteMany({_id: id}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        })
    })
}
