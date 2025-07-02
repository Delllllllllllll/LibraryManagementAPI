const Users = require("../model/usersHandler.js");

const userModel = new Users();

const registerNewUser = async (req, res, next) => {
  const { name, email, pwd } = req.body;

  try {
    const duplicateEmail = await userModel.findUserByEmail(email);
    if (duplicateEmail)
      return res.status(409).json({
        message:
          "That email address is already registered. Please use a different email or sign in to your existing account",
      });

    const newUser = await userModel.create({ name, email, pwd });
    res
      .status(200)
      .json({ message: "User registered successfully", new_user: newUser });
  } catch (err) {
    console.error("Error creating user:", err.message);
    next(err);
  }
};

const getUsers = async (req, res) => {
  const users = await userModel.getAllUser();
  if (users.length === 0)
    return res.status(200).json({ message: "Users are empty" });

  res.status(200).json(users);
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await userModel.delete(id);

    console.log(result.success);
    if (!result.success)
      return res
        .status(400)
        .json({ message: `User with id ${id} is not found` });

    res
      .status(200)
      .json({ message: `User with id ${id} is deleted successfuly` });
  } catch (err) {
    if (err.message === "User not found") {
      return res.status(404).json({ message: `User with id ${id} not found` });
    }
    next(err);
  }
};

module.exports = { registerNewUser, getUsers, deleteUser };
