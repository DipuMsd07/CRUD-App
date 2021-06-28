const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        const con = await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser:true,
            useCreateIndex:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        });
        console.log(`MongoDb Connected: ${con.connection.host}`);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;