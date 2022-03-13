const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: {type: String, required: true},
    imageUrl: String,
    birthDay: String,
    birthMonth: String,
    birthYear: {type: String, required: true},
    birthPlace: String,
    deathDay: String,
    deathMonth: String,
    deathYear: String,
    deathPlace: String,
    pseudonym: String,
    textbookWritings: {type: String, required: true},
    fatherName: String,
    motherName: String,
    writings: [{name: String, style: String, year: String}],
    educations: [{place: String, degree: String, place: String, year: String}],
    jobs: [{name: String, place: String, year: String}],
    awards: [{name: String, year: String, reason: String}],
    infos: [String],
    questions: [{authorName: String, question: String, answer: String, optionType: String}],
})

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;