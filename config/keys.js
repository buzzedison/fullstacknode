// keys.js figure out what sets of credentials to return
//production or development?

if (process.env.NODE_ENV === 'production'){
    // we are in production. return the prod set of keys
    module.exports = require('./prod')
}
else{
    //we are in development return the Dev keys
    module.exports = require ('./dev')
}