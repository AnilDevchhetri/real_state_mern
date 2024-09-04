import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
   console.log("Connected to MongoDB") 
}).catch((error)=>{
    console.log(error)
})


const app = express();

app.listen(3000, () =>{
    console.log('Server is runniogn on 3000')
})

//

//mongo passswrod: cCKZ6lrib8Oe8aX7

//mongodb+srv://realstate-mearn:cCKZ6lrib8Oe8aX7@realstate-mern.rrrsb.mongodb.net/mern-realstate?retryWrites=true&w=majority&appName=realstate-mern