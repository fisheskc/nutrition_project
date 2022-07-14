const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override')
// const ExpressError = require('./utils/ExpressError');
const utils = require('utils');

const Customerregister = require('./models/customer')
const Meals = require('./models/meals')
const Foodtypes = require('./models/foodtypes')
// const search = require('./views/meals/foodsearch');

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

// view directory of EJS
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'notagoodsecret',
    resave: false,
    saveUninitialized: true
}))

app.use(methodOverride('_method'));

app.get('/',(req,res) => {
    res.send('This is the home page')
})

// foodtypes routes
app.get('/food', async(req, res) => {
    const foodTypes = await Foodtypes.find({})
    console.log(foodTypes)
    res.render('food/index', {foodTypes})
})

app.get('/food/:id', async(req, res) => {
    const foodType = await Foodtypes.findById(req.params.id).populate('meals')
    console.log(foodType)
    res.render('food/show', {foodType})
})

app.delete('/food/:id', async(req, res) => {
    const foodType = await Foodtypes.findByIdAndDelete(req.params.id);
    res.redirect('/food')
})

app.post('/food', async(req, res) => {
    const foodType = new Foodtypes(req.body)
    await food.save();
    res.redirect('/food')
})

app.get('/food/:id/meals/new', async(req, res) => {
    const {id} = req.params
    const foodType = await Foodtypes.findById(id)
    console.log(foodType)
    res.render('meals/new', {foodType, id})
})

app.post('/food/:id/meals', async(req, res) => {
    let foundFood = []
    const {id} = req.params;
    // console.log(req.body)
    const foodtype = await Foodtypes.findById(id)
    const {firstMeal,secondMeal,thirdMeal,snacks,other}=req.body;
    console.log(req.body)
    const meal = new Meals({firstMeal,secondMeal,thirdMeal,snacks,other});
    // meals is the array
    foodtype.meals.push(meal);
    meal.foodtype = foodtype;
    await foodtype.save();
    await meal.save();
    //res.send(foodtype)
    res.redirect(`/food/${id}`)
})

// meals routes
app.get('/meals', async(req, res) => {
    const meals = await Meals.find({})
    // console.log(meals)
    res.render('meals/index', {meals})
})

app.get('/meals/new', (req, res) => {
    res.render('meals/new')
})

app.post('/meals', async(req, res) => {
   const newMeals = new Meals(req.body);
   await newMeals.save()
   console.log(newMeals)
   res.redirect(`/meals/${newMeals._id}`)
})

app.get('/meals/:id', async(req, res) => {
    const {id} = req.params
    // populate takes other schema keys from mongoose - not working line below
    // const meal = await Meals.findById(req.params.id)
    const meal = await Meals.findById(id).populate('foodType','customerregister')
    console.log(meal)
    // const meal = await Meals.findById(id)
    res.render('meals/show', {meal})
})

app.delete('/meals/:id', async(req, res) => {
    const {id} = req.params;
    const deletedProduct = await Meals.findByIdAndDelete(id)
    res.redirect('/meals')
})

// Customer routes
app.get('/customers', async(req, res) => {
    const customers = await Customerregister.find({})
    console.log(customers)
    // the path directory here for rendering to the browser
    res.render('customers/index', {customers})
})

app.get('/customers/login', (req, res) => {
    // res.send('All customers')
    res.render('customers/login')
})

app.post('/customers/login', async(req, res) => {
    // find someone by name, must be unique
    const {name, email, password} = req.body;
    const loginEmail = await Customerregister.findOne({email})
    const validPassword = await bcrypt.compare(password, loginEmail.password)
    if(validPassword) {
        res.send("Yay welcome")
    } else {
        res.send('Try again')
    }
})

app.get('/customers/register', (req, res) => {
    res.render('customers/register')
})

app.get('/customers/:id', async (req, res) => {
    let customer = await Customerregister.findById(req.params.id)
    console.log(customer)
    res.render('customers/show', {customer})
})

app.post('/customers/register', async(req, res) => {
    // const newCustomer = new Customerregister(req.body)
    const {name, email, password} = req.body;
    const hash = await bcrypt.hash(password, 12)
    const newCustomer = new Customerregister({
        name, email,
        password: hash
    })
    await newCustomer.save()
    // res.send(hash)
    res.redirect('/')
})

app.get('/customers/secret', (req, res) => {
    if(!req.session.loginEmail_id) {
        res.redirect('customers/login')
    }
    res.send('This is a secret!!! You cannot me unless you are logged in')
})

app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})

