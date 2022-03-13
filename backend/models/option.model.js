const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const optionSchema = new Schema({
    type: {type: String, required: true},
    option: {type: String, required: true}
})

const Option = mongoose.model('Option', optionSchema);

module.exports = Option;