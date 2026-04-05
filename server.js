require("dotenv").config()
const app=require('./src/app')
const connectToDb = require('./src/config/databse')


connectToDb()




app.listen(4000)