require('dotenv').config();
const {connect} = require('mongoose');

const dbConnect = connect(process.env.dbURL);

module.exports = {
    dbConnect,
};