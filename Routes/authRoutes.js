const passport = require('passport')
  
module.exports =(app)=>{
    app.get ('/auth/google', passport.authenticate(
    'google', {
        scope:['profile', 'email']
    }
));
    app.get ('/auth/google/callback', passport.authenticate(
    'google', {
        scope:['profile', 'email']
    }
    
));

// add the possibility to log out
app.get ('/url/logout', (req, res) => {
    req.logout()  //it takes the cookie that contains our user id, and it kills the id. 
    res.send(req.user)
}
)
//route handler to inspect the req.user property. req is incoming request and res is outgoing response. 
app.get('/url/login', (req, res) => {
    res.send(req.user);
  });
};