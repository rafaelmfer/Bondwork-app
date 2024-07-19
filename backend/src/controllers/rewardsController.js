const Rewards = require("../models/RewardsModel");
const Users = require("../models/UserModel");

const getAllRewards = async (req, res) => {
    try {
        // Fetch all rewards from the database
        const allRewards = await Rewards.find({});
        const userCache = {}; // Cache to store user data and avoid multiple database queries

        // Process each reward to enrich the redeem data with user information
        const enrichedRewards = await Promise.all(
            allRewards.map(async (reward) => {
                const enrichedRedeem = await Promise.all(
                    reward.redeem.map(async (redeemEntry) => {
                        // Fetch user data if not already in cache
                        if (!userCache[redeemEntry.id]) {
                            userCache[redeemEntry.id] = await Users.findOne({
                                employeeID: redeemEntry.id,
                            }).lean();
                        }
                        const user = userCache[redeemEntry.id];

                        // Format the full name with only the first letter capitalized followed by a dot
                        const fullName = user
                            ? `${user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)} ${user.lastName.charAt(0).toUpperCase()}.`
                            : "";

                        // Return enriched redeem data
                        return {
                            id: redeemEntry.id,
                            fullName,
                            profilePicture: user ? user.profilePicture : "",
                            departmentName:
                                user && user.department
                                    ? user.department.name
                                    : "",
                            jobTitle: user ? user.jobTitle : "",
                            jobLevel: user ? user.jobLevel : "",
                            status: redeemEntry.status,
                            requestDate: redeemEntry.requestDate,
                            date: redeemEntry.date,
                            reason: redeemEntry.reason,
                            rejectDetails: redeemEntry.rejectDetails,
                        };
                    })
                );

                // Return enriched reward data
                return {
                    rewardId: reward.rewardId,
                    category: reward.category,
                    details: reward.details,
                    pointsCost: reward.pointsCost,
                    status: reward.status,
                    startDate: reward.startDate,
                    endDate: reward.endDate,
                    redeem: enrichedRedeem,
                    title: reward.title,
                    image: reward.image,
                    publish: reward.publish,
                };
            })
        );

        // Send the enriched rewards as response
        return res.status(200).json(enrichedRewards);
    } catch (error) {
        // Send error response if any exception occurs
        return res.status(500).json({ message: error.message });
    }
};

const getSingleReward = async (req, res) => {
    try {
        const { rewardId } = req.params;

        // Find the single reward by rewardId
        const reward = await Rewards.findOne({ rewardId });
        if (!reward) {
            return res.status(404).json({ message: "Reward not found" });
        }

        const userCache = {}; // Cache to store user data and avoid multiple database queries

        // Enrich the redeem data with user information
        const enrichedRedeem = await Promise.all(
            reward.redeem.map(async (redeemEntry) => {
                // Fetch user data if not already in cache
                if (!userCache[redeemEntry.id]) {
                    userCache[redeemEntry.id] = await Users.findOne({
                        employeeID: redeemEntry.id,
                    }).lean();
                }
                const user = userCache[redeemEntry.id];

                // Format the full name with only the first letter capitalized followed by a dot
                const fullName = user
                    ? `${user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)} ${user.lastName.charAt(0).toUpperCase()}.`
                    : "";

                // Return enriched redeem entry
                return {
                    id: redeemEntry.id,
                    fullName,
                    profilePicture: user ? user.profilePicture : "",
                    departmentName:
                        user && user.department ? user.department.name : "",
                    jobTitle: user ? user.jobTitle : "",
                    jobLevel: user ? user.jobLevel : "",
                    status: redeemEntry.status,
                    requestDate: redeemEntry.requestDate,
                    date: redeemEntry.date,
                };
            })
        );

        // Return the single reward with enriched redeem data
        const enrichedReward = {
            rewardId: reward.rewardId,
            category: reward.category,
            details: reward.details,
            pointsCost: reward.pointsCost,
            status: reward.status,
            startDate: reward.startDate,
            endDate: reward.endDate,
            redeem: enrichedRedeem,
            title: reward.title,
            image: reward.image,
            publish: reward.publish,
        };

        // Send the enriched reward as response
        return res.status(200).json(enrichedReward);
    } catch (error) {
        // Send error response if any exception occurs
        return res.status(500).json({ message: error.message });
    }
};

