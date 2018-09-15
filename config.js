const config = {
    development: {
        baseUrl: 'https://whispering-badlands-15150.herokuapp.com'
    },
    production: {
        baseUrl: 'https://whispering-badlands-15150.herokuapp.com'
    }
}

const env = process.env.NODE_ENV;
module.exports = config[env];
