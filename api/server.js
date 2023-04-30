const express=require('express')
const colors=require('colors')
const dotenv=require('dotenv')
const morgan=require('morgan')
// const authRoutes=require('./routes/authRoutes');
// const orderRoutes=require('./routes/orderRoutes');
const brandRoutes=require('./routes/brandRoutes')
const categoryRoutes=require('./routes/categoryRoutes');
const productRoutes=require('./routes/productRoutes');

// const connectDB=require('./config/db');
const mongoose = require('mongoose');
const cors=require('cors')
const app=express()

dotenv.config();
console.log(process.env.url)
const connect = mongoose.connect(process.env.url,{useNewUrlParser: true}, { useUnifiedTopology: true },  {useCreateIndex: true});

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

//middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors({credentials:true,origin:'http://localhost:3000'}))
//routes
// app.use('/api/auth',authRoutes)
app.use('/api/products',productRoutes)
// app.use('/api/orders',orderRoutes)
app.use('/api/categories',categoryRoutes)
app.use('/api/brands',brandRoutes)
const PORT=process.env.PORT||5000;
const development=process.env.DEV_MODE;
app.listen(PORT,()=>{
    console.log(`Server running on ${development} mode on port ${PORT}`.bgCyan.white);
})

