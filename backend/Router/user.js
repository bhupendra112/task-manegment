const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/sign-in", async(req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate required fields
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validate username length
        if (username.length < 3) {
            return res.status(400).json({ message: "Username should have at least 3 characters" });
        }

        // Check for existing user
        const existingUser = await User.findOne({
            $or: [{ username }, { email }],
        });

        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(400).json({ message: "Username already exists" });
            }
            if (existingUser.email === email) {
                return res.status(400).json({ message: "Email already exists" });
            }
        }

        // Hash the password safely
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create and save the new user
        const newUser = new User({ username, email, password: hashPassword });
        await newUser.save();

        return res.status(201).json({ message: "Sign-in successful", newUser });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/log-in", async(req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Compare passwords using async/await
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Generate JWT token with correct "expiresIn" key
        const token = jwt.sign({ username, id: user._id }, "tcmTM", { expiresIn: "2d" });

        return res.status(200).json({ id: user._id, token });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;