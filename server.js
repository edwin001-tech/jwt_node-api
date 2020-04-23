const express = require('express');

const jwt = require('jsonwebtoken');

const app = express();



app.get('/api',(req,res) =>{
    res.json({
        message:'Welcome to the API'
    })
})

app.post('/api/posts',verifyToken,(req,res) =>{

    jwt.verify(req.token,'secretkey',(err,authData) =>{
        if(err){
            res.sendStatus(403)
        }
        else{

            res.json({
                message:'Post successfully created',
                authData:authData
            })

        }
    })
})

app.post('/api/login',(req,res) =>{
   const user ={
       id : 1,
       username: 'Gautam',
       email: 'gautam@gmail.com'
   }

   jwt.sign({user:user},'secretkey',{expiresIn:'50s'},(err,token) =>{
       res.json({
           token:token
       })
   })
})

function verifyToken(req,res,next)
{
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined')
    {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();

    }else{
        res.sendStatus(403);
    }
}

app.listen(5000,() => console.log('Server started on Port 5000'))