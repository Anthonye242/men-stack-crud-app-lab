const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Car = require('./models/car.js');

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Routes
app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/cars/new', (req, res) => {
  res.render('new.ejs');
});

app.post('/cars', async (req, res) => {
  await Car.create(req.body);
  res.redirect('/cars');
});

app.get('/cars', async (req, res) => {
  const cars = await Car.find();
  res.render('cars.ejs', { cars, car: null });
});

app.get('/cars/:id', async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (car) {
    res.render('cars.ejs', { car, cars: null });
  } else {
    res.status(404).send('Car not found');
  }
});

app.get('/cars/:id/edit', async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (car) {
    res.render('new.ejs', { car });
  } else {
    res.status(404).send('Car not found');
  }
});

app.post('/cars/:id', async (req, res) => {
  await Car.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/cars');
});

app.post('/cars/:id/delete', async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.redirect('/cars');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});