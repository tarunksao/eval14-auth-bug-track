require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../Models/user.model');

const app = express.Router();

app.use(express.json());

app.post('/', async (req,res) => {
    const {email, password} = req.body;

    try {
        const user = await UserModel.find({email});
        if (user.length>0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign({id:user[0]._id, email:user[0].email}, process.env.secret);
                    res.status(200).send({message:'Login Successful', token});
                } else {
                    res.status(400).send({message:'Invalid Credentials', err});
                }
            })
        }
    } catch (err) {
        res.status(400).send({message:'Invalid Credentials', err});
    }
})

module.exports = app;