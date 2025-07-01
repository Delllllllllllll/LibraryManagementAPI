const Users = require("../model/usersHandler.js");
const bcrypt = require("bcrypt");

const userModel = new Users();

const registerNewUser = async (req, res, next) => {
  const { name, email, pwd } = req.body;

  if (!name || !email || !pwd) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Please enter a valid email address" });
  }

  if (pwd.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  try {
    const duplicateEmail = await userModel.findUserByEmail(email);
    if (duplicateEmail)
      return res.status(409).json({
        message:
          "That email address is already registered. Please use a different email or sign in to your existing account",
      });

      const newUser = await userModel.create({ name, email, pwd }); 
      res.status(200).json({ message: "User registered successfully", new_user: newUser});
  } catch (err) {
    console.error("Error creating user:", err.message);
    next(err);
  }

};

const getUsers = async (req, res) => {
  const users = await userModel.getAllUser();
  if(users.length === 0) return res.status(400).json({ message: 'Users are empty'});
  
  res.status(200).json(users);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const result = await userModel.delete(id);

  console.log(result.success);
  if(!result.success) return res.status(400).json({ message: `User with id ${id} is not found`});

  res.status(200).json({ message: `User with id ${id} is deleted successfuly`});
};


module.exports = { registerNewUser, getUsers, deleteUser }; 