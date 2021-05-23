/// ajouter mongoose
const mongoose = require('mongoose');
/// on appel sa un schema 
const thingSchema = mongoose.Schema({
 title: {type: String, required: true},
 description: {type: String, required: true},
 imageUrl: {type: String, required: true},
 userId: {type: String, required: true},
 price: {type: Number, required: true},
});


/// lier a la bdd 

module.exports = mongoose.model('thing',thingSchema);

