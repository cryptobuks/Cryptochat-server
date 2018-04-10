/**
 * Main Configuration file
 */
module.exports = {

    /* MongoDB Connection data  */

    // database user name
    dbUser: 'rootuser',
    // database user password
    dbPassword: '12345',
    // database name
    dbName: 'cryptochat',
    // database host address
    dbHost: '127.0.0.1',
    // database port
    dbPort: 27017,

    /* Authentication and security data */

    // JsonWebToken secret, used for authentication
    authenticationSecret: ';w}+,}yH(t{y-]42phC~h][4ZRP^,5Zk'
};