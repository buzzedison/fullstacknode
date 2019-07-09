const passport = require('passport');
const GoogleStrategy = require ('passport-google-oauth20').Strategy;
const mongoose = require ('mongoose')
const keys = require('../config/keys')
const User = mongoose. model('users')

//passport.serializeUser takes a User model and generates a way to (unique indetifier)indentify it in our application. Passport will
//eventually stuff that into a cookie
passport.serializeUser ( (user, done) =>{
done(null, user.id)
})

// pull the stuff back out in the cookie and turn it into a user model 
passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user =>{
        done(null, user)
    })
}
)
passport.use(
    new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, 
async (accessToken, refreshToken, profile, done) =>{
    //make sure we only have one record of User not multiples
    const existingUser= await User.findOne({googleID:profile.id});
        if (existingUser){
            //we already have a record for this profile id
           return done(null, existingUser);
        } else{
            //we dont have a record for this profile id so make a new record
            //creates a new instance of User
            const user= await new User ({googleID:profile.id}).save()
           done(null, user)
            
            
        }
    }
    
   
    

));
