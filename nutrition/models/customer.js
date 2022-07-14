const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
// const Meals = require('./meals')

const customerRegisterSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email cannot be blank']
    },
    password: {
        type: String,
        required: [true, 'Password cannot be blank']
    },
    meals: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Meals'
        }
    ]
})

// UserSchema.plugin(passportLocalMongoose);

const Customerregister = mongoose.model('Customerregister', customerRegisterSchema);

module.exports = Customerregister