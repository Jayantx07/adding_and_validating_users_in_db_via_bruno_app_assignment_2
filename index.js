// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(express.json());

// // MongoDB Connection
// mongoose.connect('mongodb+srv://Jayant:Jayant007@cluster0.bpq18.mongodb.net/')
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

// // User Schema
// const userSchema = new mongoose.Schema({
//     username: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true }
// });

// const User = mongoose.model('User', userSchema);

// // Registration Endpoint
// app.post('/register', async (req, res) => {
//     const { username, email, password } = req.body;

//     // Check for empty fields
//     if (!username || !email || !password) {
//         return res.status(400).json({ error: 'All fields are required.' });
//     }

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ username, email, password: hashedPassword });
//         await newUser.save();
//         res.status(201).json({ message: 'Registration successful!' });
//     } catch (err) {
//         res.status(500).json({ error: 'Server error during registration.' });
//     }
// });

// // Login Endpoint
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     // Check for empty fields
//     if (!email || !password) {
//         return res.status(400).json({ error: 'All fields are required.' });
//     }

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ error: 'User not found.' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ error: 'Invalid credentials.' });
//         }

//         res.status(200).json({ message: 'Login successful!' });
//     } catch (err) {
//         res.status(500).json({ error: 'Server error during login.' });
//     }
// });

// // Server Start
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://Jayant:Jayant007@cluster0.bpq18.mongodb.net/")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

// Login Endpoint
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Check for empty fields
    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
