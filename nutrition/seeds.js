const mongoose = require('mongoose');
// const app = express();
// const path = require('path');
const Meals = require('./models/meals')
const Customerregister = require('./models/customer')
const Foodtypes = require('./models/foodtypes')

mongoose.connect('mongodb://localhost:27017/nutritions_db', {
  useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
  useUnifiedTopology: true
})
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


// const m = new Meals({firstMeal: 'Toast', secondMeal: 'Fish', thirdMeal: 'Chicken & potatoes', snacks: 'nuts', other: 'Melon'})

// m.save().then(m => {
//     console.log(m)
// }).catch(e => {
//     console.log(e)
// })

const seedCustomers = [
    {
        name: 'Eve Rose',
        email: 'everose@gmail.com',
        password: '789654123'
    },
    {
        name: 'Pears Williams',
        email: 'pearswilliams@gmail.com',
        password: 'jghobnobn'
    },
    {
        name: 'Iain Tylor',
        email: 'iaintylor@gmail.com',
        password: '123456789'
    },
    {
        name: 'Rachel Knight',
        email: 'rachelknight@gmail.com',
        password: '112255669'
    }
]

const seedFoodTypes = [
    {mealDetails: 'Your details', starch:'potatoes', carbohydrate:'potatoes', protein:'fish', sugars:'cookies',fiber:'vegetables'},
    {mealDetails: 'Your details', starch: 'noodles', carbohydrate: 'pasta', protein:'beef', sugars:'candy', fiber:'vegetables'},
    {mealDetails: 'Your details', starch:'oats',carbohydrate:'breads',protein:'chicken', sugars:'baked beans', fiber:'fruit'},
    {mealDetails: 'Your details', starch:'whole-wheat flour',carbohydrate:'rice', protein:'pork',sugars:'fruit juice',fiber:'tomatoes'},
    {mealDetails: 'Your details', starch:'white flour',carbohydrate:'vegetables',protein:'burgers',sugars:'demerara sugar',fiber:'apples'},
    {mealDetails: 'Your details',starch:'crackers',carbohydrate:'nuts',protein:'saugages',sugars:'ice cream',fiber:'bananas'},
    {mealDetails: 'Your details',starch:'pretzels',carbohydrate:'desserts',protein:'lamb',sugars:'maple syrup',fiber:'oranges'},
    {mealDetails: 'Your details',starch:'rice krispies cereal',carbohydrate:'milk',protein:'duck',sugars:'sweeteners',fiber:'cherries'},
    {mealDetails: 'Your details',starch:'weetabix',carbohydrate:'almond milk',protein:'turkey',sugars:'treacle',fiber:'black cherries'},
    {mealDetails: 'Your details',starch:'crunchy nut',carbohydrate:'pizza',protein:'liver',sugars:'caramel',fiber:'black berries'},
    {mealDetails: 'Your details',starch:'cheerios',carbohydrate:'pizza',protein:'liver',sugars:'cakes',fiber:'black berries'},
    {mealDetails: 'Your details',starch:'raison bran',carbohydrate:'sweet potato',protein:'kidney',sugars:'honey',fiber:'raspberries'},
    {mealDetails: 'Your details',starch:'all bran',carbohydrate:'yogurts',protein:'plaice',sugars:'cereal bars',fiber:'pears'}
]

    Foodtypes.insertMany(seedFoodTypes)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })

    Customerregister.insertMany(seedCustomers)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })
