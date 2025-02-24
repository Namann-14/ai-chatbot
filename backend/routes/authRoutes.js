import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { checkout, paymentVerification } from '../controllers/paymentController.js';

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log('Login attempt for email:', email); // Debug log
  
      // Check for user email
      const user = await User.findOne({ email });
      if (!user) {
        console.log('User not found'); // Debug log
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('Password match:', isMatch); // Debug log
  
      if (isMatch) {
        const token = generateToken(user._id);
        console.log('Generated token:', token); // Debug log
        
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: token
        });
      } else {
        res.status(400).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Login error:', error); // Debug log
      res.status(400).json({ message: error.message });
    }
  });

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

router.post('/checkout',checkout);
router.post("/paymentverification",paymentVerification);

export default router;