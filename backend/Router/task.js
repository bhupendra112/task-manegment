const router = require("express").Router();
const Task = require("../models/task");
const User = require("../models/user");
const authenticateToken = require("./auth");

router.post("/create-task", authenticateToken, async(req, res) => {
    try {
        const { id } = req.headers; // Extract user ID from headers
        const { title, desc } = req.body;

        // Validate required fields
        if (!id) {
            return res.status(400).json({ message: "User ID is required in headers" });
        }
        if (!title || !desc) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create a new task
        const newTask = new Task({ title, desc });
        const savedTask = await newTask.save();

        // Add task ID to user's tasks list
        await User.findByIdAndUpdate(id, { $push: { tasks: savedTask._id } });

        return res.status(201).json({ message: "Task has been created successfully", task: savedTask });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/get-all-tasks", authenticateToken, async(req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({ path: "tasks", options: { sort: { createdAt: -1 } } });
        res.status(200).json({ data: userData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server Error" })
    }
})

//update task
router.put("/update-tasks/:id", authenticateToken, async(req, res) => {
        try {
            const { id } = req.params;
            const { title, desc } = req.body;
            await Task.findByIdAndUpdate(id, { title: title, desc: desc })
            res.status(200).json({ message: "Task update successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server Error" })
        }
    })
    //update imp task
router.put("/update-imp-tasks/:id", authenticateToken, async(req, res) => {
        try {
            const { id } = req.params;
            const TaskData = await Task.findById(id);
            const ImpTask = TaskData.important
            await Task.findByIdAndUpdate(id, {
                important: !ImpTask
            })
            res.status(200).json({ message: "Task update successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server Error" })
        }
    })
    //update complete task
router.put("/update-complete-tasks/:id", authenticateToken, async(req, res) => {
        try {
            const { id } = req.params;
            const TaskData = await Task.findById(id);
            const CompleteTask = TaskData.complete
            await Task.findByIdAndUpdate(id, {
                complete: !CompleteTask
            })
            res.status(200).json({ message: "Task update successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server Error" })
        }
    })
    //delete task
router.delete("/delete-tasks/:id", authenticateToken, async(req, res) => {
    try {
        const { id } = req.params;
        const userId = req.headers.id;
        await Task.findByIdAndDelete(id);
        await User.findByIdAndUpdate(userId, { $pull: { tasks: id } });
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server Error" })
    }
})

router.get("/get-imp-tasks", authenticateToken, async(req, res) => {
        try {
            const { id } = req.headers;
            const Data = await User.findById(id).populate({ path: "tasks", match: { important: true }, options: { sort: { createdAt: -1 } } });
            const ImpTaskData = Data.tasks;
            res.status(200).json({ data: ImpTaskData });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server Error" })
        }
    })
    //get completed task
router.get("/get-Complete-tasks", authenticateToken, async(req, res) => {
        try {
            const { id } = req.headers;
            const Data = await User.findById(id).populate({ path: "tasks", match: { complete: true }, options: { sort: { createdAt: -1 } } });
            const CompleteTaskData = Data.tasks;
            res.status(200).json({ data: CompleteTaskData });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server Error" })
        }
    })
    //get Incompleted task
router.get("/get-InComplete-tasks", authenticateToken, async(req, res) => {
    try {
        const { id } = req.headers;
        const Data = await User.findById(id).populate({ path: "tasks", match: { complete: false }, options: { sort: { createdAt: -1 } } });
        const InCompleteTaskData = Data.tasks;
        res.status(200).json({ data: InCompleteTaskData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server Error" })
    }
})

module.exports = router;