const Recognition = require("../models/RecognitionModel");
const User = require("../models/UserModel");

const allRecognition = async (req, res) => {
    try {
        const allRecognit = await Recognition.find({});
        const enhancedRecognitions = await Promise.all(
            allRecognit.map(async (recognition) => {
                const sender = await User.findOne({
                    employeeID: recognition.sender,
                });
                const receiver = await User.findOne({
                    employeeID: recognition.receiver,
                });

                return {
                    ...recognition._doc,
                    sender: {
                        id: sender ? sender.employeeID : null,
                        name: sender
                            ? `${sender.firstName} ${sender.lastName}`
                            : null,
                        jobTitle: sender ? sender.jobTitle : null,
                        jobLevel: sender ? sender.jobLevel : null,
                        departmentName: sender ? sender.department.name : null,
                        profileImage: sender ? sender.profilePicture : null,
                    },
                    receiver: {
                        id: receiver ? receiver.employeeID : null,
                        name: receiver
                            ? `${receiver.firstName} ${receiver.lastName}`
                            : null,
                        jobTitle: receiver ? receiver.jobTitle : null,
                        jobLevel: receiver ? receiver.jobLevel : null,
                        departmentName: receiver
                            ? receiver.department.name
                            : null,
                        profileImage: receiver ? receiver.profilePicture : null,
                    },
                };
            })
        );

        return res.status(200).json(enhancedRecognitions);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getRecognition = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;

        const showRecognition = await Recognition.findOne({
            recognition_id: parseInt(id, 10),
        });
        console.log("end funcionando");
        return res.status(200).json(showRecognition);
    } catch (error) {
        return res.status(500).json({ messsage: error.message });
    }
};

const updateRecognition = async (req, res) => {
    try {
        const { id } = req.params;
        const RecognitionUpdate = await Recognition.findByIdAndUpdate(
            id,
            req.body
        );

        if (!RecognitionUpdate) {
            return res.status(404).json({
                message: `Cannot find any recognition with id: ${id}`,
            });
        }

        const showUpdate = await Recognition.findById(id);
        return res.status(200).json(showUpdate);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// {
//     "recognition_id": 1020,
//     "details": "Details new Recognition",
//     "sender": 15,
//     "receiver": 10,
//     "status": "Approved",
//     "category": "Categoria",
//     "date": 25,
//     "points": 1000,
//     "receiverDepartment": "IT",
//     "receiverPicture": "receiver pic",
//     "senderDepartment": "sender depart",
//     "senderPicture": "sender Pic",
//     "receiverJobTitle": "receiver jobT",
//     "senderJobTitle": "sender jobT",
//     "receiverName": "receiver N",
//     "senderName": "sender N",
//     "receiverJobLevel": 3,
//     "senderJobLevel": 2
//   }

const addRecognition = async (req, res) => {
    const {
        recognitionid,
        details,
        sender,
        receiver,
        status,
        category,
        date,
        points,
        receiverDepartment,
        receiverPicture,
        senderDepartment,
        senderPicture,
        receiverJobTitle,
        senderJobTitle,
        receiverName,
        senderName,
        receiverJobLevel,
        senderJobLevel,
    } = req.body;

    try {
        const newRecognition = new Recognition({
            recognitionid,
            details,
            sender,
            receiver,
            status,
            category,
            date,
            points,
            receiverDepartment,
            receiverPicture,
            senderDepartment,
            senderPicture,
            receiverJobTitle,
            senderJobTitle,
            receiverName,
            senderName,
            receiverJobLevel,
            senderJobLevel,
        });
        await newRecognition.save();
        return res.status(200).send("Recognition Saved");
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

module.exports = {
    addRecognition,
    getRecognition,
    updateRecognition,
    allRecognition,
};

// router.get("/", allRecognition);
// router.get("/:id", getRecognition);
// router.put("/update/:id", updateRecognition);
// router.post("/addRecognition", addRecognition);
