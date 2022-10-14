const express = require('express'); // ---- Require express from node Modules
const router = express.Router(); // ---- Create an express router instance
const c = require('../controllers/productController'); // ---- require the controller



// ------ Group route definition
/**
 * @swagger
 * tags:
 *  name: products
 *  description: All route handling every request about products
 */


// ------Schema definition ------
/**
 * @swagger
 * components:
 *  parameters:
 *   ProductId:
 *    in: path
 *    name: id
 *    description: Product Id
 *    required: true
 *    schema:
 *     type: integer
 *
 *  schemas:
 *   Products:
 *    type: object
 *    required:
 *     - _id
 *     - username
 *    properties:
 *     _id:
 *      type: integer
 *      description: Specific Id of each product
 *     username:
 *      type: string
 *      description: Product name
 *     price:
 *      type: integer
 *      description: Price of the book or product
 *    example:
 *     id: 4
 *     username: Growing Up.
 *     price: 500
 */



// -------- /- get documentation --------------------
/**
 * @swagger
 * /:
 *  get:
 *   tags: [products]
 *   summary: Handles request to the home route. Returns a list of all products as resp
 *   responses:
 *    "200":
 *     description: Success in request handling. Returns list of products
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Products'
 */

// ---- get request
router.get('/', c.displayData);


// --------- Documentation for route with dynamic parameters
/**
 * @swagger
 * /{username}:
 *  get:
 *   summary: Use the Id to get a specific data from the database
 *   tags: [products]
 *   parameters:
 *    - in : path
 *      name: username
 *      description: Id of the data to be deleted
 *      required: true
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: specific data is found correlating to the id
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/Products"
 *    404:
 *     description: Data is not found in database
*/

// ---- get request with dynamic params
router.get('/:username', c.getSpecificProduct);



// ------- Post request documentation
/**
 * @swagger
 * /create:
 *  post:
 *   summary: creating a new data in database
 *   tags: [products]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: "#/components/schemas/Products"
 *   responses:
 *    200:
 *     description: Data created in database successfully
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/Products"
 */

router.post('/create', c.createData);



/**
 * @swagger
 * /{username}:
 *  delete:
 *   summary: Deletes the data with the given id
 *   tags: [products]
 *   parameters:
 *    - in : path
 *      name: username
 *      description: Id of the data to be deleted
 *      required: true
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: Data deleted successfully
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/Products"
 *    404:
 *     description: Data not found
 */
// ---- delete requests
router.delete('/:username', c.deleteData);

module.exports = router;  // ---- export for external use