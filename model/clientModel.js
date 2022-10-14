const mongoose = require('mongoose');

// ------ create document schema
const ClientSchema = new mongoose.Schema({
    email: {type:String,required:true,unique:true},
    password: {type:String,required:true}
}, { collection: "Client" })

ClientSchema.path("email").index({unique:true})

// ------- convert document schema to model
const clientModel = mongoose.model('ClientModel', ClientSchema);


module.exports = clientModel;