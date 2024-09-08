import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from "./router/user.route.js";
import authRouter from "./router/auth.route.js"
dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
   console.log("Connected to MongoDB") 
}).catch((error)=>{
    console.log(error)
})


const app = express();
app.use(express.json());//to allow json as input to the server
app.listen(3000, () =>{
    console.log('Server is runniogn on 3000')
})

app.use('/api/user', userRouter)
app.use('/api/auth',authRouter)

//Midleware to handle error
app.use((err ,req, res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error"
    return res.status(statusCode).json({
        success:false, 
        statusCode,
        message
    })  
})



//3:26

//mongo passswrod: cCKZ6lrib8Oe8aX7

//mongodb+srv://realstate-mearn:cCKZ6lrib8Oe8aX7@realstate-mern.rrrsb.mongodb.net/mern-realstate?retryWrites=true&w=majority&appName=realstate-mern 