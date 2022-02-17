const router = require("express").Router();
// requiring in workout schema
const Workout = require("../models/workout.js");

// New Workout
// check api.js in public folder to find proper paths
router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

module.exports = router;