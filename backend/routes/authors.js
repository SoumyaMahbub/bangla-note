const router = require('express').Router();
let Author = require('../models/author.model');

router.route('/').get((req,res) => {
    Author.find()
        .then(authors => res.json(authors))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
    const newAuthor = new Author (req.body);
    newAuthor.save((err, author) => {
        if (err) {
            res.status(400).send("Error: " + err); 
        } else {
            res.status(201).send(author);
        }
    })
})

router.route('/:id').get((req,res) => {
    Author.findById(req.params.id)
        .then(author => res.json(author))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req,res) => {
    Author.findByIdAndDelete(req.params.id)
        .then(() => res.send("author deleted"))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').put((req,res) => {
    Author.findByIdAndUpdate(req.params.id, req.body, { new: true})
        .then(author => res.json(author))
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;