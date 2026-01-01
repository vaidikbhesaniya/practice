const mongoose=require('mongoose');

const Mongo_URI=process.env.Mongo_URI||'';
const connectDB=async()=>{
    try{
        await mongoose.connect(Mongo_URI).then(()=>{
            console.log('MongoDB connected');
        }
        );
    }
    catch(err){
        console.error('MongoDB connection error:',err);
        process.exit(1);
    }
};

module.exports=connectDB;