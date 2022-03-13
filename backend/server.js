const express = require('express')
const cors = require('cors');
const app = express()
const port = 5000
const mongoose = require('mongoose')
require("dotenv").config();

app.use(express.json());
app.use(cors());

const uri = process.env.DB_URL

mongoose.connect("mongodb+srv://soumyamahbub:TptjPwet6LDEa6@authors.tt3rg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
});
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to database'))

const authorsRouter = require('./routes/authors');
const optionsRouter = require('./routes/options');

app.use('/authors', authorsRouter);
app.use('/options', optionsRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})