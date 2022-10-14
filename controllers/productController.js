const { data } = require('../data/index');
const Product = require('../model/data');
const joi = require('joi');

  // ---- design a schema similar to our document schema
const validate_product_schema = joi.object({
    username: joi.string().required(),
    price: joi.number().required()
})



// ---- display all data
exports.displayData = async (req, res) => {
    // ----- find all data in database
    const data = await Product.find({});
    res.status(200).json({ data: data });
    res.end();
};



// ----- specific data handler
exports.getSpecificProduct = async (req, res) => {
    // ---- get product with specified id
    const { username } = req.params; // ---- value of dynamic param

    // ----- check if product exists
    const product_found = await Product.findOne({ username: username });
    if (product_found) {
        res.status(200).json(product_found);
    } else {
    // product does not exist
    res.status(404).json({msg:"Product not found"}); // ---- response to the clients
    res.end(); // ---- end the response
    }
};



// ------ delete a specific data from the array --------------------------------
exports.deleteData = async(req, res) => {
    // get data to delete from parameter
    const { username } = req.params; // ---- deconstruct value of the object ----

    // delete the data from the databases
    const deletedData = await Product.deleteOne({ username: username });
    res.status(200).json({ msg: "Data deleted already" });
    res.end();
}



// ------ Create data or handle post request
exports.createData = async (req, res) => {


    // ---- get the sent data from clientside
    const { username, price } = req.body;


    // ---- validate the data matches our model schema
    const { error } = validate_product_schema.validate(req.body);
    if (error) {
        return res.status(400).json({ msg: error.message });
    }


    // ----- check if data exist already in databases
    const product_exist = await Product.findOne({ username: username });
    if (product_exist) {
        return res.status(400).json({ msg: "Data exist in database already" })
    }

    // ----- create new data and send response to user
    const newData = await Product.insertMany({ username: username, price:price});
    return res.status(200).json({ msg: "Data save successfully",data:newData})
}


// ------ Update Data already saved --------------------------------