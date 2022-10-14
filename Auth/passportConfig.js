const {ExtractJwt,Strategy} = require('passport-jwt');
const clientModel = require('../model/clientModel');
const passport = require('passport');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:"Secret Key"
}

// ----- creating a jwt strategy -----
passport.use(new Strategy(opts, (jwt_payload, done) => {
    clientModel.findOne({ email: jwt_payload.email }, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
}))
