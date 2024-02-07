const express = require("express")
const router = express.Router()

const { createTimeDuration, getEmployeeTime, deleteTimeDuration, updateTimeDuration } = require("./timeController")

router.post("/create", createTimeDuration)
router.get("/get/:id", getEmployeeTime);
router.delete("/delete/:id", deleteTimeDuration)
router.put("/upadte/:id", updateTimeDuration)
module.exports = router

// http://192.168.1.66:2000/api/time/create
// const express = require('express');
// const router = express.Router();
// const TimeDuration = require('../models/TimeDuration');

// // Create a TimeDuration
// router.post('/time-durations', async (req, res) => {
//     try {
//         const timeDuration = await TimeDuration.create(req.body);
//         res.status(201).json(timeDuration);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// // Get all TimeDurations
// router.get('/time-durations', async (req, res) => {
//     try {
//         const timeDurations = await TimeDuration.findAll();
//         res.json(timeDurations);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// // Get a specific TimeDuration by ID
// router.get('/time-durations/:id', async (req, res) => {
//     const timeDurationId = req.params.id;

//     try {
//         const timeDuration = await TimeDuration.findByPk(timeDurationId);

//         if (!timeDuration) {
//             res.status(404).json({ error: 'TimeDuration not found' });
//         } else {
//             res.json(timeDuration);
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// // Update a TimeDuration by ID
// router.put('/time-durations/:id', async (req, res) => {
//     const timeDurationId = req.params.id;

//     try {
//         const [updatedRows] = await TimeDuration.update(req.body, {
//             where: { id: timeDurationId },
//         });

//         if (updatedRows === 0) {
//             res.status(404).json({ error: 'TimeDuration not found' });
//         } else {
//             res.json({ message: 'TimeDuration updated successfully' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// // Delete a TimeDuration by ID
// router.delete('/time-durations/:id', async (req, res) => {
//     const timeDurationId = req.params.id;

//     try {
//         const deletedCount = await TimeDuration.destroy({
//             where: { id: timeDurationId },
//         });

//         if (deletedCount === 0) {
//             res.status(404).json({ error: 'TimeDuration not found' });
//         } else {
//             res.json({ message: 'TimeDuration deleted successfully' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// module.exports = router;
