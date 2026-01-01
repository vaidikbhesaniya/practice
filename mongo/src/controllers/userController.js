const User = require('../models/User');

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const insertUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User inserted successfully', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const queryUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true } // Return the updated document
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const bulkWriteUsers = async (req, res) => {
  const operations = req.body; // Array of operations

  try {
    const result = await User.bulkWrite(operations);
    res.status(200).json({ message: 'Bulk write successful', result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { bulkWriteUsers, updateUser, queryUsers, insertUser, registerUser, getUsers };