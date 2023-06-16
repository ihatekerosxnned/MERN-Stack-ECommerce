const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const JWTPRIVATEKEY = 'halaman';

//Di pako sure if mag gana pero manifesting ah

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  }
});
//USERSCHEMA GANG SA UMAGA
adminSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id: this._id},JWTPRIVATEKEY,{expiresIn:"7d"});
  return token
};

//ambot ngaa wala gagana ang module ga sunod mana lang ko sa tutorial gina islan2 ko lang sorry gid
//module.exports = mongoose.model('User', userSchema);
const Admin = mongoose.model("admin", adminSchema);

//VALIDATE?? AMBOT ANO NI MAMA KO YA
const validate = (data) =>{
  const schema = Joi.object({
    username: Joi.string().required().label("Username"),
    password: passwordComplexity().required().label("Password"),
    first_name: Joi.string().required().label("First Name"),
    last_name: Joi.string().required().label("Last Name"),
  });
  return schema.validate(data);
};

module.exports = {Admin, validate};