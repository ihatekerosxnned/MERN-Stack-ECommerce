const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const url = 'mongodb://127.0.0.1/ecommerce'
const app = express()

app.use('/uploads', express.static('uploads'));

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('Database Connected!')
});

app.use(express.json());
app.use(cors());

//Calling routes and crud operations for Prodcuts
const productRouter = require('./routes/Products');
app.use('/products',productRouter);

const userRouter = require('./routes/Users');
app.use('/users',userRouter);


//TRIAL LOGIN USER AND AUTHENTICATE
const adminRouter = require('./routes/Admins');
const authRouter = require('./routes/Auth');
app.use('/admin',adminRouter);
app.use('/auth',authRouter);

app.listen(8080, () => {
    console.log('Server Connected!')
    console.log('Ari nasa miss mo na siya!')
});