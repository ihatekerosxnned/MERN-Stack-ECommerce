const express = require('express');
const router = express.Router();
const {Admin, validate} = require("../models/admin")
const bcrypt = require('bcrypt');

//TRYING IF CONST IS USABLE
const SALT = 10;

router.post("/", async(req,res)=>{
    try{
        const{error} = validate(req.body);
        if(error)
        return res.status(400).send({message: error.details[0].message});

        const admin = await Admin.findOne({username: req.body.username});
        if(admin)
        return res.status(409).send({message: "Username already exists!"})

        const salt = await bcrypt.genSalt(Number(SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new Admin({...req.body, password: hashPassword}).save();
        res.status(201).send({message:"User created succesfully!"})
    }catch(error){
        console.error(error);
        res.status(500).send({message:"Internal Server Error!"});
    }
});

module.exports = router;