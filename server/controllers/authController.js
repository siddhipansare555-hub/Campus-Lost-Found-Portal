const User = require('../models/User');

// @desc    Login student / user
// @route   POST /api/auth/login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Extract PRN from MIT-WPU email pattern (e.g. 1272250234@mitwpu.edu.in)
    const prnMatch = email.match(/\d+/);
    const prn = prnMatch ? prnMatch[0] : '1272250234';

    let user = await User.findOne({ email });

    if (!user) {
      // Auto-register student if logging in for the first time
      user = await User.create({
        email,
        password, // In production, hash password with bcrypt
        prn,
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        prn: user.prn,
        role: user.role,
      },
      token: 'mock-jwt-token-mitwpu',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};