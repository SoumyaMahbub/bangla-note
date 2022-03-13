const router = require('express').Router();
let Option = require('../models/option.model');

router.route('/').get((req,res) => {
    Option.find()
        .then(options => res.json(options))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
    const newOption = new Option (req.body);
    newOption.save((err, option) => {
        if (err) {
            res.status(400).send("Error: " + err); 
        } else {
            res.status(201).send(option);
        }
    })
})

router.route('/:id').get((req,res) => {
    Option.findById(req.params.id)
        .then(option => res.json(option))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req,res) => {
    Option.findByIdAndDelete(req.params.id)
        .then(() => res.send("option deleted"))
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;