const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Register a new user
exports.register = async (req, res) => {
    const { fullName, email, password } = req.body;  // تغییر به fullName

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hashing password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name: fullName, email, password: hashedPassword });  // استفاده از fullName
        await user.save();

        res.status(201).json({ message: 'User registered successfully', user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password); // مقایسه رمز عبور هش شده
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};