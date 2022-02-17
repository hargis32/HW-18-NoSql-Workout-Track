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
        { $push: {exercise: body}},
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

// Create new workout


module.exports = router;