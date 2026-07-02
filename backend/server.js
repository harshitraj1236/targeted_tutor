require('dotenv').config()
const app = require('./src/app')
const connectToDB = require('./src/config/db')

connectToDB()
app.listen(1236,()=>{
    console.log("Server is running on prot number 1236");
})