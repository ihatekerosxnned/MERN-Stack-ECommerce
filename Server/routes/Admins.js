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

router.get('/display', async (req, res) => {
    try {
      const admins = await Admin.find();
      res.status(200).json(admins);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  //DELETE PRODUCT BY ID
  router.delete('/delete/:id', async(req,res)=>{
    try{
        const deletedAdmin = await
        Admin.findByIdAndDelete(req.params.id);
        if(!deletedAdmin){
        return res.status(404).json({message: 'Admin not Found'});
        }
        res.json({message: 'Deletedd an Admin', admin:deletedAdmin});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

module.exports = router;