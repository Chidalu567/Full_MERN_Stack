// ------ create the schema
const mongoose = require('mongoose');

const Product_Schema = new mongoose.Schema({
    username: { type: String, required: true},
    price: {type:Number,required:true}
},
{collection:'products'}
)

// --------- compile the schema to a model
const ProductModel = mongoose.model('ProductModel',Product_Schema);


// ---------- export the model
module.exports = ProductModel;