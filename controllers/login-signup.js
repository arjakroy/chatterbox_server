const e = require('express');
var user = require('../Models/contacts');
var bcrypt = require('bcrypt');


//*Signup route function
exports.signup = async function (req, res) {
    const dataFromClient = req.body;
    const alreadyexists = await user.find({email: dataFromClient.email});
    if(alreadyexists.length > 0){
        res.statusCode = 409;
        return res.json("User already exists");
    }
    try {
        bcrypt.genSalt(10, function  (err, salt) {
            bcrypt.hash(dataFromClient.password, salt, async function (err, hash) {
                const createdUser = await user.create({
                    firstName: dataFromClient.firstName,
                    lastName: dataFromClient.lastName,
                    userName: dataFromClient.lastName,
                    password: hash,
                    email: dataFromClient.email,
                })
                console.log(createdUser);
                res.statusCode == 200;
                return res.json(createdUser);
                
            })
        })
    } catch (error) {
        return res.sendStatus(400).json(error);
    }
}

//*Login Route Function

exports.login = async function (req, res) {
    const dataFromClient = req.body;
    console.log(dataFromClient);
    try {
        const result = await user.find({
            email: dataFromClient.email
        });
        if (result) {
            bcrypt.compare(dataFromClient.password, result[0].password, function (err, re) {
                if (re) {
                    res.statusCode == 200;
                    res.json(result);
                } else {
                    return res.sendStatus(401);
                }
            })
        } else {
            return res.sendStatus(400);
        }
    } catch (error) {
        return res.sendStatus(400);
    }
}