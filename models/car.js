const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  totalMiles: { type: Number, required: true },
  fuelType: { 
    type: String, 
    required: true,
    enum: ['electric', 'gas', 'hybrid']
  }
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;
