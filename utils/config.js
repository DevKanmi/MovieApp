//Create Configuration files
require('dotenv').config()

MONGODB_URI = process.env.MONGODB_URI

PORT = process.env.PORT //connect your Port 



module.exports  ={
    MONGODB_URI,
    PORT    
}  