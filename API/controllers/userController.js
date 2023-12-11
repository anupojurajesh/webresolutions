const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, phone, email, password } = req.body

  if (!name || !phone || !email || !password) {
    res.status(500)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    phone,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      phone:user.phone,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      phone:user.phone,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})


// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Refresh Token function (optional)
const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Validate the refresh token and issue a new access token
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      throw new Error('User not found');
    }

    const accessToken = generateToken(user._id);
    res.json({ accessToken });
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized or Token Expired' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  refreshAccessToken, // Add this function for token refresh
};