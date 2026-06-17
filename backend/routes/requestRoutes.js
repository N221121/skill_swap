const express = require("express");
const router = express.Router();

const users = require("../data/users");
const requests = require("../data/requests");

//get all requests
router.get("/", (req, res) => {

    try {

        const { status } = req.query;

        // Filter by status
        if (status) {

            const filteredRequests =
                requests.filter(req =>
                    req.status.toLowerCase() ===
                    status.toLowerCase()
                );

            return res.status(200).json({
                success: true,
                count:
                    filteredRequests.length,
                data: filteredRequests
            });
        }

        // Return all requests
        res.status(200).json({
            success: true,
            count: requests.length,
            data: requests
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message:
                "Internal Server Error"
        });
    }
});


// SEND SKILL REQUEST
router.post("/", (req, res) => {

    try {

        const { senderId, receiverId, skill } = req.body;

        // Validation
        if (!senderId || !receiverId || !skill) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Sender check
        const sender = users.find(
            user => user.id === senderId
        );

        // Receiver check
        const receiver = users.find(
            user => user.id === receiverId
        );

        if (!sender || !receiver) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Same person check
        if (senderId === receiverId) {
            return res.status(400).json({
                success: false,
                message: "Cannot send request to yourself"
            });
        }

        // Duplicate request check
        const existingRequest = requests.find(
            request =>
                request.senderId === senderId &&
                request.receiverId === receiverId &&
                request.skill === skill
        );

        if (existingRequest) {
            return res.status(409).json({
                success: false,
                message: "Request already exists"
            });
        }

        const newRequest = {
           id:
    requests.length > 0
        ? requests[requests.length - 1].id + 1
        : 1,
            senderId,
            receiverId,
            skill,
            status: "Pending",
            createdAt: new Date()
        };

        requests.push(newRequest);

        res.status(201).json({
            success: true,
            message: "Skill request sent",
            data: newRequest
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});


// ACCEPT REQUEST
router.put("/:id/accept", (req, res) => {

    try {

        const requestId = parseInt(req.params.id);

        const request = requests.find(
            req => req.id === requestId
        );

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Request not found"
            });
        }
        if (request.status !== "Pending") {
    return res.status(400).json({
        success: false,
        message:
            "Request already processed"
    });
}
        request.status = "Accepted";

        res.status(200).json({
            success: true,
            message: "Request accepted",
            data: request
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});


// REJECT REQUEST
router.put("/:id/reject", (req, res) => {

    try {

        const requestId = parseInt(req.params.id);

        const request = requests.find(
            req => req.id === requestId
        );

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Request not found"
            });
        }

        request.status = "Rejected";

        res.status(200).json({
            success: true,
            message: "Request rejected",
            data: request
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

module.exports = router;