import Breach from "../models/breach.model.js";
import TrackedEmail from "../models/trackEmail.model.js";
import User from "../models/user.model.js";
import { LeakCheckAPI } from "../lib/leakcheckAPI.js";
import BreachHistory from "../models/breachHistory.model.js";

export const trackEmailHistory = async (req, res) => {
    const { email } = req.user;
    try {
        const isTracking = await TrackedEmail.findOne({ where: { email_to_track: email } });
        if (!isTracking) {
            return res.status(400).json({
                success: false,
                message: "Email track not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Email tracked successfully",
            data: isTracking
        })

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "An error occurred while tracking an email",
            error: error.message
        })
    }
}

export const updateTrackEmail = async (req, res) => {
    const { id: userId, email } = req.user;

    try {
        const user = await User.findOne({ where: { id: userId, email } });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const trackedEmail = await TrackedEmail.findOne({ where: { user_id: userId } });
        if (!trackedEmail) {
            return res.status(404).json({
                success: false,
                message: "Tracked email not found for this user"
            });
        }

        let breaches = null;
        try {
            breaches = await Breach.findAll({ where: { tracked_email_id: trackedEmail.id } });
            if (breaches.length === 0) {
                let result = await LeakCheckAPI(email);

                const breachRecords = result.sources.map(source => ({
                    breach_name: source.name,
                    breach_date: source.date || null,
                    tracked_email_id: trackedEmail.id,
                }))

                // 🔥 Bulk insert all breach records
                const newBreaches = await Breach.bulkCreate(breachRecords);

                breaches = newBreaches;
            }
        } catch (apiError) {
            if (apiError.response && apiError.response.status === 404) {
                breaches = []; // No breaches found
            } else {
                throw apiError; // Other errors should be thrown
            }
        }

        trackedEmail.last_checked = new Date();
        trackedEmail.breach_count = breaches.length;
        await trackedEmail.save();

        // ? Added this thing
        await BreachHistory.create({
            tracked_email_id: trackedEmail.id,
            breach_count: breaches.length
        });

        res.status(200).json({
            success: true,
            message: "Email tracked successfully",
            data: trackedEmail
        })

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "An error occurred while tracking an email",
            error: error.message
        })
    }
}

// export const getTrackHistory = async (req, res) => {
//     const { page = 1, limit = 1 } = req.query;
//     const offset = (page - 1) * limit;

//     try {
//         // ? Added this
//         // const trackedEmail = await TrackedEmail.findAndCountAll({ where: { user_id: req.user.id } })
//         const trackedEmail = await TrackedEmail.findAndCountAll({ where: { user_id: req.user.id } });
//         if (!trackedEmail || trackedEmail.count === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Tracked email not found"
//             });
//         }
//         console.log("Tracked Email: ", trackedEmail);

//         const trackedEmailIds = trackedEmail.rows.map(email => email.id);
//         console.log("Tracked Email IDs: ", trackedEmailIds);

//         const history = await BreachHistory.findAndCountAll({
//             where: { tracked_email_id: trackedEmailIds },
//             limit,
//             offset,
//             order: [['checked_at', 'DESC']]
//         });


//         res.status(200).json({
//             success: true,
//             message: "Track history fetched successfully",
//             data: history.rows,
//             totalRecords: history.count,
//             currentPage: parseInt(page),
//             totalPages: Math.ceil(history.count / limit)
//         });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({
//             success: false,
//             message: "An error occurred while fetching track history",
//             error: error.message
//         });
//     }
// }

export const getTrackHistory = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
        // Get the logged-in user's email from token (assuming req.user is populated)
        const userEmail = req.user.email;

        // Find the tracked email entry for this email
        const trackedEmail = await TrackedEmail.findOne({ where: { email_to_track: userEmail } });

        if (!trackedEmail) {
            return res.status(404).json({
                success: false,
                message: "Tracked email not found"
            });
        }

        // Get the breach history only for this tracked email
        const history = await BreachHistory.findAndCountAll({
            where: { tracked_email_id: trackedEmail.id },
            limit: parseInt(limit),
            offset,
            order: [['checked_at', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: "Track history fetched successfully",
            user: req.user.email,
            data: history.rows,
            totalRecords: history.count,
            currentPage: parseInt(page),
            totalPages: Math.ceil(history.count / limit)
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching track history",
            error: error.message
        });
    }
}


