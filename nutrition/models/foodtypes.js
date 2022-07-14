const mongoose = require('mongoose');
const Meals = require('./meals')
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const foodTypesSchema = new Schema({
    mealDetails: {
        type: String
    },
    starch: {
        type: String
    },
    carbohydrate: {
        type: String
    },
    protein: {
        type: String
    },
    sugars: {
        type: String
    },
    fiber: {
        type: String
    },
    meals: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Meals'
        }
    ]
})

foodTypesSchema.post('findOneAndDelete', async function(foodType){
    if(foodType.meals.length) {
       const res = await Meals.deleteMany({_id: { $in: foodType.meal } })
       console.log(res);
    }
    
})

const Foodtypes = mongoose.model('Foodtypes', foodTypesSchema);

module.exports = Foodtypes;




