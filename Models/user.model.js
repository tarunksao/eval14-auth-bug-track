const {Schema, model} = require('mongoose');

const userSchema = Schema({
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true}
}, {
    versionKey:false,
});

const UserModel = model('user', userSchema);

module.exports = {
    UserModel,
};