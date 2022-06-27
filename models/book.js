const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema =  new Schema({
    bookTitle: String,
    category: String,
    bookDescription: String,
    authorID: { 
        type: Schema.Types.ObjectId,
        ref: 'Author'
    }
})

module.exports = mongoose.model('Book', BookSchema);