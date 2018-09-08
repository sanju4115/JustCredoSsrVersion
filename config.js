const config = {
    development: {
        baseUrl: 'http://localhost:5000'
    },
    production: {
        baseUrl: 'https://whispering-badlands-15150.herokuapp.com'
    }
}

const env = process.env;
module.exports = config[env];
