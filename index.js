const express = require ('express')
const mongoose = require ('mongoose')
//we need to tell express to make use of cookies to track our users. we installed cookie-sessions dependency. 
const cookieSession = require ('cookie-session') //this is to give us access to the cookies. 
// i need to require passport as well for the cookie-session
const passport = require ('passport')  // passport will keep track of our Users/User sessions. This is to make use of the
//cookies. 
const keys = require ('./config/keys')
require ('./models/User')
require('./Services/Passport')
mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoURI,  { useNewUrlParser: true })
const app = express ();
app.use(
    cookieSession({
        //maxAge is how long the cookie should stay in the Browser for. 
        maxAge: 30 * 24 * 60 * 60 * 1000 ,// 30 days, 24 hours, 60 minutes in an hour, 60 seconds in a minute, 
        // 1000 milli seconds in a second. This just means i want the cookie to last for 30 days before it 
        //automatically expires. 

        //assign keys to assign and encrypt our cookie. so know one can change the user id etc. 
        //we will create this inside our config/keys. we don't want to commit this. 
        keys: [keys.cookieKey]
    })
)
app.use(passport.initialize());
app.use(passport.session());
//const authRouters = require ('./Routes/authRoutes')


//const app = express ();

/** app.get('/', (req, res) => {
    res.send ({hi: 'there'})

});
*/



// client id 169465642796-g5pq69j0gsre9dkugultjknqok6vi89m.apps.googleusercontent.com
// client secret OXbT82pQtJ31CUXl5xP0Cco1
// create a new instance of new Google Strategy
//authRouters(app)
require ('./Routes/authRoutes')(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT);
