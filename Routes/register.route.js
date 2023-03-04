const express = require('express');
const bcrypt = require('bcrypt');
const { UserModel } = require('../Models/user.model');

const app = express.Router();

app.use(express.json());

app.post('/', async (req,res) => {
    const {email, password} = req.body;
    try{
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.status(400).send({message:'Opps!!! Something went wrong', err}); 
            } else {
                const user = new UserModel({email, password:hash});
                await user.save();
                res.status(201).send({message:'User Registered Successfully', user});
            }
        })
    } catch (err) {
        res.status(400).send({message:'Opps!!! Something went wrong', err});
    }
});

module.exports = app;