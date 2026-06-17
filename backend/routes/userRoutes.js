const express = require("express");
const router = express.Router();

const users = require("../data/users");
const validateUser = require("../middleware/validateUser");

// GET ALL USERS
router.get("/", (req, res) => {

    try {

        const { skill } = req.query;

        // Search by skill
        if (skill) {

            const filteredUsers = users.filter(user =>
                user.skillsHave.some(
                    s => s.toLowerCase() === skill.toLowerCase()
                )
            );

            return res.status(200).json({
                success: true,
                count: filteredUsers.length,
                data: filteredUsers
            });
        }

        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});


// GET SINGLE USER
router.get("/:id", (req, res) => {

    try {

        const userId = parseInt(req.params.id);

        const user = users.find(
            user => user.id === userId
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});


// CREATE USER
router.post("/",
validateUser,
(req, res) => {

    try {

        const { name, email, skillsHave, skillsWant } = req.body;

        // Validation
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Name and email are required"
            });
        }

        // Duplicate Email
        const existingUser = users.find(
            user => user.email === email
        );

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        const newUser = {
    id:
        users.length > 0
            ? users[users.length - 1].id + 1
            : 1,

    name,
    email,
    skillsHave: skillsHave || [],
    skillsWant: skillsWant || [],
    createdAt: new Date()
};

        users.push(newUser);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: newUser
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});


// UPDATE USER
router.put("/:id", (req, res) => {

    try {

        const userId = parseInt(req.params.id);

        const user = users.find(
            user => user.id === userId
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const { name, email, skillsHave, skillsWant } = req.body;

        // Update fields
        user.name =
        name || user.name;

        user.email =
        email || user.email;

        user.skillsHave =
        skillsHave ||
        user.skillsHave;

        user.skillsWant =
        skillsWant ||
        user.skillsWant;

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});


// DELETE USER
router.delete("/:id", (req, res) => {

    try {

        const userId = parseInt(req.params.id);

        const userIndex = users.findIndex(
            user => user.id === userId
        );

        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        users.splice(userIndex, 1);

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

module.exports = router;