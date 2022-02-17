const router = require("express").Router();
// requiring in workout schema
const Workout = require("../models/workout.js");

// check api.js in public folder to find proper paths
// New Workout
router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

// Update Workout plan with new exercise
router.put("/api/workouts/:id", ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
        //finds the workout plan via the id mongoose sets by default when new workout created
        { _id: params.id},
        // pushes new exercise to workout
        { $push: {exercises: body}},
        // returns modified document instead of original
        { new: true}
    )
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

// Get Last Workout

router.get("/api/workouts", (req, res) => {
    Workout.aggregate([
        {
            //adds new field to data called totalDuration, and uses $sum to return collective sum of numeric values
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
            }
        }
    ])
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

// get workouts from last 7 days
router.get("/api/workouts/range", (req,res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration"}
            }
        }
    ])
    .sort({ date: -1 }).limit(7)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});



module.exports = router;