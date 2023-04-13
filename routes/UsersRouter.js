const { request, response } = require("express");
const express = require('express');
const UsersRouter = express.Router();
const db = require("../models");
const bodyParser = require("body-parser");
UsersRouter.use(bodyParser.urlencoded({ extended: true}));
UsersRouter.use(bodyParser.json());
const bcrypt = require("bcryptjs");
const saltRounds = 10;


UsersRouter.route('/login').post(async (request, response)=>{
    console.log(request.body);
    const password = request.body.password;
    const username = request.body.username;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    db.user.findOne({ where:{ username: username }})
        .then(async (user) =>{
            //console.log("User.password=", user.password)
            //console.log("password = ", password)
            //response.send(user)
            if (user) {
                bcrypt.compare(password, user.password, (error, same)=>{
                    if(same){
                        request.session.userId = user.id;
                        //console.log("logged in");
                        //console.log(request.session);
                        response.redirect('/');
                    }else{
                        response.status(401)
                        console.log("401 error")
                        response.redirect('/badlogin');
                    }
                });
            }else{
                response.send("No such user login")
            }
        }).catch((error)=>{
            response.send("You don't have an account. Try signing up")
        })
    
});

UsersRouter.route('/signup')
.post(async (request, response)=>{
    const email = request.body.email
    const password = request.body.password
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    const username = request.body.username
    db.user
        .create({email: email[0], username: username, password: encryptedPassword})
        .then((user) =>{
            //response.send(user)
            response.redirect('/login');
        }).catch((error)=>{
            response.send("You don't have an account. Try signing up");
        });
    
});

module.exports = UsersRouter;