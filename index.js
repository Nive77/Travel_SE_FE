import express  from "express";
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from "cookie-parser";
import tourRoute from './routes/tours.js'
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import reviewRoute from './routes/reviews.js'
import bookingRoute from './routes/bookings.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 8000
const corsOptions = {
   origin: true,
   credentials: true
}

mongoose.set("strictQuery", false)
const connect = async() => {
   try {
      await mongoose.connect(process.env.MONGO_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true
      })

      console.log('MongoDB connected')
   } catch (error) {
      console.log('MongoDB connected failed')
   }
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use("https://travel-back-zswi.onrender.com/auth", authRoute)
app.use("https://travel-back-zswi.onrender.com/tours", tourRoute)
app.use("https://travel-back-zswi.onrender.com/users", userRoute)
app.use("https://travel-back-zswi.onrender.com/review", reviewRoute)
app.use("https://travel-back-zswi.onrender.com/booking", bookingRoute)

app.listen(port, () => {
   connect()
   console.log('server listening on port', port)
})