const express = require('express');
const mongoose = require('mongoose');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema')
const cors  = require('cors');
const app = express();
require('dotenv').config()


// Connect To Database
const DBUrl = process.env.DB_URL
mongoose.connect(DBUrl)
mongoose.connection.once('open', () => {
    console.log('Connected To Database')
});

const PORT = 8081;
app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));
app.listen(PORT, () => {
    console.log('listening for requests on PORT', PORT)
})