const addRewards = async (req, res) => {
    const {
        rewardId,
        title,
        image,
        category,
        pointsCost,
        startDate,
        endDate,
        details,
        publish,
        status,
    } = req.body;

    try {
        const newRewards = new Rewards({
            rewardId,
            title,
            image,
            category,
            pointsCost,
            startDate,
            endDate,
            details,
            publish,
            status,
        });
        await newRewards.save();
        return res.status(200).send("Rewards Saved");
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

const getRewardRequestDetails = async (req, res) => {
    try {
        const { rewardId, employeeId } = req.params;

        // Find the single reward by rewardId
        const reward = await Rewards.findOne({ rewardId });
        if (!reward) {
            return res.status(404).json({ message: "Reward not found" });
        }

        // Find the single user by employeeID
        const user = await Users.findOne({ employeeID: Number(employeeId) });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find if inside the array reward.redeem I have the employeeID
        const redeem = reward.redeem.find(
            (redeemEntry) => redeemEntry.id === Number(employeeId)
        );

        if (!redeem) {
            return res.status(404).json({ message: "Redeem not found" });
        }

        // Format the full name with only the first letter capitalized followed by a dot
        const fullName = user
            ? `${user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)} ${user.lastName.charAt(0).toUpperCase()}.`
            : "";

        const rewardRequestDetails = {
            employeeId: user.employeeID,
            rewardId: reward.rewardId,
            fullName,
            profilePicture: user ? user.profilePicture : "",
            departmentName: user && user.department ? user.department.name : "",
            jobTitle: user ? user.jobTitle : "",
            jobLevel: user ? user.jobLevel : "",
            rewardTitle: reward.title,
            status: redeem.status,
            requestDate: redeem.requestDate,
            date: redeem.date,
            category: reward.category,
            pointsCost: reward.pointsCost,
        };

        // Send the reward Request Details as response
        return res.status(200).json(rewardRequestDetails);
    } catch (error) {
        // Send error response if any exception occurs
        return res.status(500).json({ message: error.message });
    }
};

const updateRewardRedeem = async (req, res) => {
    console.log("Abcde");

    try {
        const { id, redeem } = req.params;
        const { approve, reason, rejectDetails } = req.body;

        const rewardUpdate = await Rewards.updateOne(
            { rewardId: id, "redeem.id": redeem },
            {
                $set: {
                    "redeem.$.status":
                        approve === true ? "Approved" : "Rejected",
                    "redeem.$.date": new Date(),
                    "redeem.$.reason": reason,
                    "redeem.$.rejectDetails": rejectDetails,
                },
            }
        );

        if (rewardUpdate.matchedCount === 0) {
            return res.status(404).json({
                message: `Cannot find any reward redeem entry with id: ${redeem}`,
            });
        }

        // console.log(id)
        // console.log(redeem)
        // const reward = await Rewards.findOne({ "rewardId": 303 });

        // if (!reward) {
        //     return res.status(404).json({
        //         message: `Cannot find any reward redeem entry with id: ${id}`,
        //     });
        // }

        // const updateFields = {
        //     "status": approve === true ? "Approved" : "Rejected",
        //     "date": new Date(), // Add the current date
        // };

        // console.log(updateFields);

        // if (approve === false) {
        //     if (reason) updateFields["redeem.$.reason"] = reason;
        //     if (rejectDetails)
        //         updateFields["redeem.$.rejectDetails"] = rejectDetails;
        // }

        // const rewardUpdate = await Rewards.findOneAndUpdate(
        //     { "redeem.id": id },
        //     { $set: updateFields },
        //     { new: true }
        // );

        return res.status(200).json(rewardUpdate);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addRewards,
    getAllRewards,
    getSingleReward,
    getRewardRequestDetails,
    updateRewardRedeem,
};
