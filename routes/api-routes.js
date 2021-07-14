const db = require("../models")

module.exports = function (app) {
    app.get("/api/workouts", function (req, res) {
        db.Workout.find({})
            .then((foundWorkouts) => {
                res.json(foundWorkouts);
            })
            .catch((err) => {
                console.log(err);
                res.json({
                    error: true,
                    date: null,
                    message: "Failed to load workouts"
                });
            });
    });

    app.post("/api/workouts", (req, res) => {
        db.Workout.create(req.body)
            .then((addWorkout) => {
                res.json(addWorkout);
            })
            .catch((err) => {
                res.json(err);
            });
    });

    app.put("/api/workouts/:id", function (req, res) {
        db.Workout.findByIdAndUpdate(req.params.id,
            { $push: { exercises: req.body } },
            { new: true }
        )
            .then((workout) => {
                res.json(workout);
            })
            .catch((err) => {
                console, log(err);
                res.json({
                    error: true,
                    data: null,
                    message: "Failed to update workout.",
                });
            });
    });

    app.get("api/workouts/range", (req, res) => {
        db.Workout.find({})
            .limit(15)
            .then((foundWorkout) => {
                res.json(foundWorkout);
            })
            .catch((err) => {
                res.json(err);
            });
    });
};