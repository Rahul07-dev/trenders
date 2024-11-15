const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { setUser } = require('../OAuth/auth');



// for products
const UserSchema = new mongoose.Schema({
  email: { type: String },
  password: { type: String },
  token: { type: String },
  whilist: [{ type: String }],
  cart: [
    {
      productId: { type: String },
      qty: { type: Number },
      price: { type: Number },
      actualPrice: { type: Number },
    },
  ],
  name: { type: String, default: "" },
  pin: { type: String, default: "" },
  phone: { type: String, default: "" },
  address: { type: String, default: "" },
  city: { type: String, default: "" },
  state: { type: String, default: "" },
  locality: { type: String, default: "" },
  role: { type: String, default: "" },
});


// hashing password 
UserSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
    }
    next();
})

UserSchema.methods.generateToken = async function () {
  try {
    const token= setUser({
          id: this._id,
          email: this.email,
          role: this.role,
    })
    this.token=token;
    await this.save(); // Save the token in the database
    return token;
  } catch (err) {
    console.log(err);
  }
};

const User = mongoose.model('USER',UserSchema);

module.exports = User;
