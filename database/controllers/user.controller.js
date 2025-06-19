const db = require('../connection');
const User = db.user;
const bcrypt = require('bcryptjs');

// Admin only
const getAllUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] }
  });
  res.status(200).json({ message: 'All users', data: users });
};

// Admin only or self
const getUserById = async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['password'] }
  });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.status(200).json({ message: 'User found', data: user });
};

// Public (register)
const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  const emailExists = await User.findOne({ where: { email } });
  if (emailExists) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || 'customer'
  });

  res.status(201).json({
    message: 'User registered',
    data: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    }
  });
};

// Admin or user themself
const updateUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (req.user.role !== 'admin' && req.user.id !== user.id) {
    return res.status(403).json({ message: 'Forbidden: Cannot update this user' });
  }

  const updated = await user.update(req.body);
  res.status(200).json({
    message: 'User updated',
    data: {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      role: updated.role
    }
  });
};

// Admin only
const deleteUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Only admin can delete users' });
  }

  await user.destroy();
  res.status(200).json({ message: 'User deleted' });
};

// Logged-in user only
const getMe = async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: ['id', 'name', 'email', 'role']
  });
  res.status(200).json(user);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getMe
};
