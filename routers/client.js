// ----------------- Handles all request concerning clients like login , signin
const express = require('express');
// router object
const router = express.Router();
// router controller
const c = require('../controllers/clientController');

// ------ Register routes --------------------------------
router.post('/register',c.RegisterController);

// ------- Login routes --------------------------------
router.post('/login',c.LoginController);

// ------ secret routes --------------------------------
router.get('/', (req, res) => {
    res.status(200).json({ msg: "User is Authorised to view this page", email: req.user.email });
})

// ----- export for external file to use
module.exports = router;