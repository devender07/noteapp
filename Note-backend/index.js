const express = require('express');
const DB = require('./db');
const cors = require('cors')
require('dotenv').config()
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json())


app.get('/',async(req,res)=>{
    res.status(200).json({message:'connected'})
})

//routers
const authRoute = require('./routes/authRoute');
app.use('/api/auth', authRoute);

const noteRoute = require('./routes/noteRoute');
app.use('/api/notes', noteRoute)



DB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running on ${PORT}`)
    });
})

