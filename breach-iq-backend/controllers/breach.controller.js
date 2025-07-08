import TrackedEmail from "../models/trackEmail.model.js";
import Breach from "../models/breach.model.js";
import User from "../models/user.model.js";

export const getLastBreach = async (req, res) => {
    const { email } = req.user;
    try {

        const trackedEmail = await TrackedEmail.findOne({ where: { email_to_track: email } })
        console.log(trackedEmail)

        const breaches = await Breach.findAll({ where: { tracked_email_id: trackedEmail.id } });
        console.log(breaches);

        res.status(200).json({
            success: true,
            message: "Fetched succesfully",
            data: breaches
        })

    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            success: false,
            message: "An error occurred"
        })
    }
}

export const getAllBreaches = async (req, res) => {
    const { email, id } = req.user;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const trackedEmail = await TrackedEmail.findOne({ where: { user_id: user.id } });
        if (!trackedEmail) {
            return res.status(404).json({
                success: false,
                message: "Tracked Email not found"
            })
        }

        const allUserBreaches = await Breach.findAll({ where: { tracked_email_id: trackedEmail.id } })
        // console.log("ALL USER BREACHES: ", allUserBreaches)

        return res.status(200).json({
            success: true,
            message: "All Breaches fetched successfully",
            data: allUserBreaches
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "An error occurred",
            error: error.message
        })
    }
}