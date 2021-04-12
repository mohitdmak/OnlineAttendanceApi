// Requiring mongoose and email validator
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { isEmail } = require('validator');

// Bcrypt required for hashing passwords.
const bcrypt = require('bcrypt');

// Creating teacher schema
const Teacherschema = new schema({
    Name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'User didnt enter an email address'],
        unique: true,
        validate: [isEmail, 'User didnt enter a valid email addresss']
    },
    password: {
        type: String,
        required: [true, 'User didnt enter a passwored'],
        minlength: [5, 'User password does not have more than 5 characters']
    },
});

// Configuring Mongoose hook for creating a salt for the password entered, and hashing it before storing it in DB.
Teacherschema.pre('save', async function(next){

    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

//Exporting Teacher model.
const Teacher = mongoose.model('teacher', Teacherschema);
module.exports = Teacher;