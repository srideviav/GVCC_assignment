const UserModels =require('../Models/UserModels');
const bcrypt = require('bcrypt');

exports.ifUserExistsService = async(email) =>{
  const ifUserExists = await UserModels.findOne({email:email});
  return ifUserExists;
}

exports.saveUserService = async(userDetails) => {
    const saltRounds = 10;
    userDetails.password = await bcrypt.hash(userDetails.password,saltRounds);
    const newUser = new UserModels(userDetails);
    return await newUser.save();
}

exports.ifPasswordMatch = async(userPassword,savedPassword) => {
  const isMatch = await bcrypt.compare(userPassword, savedPassword);
  return isMatch;
}