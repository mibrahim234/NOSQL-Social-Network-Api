const { Thoughts, User } = require('../models');

const thoughtController = {
    // get all Thoughts
    getAllThoughts(req, res) {
        Thoughts.find({})
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },
    
     // get thought by id
     getThoughtById({ params }, res) {
        Thoughts.findOne({ _id: params.id })
            .select('-__v')
            .then(dbThoughtData => {
                // if no thoughts found, send 404
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id! '});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

module.exports = thoughtController;
